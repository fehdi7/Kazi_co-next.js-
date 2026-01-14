"use server";
import prisma from "@/src/lib/prisma";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title");

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error("Title is required");
  }

  const content = formData.get("content") as string;
  const slug = slugify(title);  
  console.log("Generated slug:", slug);
  if (!slug) {
    throw new Error("Invalid title — cannot generate slug");
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
    },
  });
}
