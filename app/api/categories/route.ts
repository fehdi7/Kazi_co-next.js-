import { NextResponse } from "next/server";
import  prisma  from "@/src/lib/prisma";
import { getImagesByFolder } from "@/src/lib/cloudinary";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {
      projects: {
        include: { images: true },
        take: 1, // Get first project for category preview
        orderBy: { createdAt: 'desc' }
      },
    },
  });

  // Get Cloudinary images for each category
  const categoriesWithCloudinary = await Promise.all(
    categories.map(async (cat) => {
      try {
        const cloudinaryImages = await getImagesByFolder(`projects/${cat.slug}`);
        const previewImage = cloudinaryImages[0]?.secure_url || cat.projects[0]?.images[0]?.url || null;

        return {
          ...cat,
          previewImage,
          cloudinaryImages: cloudinaryImages.map(img => img.secure_url),
        };
      } catch (error) {
        console.error(`Error fetching Cloudinary images for ${cat.slug}:`, error);
        return {
          ...cat,
          previewImage: cat.projects[0]?.images[0]?.url || null,
          cloudinaryImages: [],
        };
      }
    })
  );

  return NextResponse.json(categoriesWithCloudinary);
}
