"use client"
import Image from "next/image";


export default function Home() {
  return (
    <main>

      {/* Hero */}
      <div className="relative h-[70vh]">
        <Image
          src="/images/bg1.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Section */}
      <div className="relative bg-[#1f1f1f] text-white py-20 flex justify-center">
        <div className="relative w-full mx-10 rounded-3xl bg-[#d9d9d9] p-10">

          {/* Diagonal overlay */}
          <div className={`pointer-events-none absolute inset-0
            bg-[repeating-linear-gradient(
              45deg,
              rgba(0,0,0,0.05)_0,
              rgba(0,0,0,0.05)_1px,
              transparent_1px,
              transparent_8px
            )] rounded-3xl`}
          />

          {/* Cards */}
          <div className="relative flex flex-col md:flex-row gap-6">
            {[
              {
                title: "Transforming Spaces. Elevating Lifestyles.",
                text: "We create timeless interiors that blend luxury, comfort, and functionality."
              },
              {
                title: "Designing With Purpose. Building With Precision.",
                text: "For over four decades, our team has delivered bespoke interior solutions."
              },
              {
                title: "40+ Years of Excellence in Interior Design",
                text: "Turning homes and commercial spaces into inspired environments since 1980."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/25 backdrop-blur-xl rounded-3xl p-6 flex-1"
              >
                <h2 className="text-lg font-light mb-2 text-black">
                  {item.title}
                </h2>
                <p className="text-xs font-semibold text-black">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
