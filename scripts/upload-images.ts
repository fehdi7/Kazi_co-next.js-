/**
 * Script to upload all local project images to Cloudinary
 * Run with: npx tsx scripts/upload-images.ts
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const LOCAL_IMAGES_DIR = path.join(process.cwd(), "public/Project_images");

// Mapping of folder names to Cloudinary folder structure
const FOLDER_MAPPING: Record<string, string> = {
  COMMERICAL: "commerical",
  HEALTHCARE: "healthcare",
  HOSPITALITY: "hospitality",
  RESIDENTIAL: "residential",
};

async function uploadFolder(category: string): Promise<void> {
  const folderPath = path.join(LOCAL_IMAGES_DIR, category);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`  Skipping ${category} - folder not found`);
    return;
  }

  const cloudinaryFolder = `projects/${FOLDER_MAPPING[category] || category.toLowerCase()}`;
  const subfolders = fs.readdirSync(folderPath);

  console.log(`\n📁 Processing ${category} (${subfolders.length} projects)`);

  for (const project of subfolders) {
    const projectPath = path.join(folderPath, project);
    
    if (!fs.statSync(projectPath).isDirectory()) {
      continue;
    }

    const files = fs.readdirSync(projectPath);
    const imageFiles = files.filter(
      (file) =>
        file.match(/\.(jpg|jpeg|png|webp)$/i) &&
        !file.toLowerCase().includes("thumb")
    );

    if (imageFiles.length === 0) {
      console.log(`  ⚠️  ${project}: No images found`);
      continue;
    }

    console.log(`  📤 Uploading ${project} (${imageFiles.length} images)...`);

    for (const file of imageFiles) {
      const filePath = path.join(projectPath, file);
      
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: cloudinaryFolder,
          public_id: project,
          resource_type: "image",
          overwrite: false,
        });
        console.log(`    ✓ ${file} -> ${result.public_id}`);
      } catch (error: any) {
        console.error(`    ✗ ${file}: ${error.message}`);
      }
    }
  }
}

async function main() {
  console.log("🚀 Starting image upload to Cloudinary...\n");

  const categories = fs.readdirSync(LOCAL_IMAGES_DIR).filter((item) => {
    const itemPath = path.join(LOCAL_IMAGES_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log(`Found ${categories.length} categories: ${categories.join(", ")}`);

  let totalImages = 0;
  for (const category of categories) {
    await uploadFolder(category);
  }

  console.log("\n✅ Upload complete!");
}

main().catch(console.error);

