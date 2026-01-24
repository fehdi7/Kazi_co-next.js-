"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function ProjectClient({ category, project }) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-10 sm:py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a 
            href={`/our_projects/${category.slug}`}
            className="text-amber-200 hover:text-white mb-4 inline-flex items-center gap-2 transition-all duration-300 text-sm sm:text-base hover:gap-3"
          >
            ← {category.name} Projects
          </a>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white transform hover:scale-105 transition-transform duration-300">
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
            {project.images.map((img, index) => (
              <ScrollReveal key={img.id} delay={index * 0.05}>
                <div 
                  className="overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <img
                    src={img.url}
                    alt={`${project.title} - Image`}
                    className="w-full h-40 sm:h-48 md:h-64 object-cover hover:scale-110 hover:rotate-1 transition-all duration-700 cursor-pointer"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

