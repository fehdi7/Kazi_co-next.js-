"use client";

import SiteCard from "@/components/SiteCard.jsx";
import ScrollReveal from "@/components/ScrollReveal";

export default function CategoryClient({ category, projects }) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-10 sm:py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/our_projects"
            className="text-amber-200 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors text-sm sm:text-base hover:gap-3"
          >
            ← All Categories
          </a>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white capitalize transform hover:scale-105 transition-transform duration-300">
            {category.name} Projects
          </h1>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 text-lg">No projects yet in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <div className="transform hover:scale-[1.02] transition-transform duration-500">
                  <SiteCard
                    category={category.slug}
                    siteName={project.title}
                    previewImage={project.previewImage}
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

