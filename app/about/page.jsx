import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "About Us | Kazi Constructions - 40+ Years of Interior Design Excellence",
  description: "Learn about Kazi Constructions, a trusted name in interior design and construction since 1980. Discover our legacy of excellence, our team, and our commitment to delivering premium interior solutions across residential, commercial, hospitality, and healthcare sectors.",
  keywords: "interior design company Mumbai, construction company India, commercial interior design, residential interior designers, hospitality interior design, healthcare interior design, Midas Interiors",
};

const infos = [
  {
    title: "Our Story",
    description: "Established in 1980, Kazi Construction Co. has been a trusted name in civil construction, interior works, and structural projects across commercial, residential, hospitality, healthcare, and institutional sectors. Founded under the leadership of Mr. Fazlu Kazi, the company is built on decades of hands-on expertise, strong technical knowledge, and a commitment to delivering excellence.",
  },
  {
    title: "Our Legacy & Growth",
    description: "From complex refurbishments and major repairs to large-scale commercial and hospitality projects, our journey has been shaped by consistency, reliability, and long-term client relationships. A key driver of our continued growth is our young, skilled, and dynamic management team, which blends experience with modern construction practices and innovative problem-solving. We follow a cost-effective, time-bound, and quality-driven approach, ensuring that every project meets the highest standards of safety, durability, and finish.",
  },
  {
    title: "Midas Interiors – Our Interior Design Division",
    description: "As part of our expansion, we launched our sister concern Midas Interiors in 2017. Midas Interiors specializes in interior design and turnkey fit-out solutions, offering creative planning combined with precise execution.",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-16 sm:py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 transform hover:scale-105 transition-transform duration-300">
              About Us
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-xl text-amber-100 opacity-0 animate-fade-in">
              Four decades of excellence in interior design and construction
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-6 sm:space-y-8">
          {infos.map((info, index) => (
            <ScrollReveal key={info.title} delay={index * 0.15}>
              <div
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-stone-100 group"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-amber-900 mb-3 sm:mb-4 transform group-hover:translate-x-2 transition-transform duration-300">
                  {info.title}
                </h2>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-lg transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                  {info.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <ScrollReveal>
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              {[
                { number: "40+", label: "Years" },
                { number: "500+", label: "Projects" },
                { number: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-xl hover:bg-amber-50/50 transition-colors duration-300">
                  <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-amber-900 to-orange-700 bg-clip-text text-transparent mb-2 transform hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-stone-600 font-medium text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default Page;

