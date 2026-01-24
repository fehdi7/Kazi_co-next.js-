import prisma from "@/src/lib/prisma";
import fs from "fs";
import path from "path";

const categories: Record<string, string> = {
  RESIDENTIAL: "residential",
  COMMERICAL: "commercial",
  HOSPITALITY: "hospitality",
  HEALTHCARE: "healthcare",
};

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
}

async function main() {
  // Ensure categories exist
  await prisma.category.createMany({
    data: [
      { name: "Residential", slug: "residential" },
      { name: "Commercial", slug: "commercial" },
      { name: "Hospitality", slug: "hospitality" },
      { name: "Healthcare", slug: "healthcare" },
    ],
    skipDuplicates: true,
  });

  // Get categories from DB
  const dbCategories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(dbCategories.map((c) => [c.slug, c.id]));

  // Base path to project images
  const projectsPath = path.join(process.cwd(), "public", "Project_images");

  // Read category folders
  const categoryFolders = fs.readdirSync(projectsPath);

  for (const folder of categoryFolders) {
    if (!categories[folder]) continue;

    const categorySlug = categories[folder];
    const categoryId = categoryMap[categorySlug];
    const categoryPath = path.join(projectsPath, folder);

    // Read project subfolders
    const projectFolders = fs.readdirSync(categoryPath);

    for (const projectFolder of projectFolders) {
      const projectPath = path.join(categoryPath, projectFolder);
      
      if (!fs.statSync(projectPath).isDirectory()) continue;

      // Read images in project folder
      const files = fs.readdirSync(projectPath);
      const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

      if (imageFiles.length === 0) continue;

      const title = projectFolder.replace(/-/g, " ").trim();
      const projectSlug = slugify(projectFolder);

      // Check if project exists
      const existing = await prisma.project.findUnique({
        where: { slug: projectSlug },
      });

      if (existing) {
        console.log(`Skipping existing project: ${title}`);
        continue;
      }

      // Create project with images
      const images = imageFiles.map((file) => ({
        url: `/Project_images/${folder}/${projectFolder}/${file}`,
        publicId: `projects/${folder}/${projectFolder}/${file}`,
      }));

      await prisma.project.create({
        data: {
          title,
          slug: projectSlug,
          categoryId,
          images: {
            create: images,
          },
        },
      });

      console.log(`Created project: ${title} with ${images.length} images`);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

