/**
 * Cloudinary diagnostic script
 * Run with: npx dotenv -e .env tsx scripts/check-all.ts
 */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkAll() {
  console.log("=== Cloudinary Full Diagnostic ===\n");

  console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  try {
    // Get all folders under projects/
    console.log("\n--- Category folders ---");
    const result = await cloudinary.api.sub_folders("projects");
    console.log("Found", result.folders.length, "folders:");
    result.folders.forEach((f: any) => console.log("  -", f.path));

    // Get all images in projects/
    console.log("\n--- All images in projects/ ---");
    const allImages = await cloudinary.search
      .expression("folder:projects")
      .max_results(10)
      .execute();
    
    console.log(`Total images: ${allImages.total_count}`);
    console.log("\nSample URLs:");
    allImages.resources.forEach((img: any) => {
      console.log(`  ${img.secure_url}`);
    });

    // Get images per category
    console.log("\n--- Images per category ---");
    const categories = ['commerical', 'commercial', 'healthcare', 'hospitality', 'residential'];
    
    for (const cat of categories) {
      const imgs = await cloudinary.search
        .expression(`folder:projects/${cat}`)
        .max_results(1)
        .execute();
      console.log(`${cat}: ${imgs.total_count} images`);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

checkAll();

