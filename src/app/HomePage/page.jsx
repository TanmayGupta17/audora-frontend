"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [allItems, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${(
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
          ).replace(/\/$/, "")}/user/books`
        );
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.books || [];
        setItems(items);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-4xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 leading-tight mb-0">
          Explore Library
        </h1>
        <input
          type="text"
          placeholder="Search books, blogs, articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No results found.
          </div>
        ) : (
          filteredItems.map((item) => (
            <Link
              key={item._id}
              href={`/book/${item._id}`}
              className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group transition-transform hover:scale-105"
              onMouseEnter={() => setHoveredId(item._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-2 capitalize">
                  {item.type}
                </span>
                <h2 className="text-lg font-bold text-gray-900 mb-1 truncate">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2 truncate">
                  by {item.author}
                </p>
              </div>
              {/* Hover summary overlay */}
              <div
                className={`absolute inset-0 bg-white/95 flex items-center justify-center p-6 transition-opacity duration-300 ${
                  hoveredId === item._id
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-gray-800 text-base font-medium text-center">
                  {item.summary}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
