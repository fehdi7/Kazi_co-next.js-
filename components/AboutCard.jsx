export default function Card({ title, description }) {
  return (
    <div className="border border-black/10 rounded-2xl p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-medium mb-3">
        {title}
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
