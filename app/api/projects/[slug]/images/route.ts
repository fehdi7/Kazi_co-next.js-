import { NextResponse } from "next/server";
import { getImagesByFolder } from "@/src/lib/cloudinary";
import prisma from "@/src/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    // Get project from database to find category
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get images from Cloudinary folder
    const folder = `projects/${project.category.slug}/${slug}`;
    const cloudinaryImages = await getImagesByFolder(folder);

    return NextResponse.json({
      project: project.title,
      category: project.category.name,
      images: cloudinaryImages.map(img => ({
        url: img.secure_url,
        publicId: img.public_id,
      })),
    });
  } catch (error) {
    console.error("Error fetching project images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
