/**
 * Upload all local project images to Cloudinary
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PROJECT_ROOT = "public/Project_images";

async function uploadAll() {
  console.log("=== Uploading All Images to Cloudinary ===\n");

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  const categories = fs.readdirSync(PROJECT_ROOT).filter(f => 
    fs.statSync(path.join(PROJECT_ROOT, f)).isDirectory()
  );

  console.log(`Found ${categories.length} categories\n`);

  for (const category of categories) {
    const catPath = path.join(PROJECT_ROOT, category);
    const projects = fs.readdirSync(catPath).filter(f => 
      fs.statSync(path.join(catPath, f)).isDirectory()
    );

    console.log(`--- ${category} (${projects.length} projects) ---`);

    for (const project of projects) {
      const projPath = path.join(catPath, project);
      const files = fs.readdirSync(projPath).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      });

      for (const file of files) {
        const filePath = path.join(projPath, file);
        const cloudFolder = `projects/${category.toLowerCase()}/${project}`;

        try {
          await cloudinary.uploader.upload(filePath, {
            folder: cloudFolder,
            public_id: path.basename(file, path.extname(file)),
            resource_type: "image",
            overwrite: false,
          });
          console.log(`  ✓ ${project}/${file}`);
          uploaded++;
        } catch (e: any) {
          if (e.message?.includes("already exists")) {
            console.log(`  ✓ ${project}/${file} (exists)`);
            skipped++;
          } else {
            console.log(`  ✗ ${project}/${file}: ${e.message}`);
            failed++;
          }
        }

        await new Promise(r => setTimeout(r, 50));
      }
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`Uploaded: ${uploaded}, Skipped: ${skipped}, Failed: ${failed}`);
}

uploadAll();

