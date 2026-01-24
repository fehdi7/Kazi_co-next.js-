/**
 * Cloudinary diagnostic script
 * Run with: npx dotenv -e .env tsx scripts/check-cloudinary.ts
 */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkCloudinary() {
  console.log("=== Cloudinary Diagnostic ===\n");

  // Check configuration
  console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "set" : "NOT SET");

  try {
    // Get folders under projects/
    console.log("\n--- Folders under projects/ ---");
    const result = await cloudinary.api.sub_folders("projects");
    console.log("Found", result.folders.length, "category folders:");
    result.folders.forEach((f: any) => console.log("  -", f.path));

    // Check DALAMAL HOUSE project
    console.log("\n--- Images in DALAMAL HOUSE ---");
    const images = await cloudinary.search
      .expression("folder:projects/commerical/DALAMAL HOUSE")
      .max_results(5)
      .execute();
    console.log("Found", images.resources.length, "images in DALAMAL HOUSE");

    if (images.resources.length > 0) {
      console.log("\nSample image URLs:");
      images.resources.forEach((img: any, i: number) => {
        console.log(`  ${i + 1}. ${img.secure_url}`);
      });
    }
  } catch (error: any) {
    console.error("\nError:", error.message);
  }
}

checkCloudinary();

