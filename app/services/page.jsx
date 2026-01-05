import React from 'react'

const sections = [
  {
    title: "Our Vision",
    description:
      "To design inspiring spaces that combine elegance, functionality, and comfort.",
  },
  {
    title: "Our Expertise",
    description:
      "Over 40 years of experience delivering premium residential and commercial interiors.",
  },
  {
    title: "Our Commitment",
    description:
      "We believe in quality, transparency, and long-term relationships with clients.",
  },
];


function page() {
  return (
    <div><div className="max-w-7xl mx-auto px-6 py-20">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} gap-8 my-10`}
          >
            <div className="flex-1">
              <h2 className="text-3xl h-[30vh] justify-center content-center font-semibold">{section.title}</h2>
            </div>
            <div className="flex-1 p-5">
              <p className="text-white h-[30vh] justify-center content-center bg-[#2e3b27]">{section.description}</p>
            </div>
          </div>
        ))}
      </div></div>
  )
}

export default page