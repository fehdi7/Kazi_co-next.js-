import React from 'react';

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
      <div className="bg-linear-to-r from-amber-900 via-amber-800 to-stone-800 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-base sm:text-xl text-amber-100">
            Four decades of excellence in interior design and construction
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-6 sm:space-y-8">
          {infos.map((info) => (
            <div
              key={info.title}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-100"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-amber-900 mb-3 sm:mb-4">
                {info.title}
              </h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-lg">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-stone-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-amber-900 to-orange-700 bg-clip-text text-transparent mb-2">
                40+
              </div>
              <div className="text-stone-600 font-medium text-sm sm:text-base">Years</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-amber-900 to-orange-700 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-stone-600 font-medium text-sm sm:text-base">Projects</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-amber-900 to-orange-700 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-stone-600 font-medium text-sm sm:text-base">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

