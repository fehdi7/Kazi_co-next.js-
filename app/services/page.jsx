"use client"

import React from 'react'

const services = [
  {
    title: "Residential Interiors",
    description: "Transforming homes into personalized sanctuaries with elegant design solutions that reflect your lifestyle and personality.",
    icon: "🏠",
    features: ["Custom Space Planning", "Material Selection", "Lighting Design", "Furniture Layout"],
    color: "from-amber-50 to-orange-50",
    textColor: "text-amber-900",
    borderColor: "border-amber-200"
  },
  {
    title: "Commercial Spaces",
    description: "Creating inspiring work environments that boost productivity and leave lasting impressions on clients and employees.",
    icon: "🏢",
    features: ["Office Design", "Retail Spaces", "Hospitality", "Corporate Branding"],
    color: "from-slate-50 to-gray-50",
    textColor: "text-slate-900",
    borderColor: "border-slate-200"
  },
  {
    title: "Consultation & Planning",
    description: "Expert guidance through every phase of your interior design project, from concept to completion.",
    icon: "💡",
    features: ["Design Consultation", "Budget Planning", "Timeline Management", "Vendor Coordination"],
    color: "from-emerald-50 to-teal-50",
    textColor: "text-emerald-900",
    borderColor: "border-emerald-200"
  },
  {
    title: "Renovation Services",
    description: "Breathing new life into existing spaces with thoughtful renovations that preserve character while modernizing functionality.",
    icon: "🔨",
    features: ["Space Optimization", "Structural Changes", "Material Upgrades", "Modern Updates"],
    color: "from-rose-50 to-pink-50",
    textColor: "text-rose-900",
    borderColor: "border-rose-200"
  }
];

const stats = [
  { number: "40+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "24/7", label: "Support Available" }
];

function page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-amber-600/10 to-orange-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-amber-900 via-orange-800 to-stone-800 bg-clip-text text-transparent mb-6 animate-fade-in">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
              Crafting extraordinary interiors that tell your story, elevate your space, and create lasting impressions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-stone-100">
                <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-stone-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-linear-to-br ${service.color} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border ${service.borderColor} group cursor-pointer relative`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${service.textColor} group-hover:scale-105 transition-transform duration-300`}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-stone-600 mb-6 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3 group/feature"
                    style={{ animationDelay: `${(index * 0.15) + (featureIndex * 0.1)}s` }}
                  >
                    <div className={`w-2 h-2 rounded-full bg-linear-to-r from-amber-500 to-orange-500 group-hover/feature:scale-125 transition-transform duration-300`}></div>
                    <span className="text-stone-700 font-medium group-hover/feature:text-stone-900 transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-amber-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-linear-to-r from-amber-900 via-orange-800 to-stone-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-white rounded-full translate-y-10"></div>
            <div className="absolute bottom-0 right-1/3 w-16 h-16 bg-white rounded-full translate-y-8"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your vision and create something extraordinary together.
            </p>
            <button className="bg-white text-amber-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Project
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1.2s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default page
