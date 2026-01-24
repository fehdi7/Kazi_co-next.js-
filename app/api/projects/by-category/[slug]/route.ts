import { NextResponse } from "next/server";
import  prisma  from "@/src/lib/prisma";

export async function GET(_: Request, { params }: any) {
  const projects = await prisma.project.findMany({
    where: { category: { slug: params.slug } },
    include: { images: true },
    orderBy: { createdAt: 'desc' },
  });

  // Add preview image (first image) to each project
  const projectsWithPreview = projects.map(project => ({
    ...project,
    previewImage: project.images[0]?.url || null,
  }));

  return NextResponse.json(projectsWithPreview);
}
