import CategoryClient from "./CategoryClient";
import prisma from "@/src/lib/prisma";
import { getImagesByFolder } from "@/src/lib/cloudinary";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = await prisma.category.findUnique({
    where: { slug: category },
  });

  if (!cat) {
    return {
      title: "Category Not Found | Kazi Constructions",
      description: "The requested category could not be found.",
    };
  }

  const projectCount = await prisma.project.count({
    where: { categoryId: cat.id },
  });

  return {
    title: `${cat.name} Projects | Kazi Constructions - Interior Design Portfolio`,
    description: `Browse our ${cat.name} interior design projects. View ${projectCount}+ completed projects showcasing our expertise in ${cat.name.toLowerCase()} interior design and construction.`,
    keywords: `${cat.name.toLowerCase()} interior design, ${cat.name.toLowerCase()} projects gallery, commercial ${cat.name.toLowerCase()} design, professional ${cat.name.toLowerCase()} contractors`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;

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

  const projects = await prisma.project.findMany({
    where: { categoryId: category.id },
    include: { images: true },
    orderBy: { createdAt: 'desc' },
  });

  const projectsWithPreview = await Promise.all(
    projects.map(async (project) => {
      let previewImage = null;
      
      // First try to get image from Cloudinary
      try {
        const cloudinaryImages = await getImagesByFolder(`projects/${categorySlug}/${project.slug}`);
        if (cloudinaryImages.length > 0) {
          previewImage = cloudinaryImages[0].secure_url;
        }
      } catch (error) {
        console.error(`Error fetching Cloudinary images for ${project.slug}:`, error);
      }
      
      // Fallback to database images if Cloudinary has no images
      if (!previewImage && project.images.length > 0) {
        previewImage = project.images[0].url;
      }
      
      return {
        id: project.id,
        title: project.title,
        slug: project.slug,
        previewImage: previewImage,
      };
    })
  );

  return <CategoryClient category={category} projects={projectsWithPreview} />;
}

