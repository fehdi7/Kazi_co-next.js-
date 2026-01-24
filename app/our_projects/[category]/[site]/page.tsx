import prisma from "@/src/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

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
          <Link href="/our_projects" className="text-amber-900 hover:underline">
            ← Back to all categories
          </Link>
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

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/our_projects/${category.slug}`}
            className="text-amber-200 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors text-sm sm:text-base"
          >
            ← {category.name} Projects
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {project.images.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 text-lg">No images for this project yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {project.images.map((img) => (
              <div 
                key={img.id} 
                className="overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={img.url}
                  alt={`${project.title} - Image`}
                  className="w-full h-40 sm:h-48 md:h-64 object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

