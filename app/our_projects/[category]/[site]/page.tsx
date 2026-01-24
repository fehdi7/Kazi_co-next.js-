import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";
import { categoryExists, projectExists, getProjectDetails, getAllCategories } from "@/src/lib/cloudinary-data";

export const dynamic = 'force-dynamic';

// Mapping of folder names to display names
const CATEGORY_NAMES: Record<string, string> = {
  COMMERICAL: "Commercial",
  HEALTHCARE: "Healthcare",
  HOSPITALITY: "Hospitality",
  RESIDENTIAL: "Residential",
};

function getCategoryDisplayName(slug: string): string {
  const mappingKey = Object.keys(CATEGORY_NAMES).find(
    key => key.toLowerCase() === slug.toLowerCase()
  );
  if (mappingKey) {
    return CATEGORY_NAMES[mappingKey];
  }
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function getProjectDisplayName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, site: projectSlug } = await params;
  const slug = categorySlug.toLowerCase();
  const categoryName = getCategoryDisplayName(slug);
  const projectName = getProjectDisplayName(projectSlug);
  
  const categoryExistsBool = await categoryExists(slug);
  
  if (!categoryExistsBool) {
    return {
      title: "Project Not Found | Kazi Constructions",
      description: "The requested project could not be found.",
    };
  }

  const projectExistsBool = await projectExists(slug, projectSlug);
  
  if (!projectExistsBool) {
    return {
      title: "Project Not Found | Kazi Constructions",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${projectName} | ${categoryName} Projects - Kazi Constructions`,
    description: `View ${projectName} interior design project by Kazi Constructions. A showcase of our expertise in ${categoryName.toLowerCase()} interior design and construction.`,
    keywords: `${projectName} interior design, ${categoryName.toLowerCase()} project gallery, ${projectName} construction, commercial interior design ${projectName}`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ category: string; site: string }> }) {
  const { category: categorySlug, site: projectSlug } = await params;
  const slug = categorySlug.toLowerCase();

  const categoryExistsBool = await categoryExists(slug);
  
  if (!categoryExistsBool) {
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

  const projectExistsBool = await projectExists(slug, projectSlug);
  
  if (!projectExistsBool) {
    notFound();
  }

  const category = {
    id: slug,
    name: getCategoryDisplayName(slug),
    slug: slug,
  };

  const project = await getProjectDetails(slug, projectSlug);

  if (!project) {
    notFound();
  }

  // Convert Cloudinary image format to match what ProjectClient expects
  const projectWithImages = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    images: project.images.map(img => ({
      id: img.id,
      url: img.url,
    })),
  };

  return <ProjectClient category={category} project={projectWithImages} />;
}

