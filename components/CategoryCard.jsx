import Link from "next/link";

export default function CategoryCard({ name, slug, previewImage }) {
  return (
    <Link
      href={`/our_projects/${slug}`}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-stone-800 h-40 sm:h-48 flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
    >
      {previewImage ? (
        <>
          <img
            src={previewImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
        </>
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-stone-700 to-stone-800" />
      )}
      
      {/* Overlay gradient on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 text-center p-4 sm:p-6 transform transition-all duration-300 group-hover:-translate-y-2">
        <span className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg block">{name}</span>
        <div className="mt-1 sm:mt-2 text-white/80 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          View Projects →
        </div>
      </div>
    </Link>
  );
}

