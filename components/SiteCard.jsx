import Link from "next/link";

export default function SiteCard({ category, siteName, previewImage }) {
  const slug = siteName.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/our_projects/${category}/${slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
    >
      <div className="h-40 sm:h-48 overflow-hidden relative">
        {previewImage ? (
          <img
            src={previewImage}
            alt={siteName}
            className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-stone-700 to-stone-800 flex items-center justify-center">
            <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl mb-2">🏗️</div>
              <span className="text-white/60 text-xs">Preview coming soon</span>
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="p-3 sm:p-4 text-center bg-white group-hover:bg-amber-50/30 transition-colors duration-300">
        <h3 className="font-semibold text-base sm:text-lg text-stone-800 group-hover:text-amber-900 transform group-hover:scale-105 transition-all duration-300">
          {siteName}
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 group-hover:text-amber-700 transition-colors duration-300 flex items-center justify-center gap-1">
          View Gallery 
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </p>
      </div>
    </Link>
  );
}

