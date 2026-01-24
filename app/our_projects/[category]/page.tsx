import CategoryClient from "./CategoryClient";
import { categoryExists, getProjectsByCategory, getAllCategories } from "@/src/lib/cloudinary-data";

export const dynamic = 'force-dynamic';

// Mapping of folder names to display names
const CATEGORY_NAMES: Record<string, string> = {
  COMMERICAL: "Commercial",
  HEALTHCARE: "Healthcare",
  HOSPITALITY: "Hospitality",
  RESIDENTIAL: "Residential",
};

function getCategoryDisplayName(slug: string): string {
  // Try to get from our mapping first
  const mappingKey = Object.keys(CATEGORY_NAMES).find(
    key => key.toLowerCase() === slug.toLowerCase()
  );
  if (mappingKey) {
    return CATEGORY_NAMES[mappingKey];
  }
  // Fallback: capitalize the slug
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const slug = category.toLowerCase();
  const categoryName = getCategoryDisplayName(slug);
  
  const exists = await categoryExists(slug);
  
  if (!exists) {
    return {
      title: "Category Not Found | Kazi Constructions",
      description: "The requested category could not be found.",
    };
  }

  const projects = await getProjectsByCategory(slug);
  const projectCount = projects.length;

  return {
    title: `${categoryName} Projects | Kazi Constructions - Interior Design Portfolio`,
    description: `Browse our ${categoryName} interior design projects. View ${projectCount}+ completed projects showcasing our expertise in ${categoryName.toLowerCase()} interior design and construction.`,
    keywords: `${categoryName.toLowerCase()} interior design, ${categoryName.toLowerCase()} projects gallery, commercial ${categoryName.toLowerCase()} design, professional ${categoryName.toLowerCase()} contractors`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const slug = categorySlug.toLowerCase();

  const exists = await categoryExists(slug);

  if (!exists) {
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

  const category = {
    id: slug,
    name: getCategoryDisplayName(slug),
    slug: slug,
  };

  const projects = await getProjectsByCategory(slug);

  const projectsWithPreview = projects.map(project => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    previewImage: project.previewImage || null,
  }));

  return <CategoryClient category={category} projects={projectsWithPreview} />;
}

