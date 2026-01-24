import CategoryCard from "@/components/CategoryCard.jsx";
import prisma from "@/src/lib/prisma";

export default async function ProjectsPage() {
  const categories = await prisma.category.findMany({
    include: {
      projects: {
        include: { images: true },
        take: 1,
        orderBy: { createdAt: 'desc' }
      },
    },
  });

  const categoriesWithPreview = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    previewImage: cat.projects[0]?.images[0]?.url || null,
  }));

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our Projects
          </h1>
          <p className="text-base sm:text-xl text-amber-100">
            Explore our portfolio of exceptional interior design projects
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {categoriesWithPreview.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              slug={category.slug}
              previewImage={category.previewImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

