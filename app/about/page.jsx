import React from 'react'

const infos = [
  {
    title: "Our Story",
    description:
      "Established in 1980, Kazi Construction Co. has been a trusted name in civil construction, interior works, and structural projects across commercial, residential, hospitality, healthcare, and institutional sectors. Founded under the leadership of Mr. Fazlu Kazi, the company is built on decades of hands-on expertise, strong technical knowledge, and a commitment to delivering excellence.",
  },
  {
    title: "Our Legacy & Growth",
    description:
      `From complex refurbishments and major repairs to large-scale commercial and hospitality projects, our journey has been shaped by consistency, reliability, and long-term client relationships.
        A key driver of our continued growth is our young, skilled, and dynamic management team, which blends experience with modern construction practices and innovative problem-solving.
        We follow a cost-effective, time-bound, and quality-driven approach, ensuring that every project meets the highest standards of safety, durability, and finish.`,
  },
  {
    title: `Midas Interiors – Our Interior Design Division`,
    description:
      `As part of our expansion, we launched our sister concern Midas Interiors in 2017.
      Midas Interiors specializes in interior design and turnkey fit-out solutions, offering creative planning combined with precise execution.`,
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-[#1f1f1f] flex justify-center items-start py-20">

  {/* Grey inner body with diagonal lines */}
  <div className="w-full mx-10 rounded-3xl bg-[#d9d9d9] relative p-10">

    {/* Diagonal lines overlay */}
    <div className="pointer-events-none absolute inset-0
      bg-[repeating-linear-gradient(
        45deg,
        rgba(0,0,0,0.05)_0,
        rgba(0,0,0,0.05)_1px,
        transparent_1px,
        transparent_8px
      )] rounded-3xl"
    />

    <h1 className="relative text-4xl font-bold text-center text-[#1f1f1f] mb-10">
      About Us
    </h1>

    {/* Frosted glass cards */}
    {infos.map((info) => (
      <div
        key={info.title}
        className="relative flex flex-col md:flex-row gap-8
          rounded-2xl overflow-hidden
          backdrop-blur-xl bg-white/25
          border border-white/30
          shadow-xl p-8 mb-8"
      >

        {/* Title */}
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-3xl font-semibold text-center text-[#1f1f1f]">
            {info.title}
          </h2>
        </div>

        {/* Description */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-[#2e2e2e] max-w-xl leading-relaxed">
            {info.description}
          </p>
        </div>

      </div>
    ))}

  </div>
</div>

  )
}

export default Page
