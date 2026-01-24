/**
 * Retry script for failed image uploads
 * Run with: npx dotenv -e .env tsx scripts/retry-uploads.ts
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const failedImages = [
  "public/Project_images/COMMERICAL/DALAMAL HOUSE/20200115_151916.jpg",
  "public/Project_images/COMMERICAL/DALAMAL HOUSE/20200115_152000.jpg",
  "public/Project_images/COMMERICAL/DALAMAL HOUSE/20200115_152030.jpg",
  "public/Project_images/COMMERICAL/DALAMAL HOUSE/20200115_152215.jpg",
];

async function retryUploads() {
  console.log("Retrying failed uploads...\n");

  let successCount = 0;
  let failCount = 0;

  for (const imagePath of failedImages) {
    if (!fs.existsSync(imagePath)) {
      console.log(`✗ ${imagePath}: File not found`);
      failCount++;
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "projects/commerical/DALAMAL HOUSE",
        public_id: "DALAMAL HOUSE",
        resource_type: "image",
        overwrite: false,
      });
      console.log(`✓ ${path.basename(imagePath)} -> ${result.public_id}`);
      successCount++;
    } catch (error: any) {
      console.log(`✗ ${path.basename(imagePath)}: ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n✅ Retry complete: ${successCount} succeeded, ${failCount} failed`);
}

retryUploads();

