import CategoryCard from "@/Components/CategoryCard";
import { categories } from "@/data/mockData";

export const metadata = {
  title: "Categories - BookAudio",
  description:
    "Browse our curated collection of book summaries organized by topic and expertise area.",
};

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 block mb-6 leading-tight">
          Browse Categories
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore our curated collection of book summaries organized by topic
          and expertise area. Find the perfect content to accelerate your
          personal and professional growth.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Additional CTA */}
      <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Can't Find What You're Looking For?
        </h2>
        <p className="text-gray-600 mb-6">
          We're constantly adding new categories and books. Let us know what
          topics interest you most!
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Request a Category
        </button>
      </div>
    </div>
  );
}
