"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Transforming Spaces. Elevating Lifestyles.",
      description: "We create timeless interiors that blend luxury, comfort, and functionality.",
      icon: "🏠",
    },
    {
      title: "Designing With Purpose. Building With Precision.",
      description: "For over four decades, our team has delivered bespoke interior solutions.",
      icon: "✨",
    },
    {
      title: "40+ Years of Excellence in Interior Design",
      description: "Turning homes and commercial spaces into inspired environments since 1980.",
      icon: "🏆",
    },
  ];

  const stats = [
    { number: "40+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-96 md:min-h-150">
        <Image
          src="/images/bg1.jpg"
          alt="Luxury Interior Design"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-900/70 via-stone-900/50 to-stone-900/70" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
            Kazi Constructions
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-200 max-w-xl md:max-w-3xl mb-6 md:mb-10 animate-fade-in-delay">
            Crafting extraordinary interiors that tell your story, elevate your space, and create lasting impressions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-delay-2 w-full sm:w-auto">
            <Link
              href="/our_projects"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-amber-900 text-white rounded-full font-semibold hover:bg-amber-800 hover:scale-105 transition-all duration-300 shadow-lg text-center"
            >
              View Projects
            </Link>
            <Link
              href="/services"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Scroll indicator - hidden on very small screens */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center pt-1 sm:pt-2">
            <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 sm:py-16 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-900 to-orange-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-stone-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-stone-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-100"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="text-4xl sm:text-5xl shrink-0">{feature.icon}</div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-stone-800 mb-2 sm:mb-3">
                      {feature.title}
                    </h2>
                    <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-base sm:text-xl text-amber-100 mb-6 sm:mb-8">
            Let&apos;s discuss your vision and create something extraordinary together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-900 rounded-full font-semibold hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Your Project
          </Link>
        </div>
      </section>

    </div>
  );
}

