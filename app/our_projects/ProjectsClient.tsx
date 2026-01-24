"use client";

import CategoryCard from "@/components/CategoryCard.jsx";
import ScrollReveal from "@/components/ScrollReveal";

export default function ProjectsClient({ categories }) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-12 sm:py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 transform hover:scale-105 transition-transform duration-300">
              Our Projects
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-xl text-amber-100 opacity-0 animate-fade-in">
              Explore our portfolio of exceptional interior design projects
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.1}>
              <div className="transform hover:scale-[1.02] transition-transform duration-500">
                <CategoryCard
                  name={category.name}
                  slug={category.slug}
                  previewImage={category.previewImage}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

