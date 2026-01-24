import SiteCard from "@/components/SiteCard";
import prisma from "@/src/lib/prisma";
import { getImagesByFolder } from "@/src/lib/cloudinary";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Category not found</h1>
          <Link href="/our_projects" className="text-amber-900 hover:underline">
            ← Back to all categories
          </Link>
        </div>
      </div>
    );
  }

  const projects = await prisma.project.findMany({
    where: { categoryId: category.id },
    orderBy: { createdAt: 'desc' },
  });

  const projectsWithCloudinary = await Promise.all(
    projects.map(async (project) => {
      try {
        const cloudinaryImages = await getImagesByFolder(`projects/${categorySlug}/${project.slug}`);
        return {
          id: project.id,
          title: project.title,
          slug: project.slug,
          previewImage: cloudinaryImages[0]?.secure_url || null,
        };
      } catch (error) {
        console.error(`Error fetching Cloudinary images for ${project.slug}:`, error);
        return {
          id: project.id,
          title: project.title,
          slug: project.slug,
          previewImage: null,
        };
      }
    })
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/our_projects"
            className="text-amber-200 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors"
          >
            ← All Categories
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white capitalize">
            {category.name} Projects
          </h1>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {projectsWithCloudinary.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 text-lg">No projects yet in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsWithCloudinary.map((project) => (
              <SiteCard
                key={project.id}
                category={category.slug}
                siteName={project.title}
                previewImage={project.previewImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

