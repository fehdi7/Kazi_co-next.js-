import { NextResponse } from "next/server";
import  prisma  from "@/src/lib/prisma";

export async function GET(_: Request, { params }: any) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true },
  });

  return NextResponse.json(project);
}
