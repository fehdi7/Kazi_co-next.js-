import prisma from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

export async function generateMetadata({ params }) {
  const { category: categorySlug, site: projectSlug } = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    return {
      title: "Project Not Found | Kazi Constructions",
      description: "The requested project could not be found.",
    };
  }

  const project = await prisma.project.findFirst({
    where: { 
      slug: projectSlug,
      categoryId: category.id
    },
  });

  if (!project) {
    return {
      title: "Project Not Found | Kazi Constructions",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | ${category.name} Projects - Kazi Constructions`,
    description: `View ${project.title} interior design project by Kazi Constructions. A showcase of our expertise in ${category.name.toLowerCase()} interior design and construction.`,
    keywords: `${project.title} interior design, ${category.name.toLowerCase()} project gallery, ${project.title} construction, commercial interior design ${project.title}`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ category: string; site: string }> }) {
  const { category: categorySlug, site: projectSlug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Category not found</h1>
          <a href="/our_projects" className="text-amber-900 hover:underline">
            ← Back to all categories
          </a>
        </div>
      </div>
    );
  }

  const project = await prisma.project.findFirst({
    where: { 
      slug: projectSlug,
      categoryId: category.id
    },
    include: { 
      images: true 
    },
  });

  if (!project) {
    notFound();
  }

  return <ProjectClient category={category} project={project} />;
}

