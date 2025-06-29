// src/components/BookCard.js
import Link from "next/link";

export default function BookCard({ book, showListenButton = true }) {
  const getCategoryColor = (category) => {
    const colors = {
      "Self-help": "bg-purple-100 text-purple-800 border-purple-200",
      Productivity: "bg-green-100 text-green-800 border-green-200",
      Sales: "bg-red-100 text-red-800 border-red-200",
      Leadership: "bg-blue-100 text-blue-800 border-blue-200",
      Finance: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="p-6">
        <div className="flex space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-24 h-32 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                <svg
                  className="w-4 h-4 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v6.114a4.369 4.369 0 00-1.828-.814 3.982 3.982 0 00-2.4.814 3.987 3.987 0 00-1.772 3.314 3.987 3.987 0 001.772 3.314 3.982 3.982 0 002.4.814A4.369 4.369 0 006 17.114V7.82l8-1.6v5.894a4.369 4.369 0 00-1.828-.814 3.982 3.982 0 00-2.4.814 3.987 3.987 0 00-1.772 3.314 3.987 3.987 0 001.772 3.314 3.982 3.982 0 002.4.814A4.369 4.369 0 0014 17.114V3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                  book.category
                )}`}
              >
                {book.category}
              </span>
              {book.rating && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{book.rating}</span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              by <span className="font-medium">{book.author}</span>
            </p>

            <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
              {book.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{book.duration}</span>
                </div>
                {book.listeners && (
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    <span>{book.listeners}</span>
                  </div>
                )}
              </div>

              {showListenButton && (
                <Link
                  href={`/book/${book.id}`}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  Listen Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
