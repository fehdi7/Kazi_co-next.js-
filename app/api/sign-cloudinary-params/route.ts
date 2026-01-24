import { NextResponse } from "next/server";
import  prisma  from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, slug, categorySlug, images } = await req.json();

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        categoryId: category.id,
        images: {
          create: images.map((img: any) => ({
            url: img.url,
            publicId: img.publicId,
          })),
        },
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
