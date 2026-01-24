import Link from "next/link";

export default function SiteCard({ category, siteName, previewImage }) {
  const slug = siteName.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/our_projects/${category}/${slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="h-40 sm:h-48 overflow-hidden relative">
        {previewImage ? (
          <img
            src={previewImage}
            alt={siteName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-stone-700 to-stone-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-2">🏗️</div>
              <span className="text-white/60 text-xs">Preview coming soon</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 text-center">
        <h3 className="font-semibold text-base sm:text-lg text-stone-800 group-hover:text-amber-900 transition-colors">
          {siteName}
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 group-hover:text-amber-700 transition-colors">
          View Gallery →
        </p>
      </div>
    </Link>
  );
}

