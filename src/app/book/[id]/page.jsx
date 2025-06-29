"use client";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import AudioPlayer from "@/Components/AudioPlayer";
import Link from "next/link";

export default function BookSummary() {
  const params = useParams();
  const bookId = params.id;

  const [book, setBook] = useState(null);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [totalDuration, setTotalDuration] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const [bookRes, allBooksRes] = await Promise.all([
          fetch(
            `${(
              process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
            ).replace(/\/$/, "")}/user/books/${bookId}`
          ),
          fetch(
            `${(
              process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
            ).replace(/\/$/, "")}/user/books`
          ),
        ]);

        if (!bookRes.ok) throw new Error("Book not found");

        const data = await bookRes.json();
        const allBooks = await allBooksRes.json();

        setBook(data);
        setFeaturedBooks(allBooks);
        await calculateTotalDuration(data);
      } catch (err) {
        console.error("Error fetching book:", err);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    async function calculateDurationFromUrl(url) {
      return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration || 0);
        });
        audio.addEventListener("error", () => resolve(0));
      });
    }

    async function calculateTotalDuration(book) {
      let total = 0;

      total += await calculateDurationFromUrl(book.audioUrl);

      if (book.modules && Array.isArray(book.modules)) {
        const moduleDurations = await Promise.all(
          book.modules.map((mod) =>
            mod.audioUrl ? calculateDurationFromUrl(mod.audioUrl) : 0
          )
        );
        total += moduleDurations.reduce((acc, dur) => acc + dur, 0);
      }

      const hours = Math.floor(total / 3600);
      const minutes = Math.floor((total % 3600) / 60);
      const seconds = Math.floor(total % 60);

      const formatted =
        hours > 0
          ? `${hours}h ${minutes}m${seconds > 0 ? ` ${seconds}s` : ""}`
          : `${minutes}m${seconds > 0 ? ` ${seconds}s` : ""}`;

      setTotalDuration(formatted);
    }

    if (bookId) fetchBook();
  }, [bookId]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    fetch(
      `${(
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
      ).replace(/\/$/, "")}/user/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, feedback }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit feedback");
        return res.json();
      })
      .then(() => {
        setFeedback("");
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
      })
      .catch((err) => console.error("Error submitting feedback:", err));
  };

  const getCategoryColor = (category) => {
    if (!category) return "from-gray-500 to-gray-600";
    const key = category.trim().toLowerCase();
    const colors = {
      "self-help": "from-purple-500 to-pink-500",
      productivity: "from-green-500 to-emerald-500",
      sales: "from-red-500 to-orange-500",
      leadership: "from-blue-500 to-indigo-500",
      finance: "from-yellow-500 to-amber-500",
    };
    return colors[key] || "from-gray-500 to-gray-600";
  };

  if (loading) return <div className="p-8 text-center">Loading book...</div>;
  if (!book) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/Categories" className="hover:text-indigo-600">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate">{book.title}</li>
          </ol>
        </nav>

        {/* Book Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div
            className={`bg-gradient-to-r ${getCategoryColor(
              book.category
            )} p-8`}
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-48 h-64 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
              <div className="text-white text-center lg:text-left flex-1">
                <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {book.category}
                </span>
                <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                  {book.title}
                </h1>
                <p className="text-xl mb-6">
                  by <span className="font-semibold">{book.author}</span>
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                  <span className="bg-white/20 px-4 py-2 rounded-full flex items-center space-x-2">
                    ⏱️ <span>{totalDuration || "Calculating..."}</span>
                  </span>
                  {book.rating && (
                    <span className="bg-white/20 px-4 py-2 rounded-full flex items-center space-x-2">
                      ⭐ <span>{book.rating}</span>
                    </span>
                  )}
                  {book.numlisteners && (
                    <span className="bg-white/20 px-4 py-2 rounded-full flex items-center space-x-2">
                      👂 <span>{book.numlisteners} listeners</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Audio Summary */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Complete Book Summary
            </h2>
            <AudioPlayer
              audioUrl={book.audioUrl}
              title={`${book.title} - Complete Summary`}
              transcript={book.transcript}
            />
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About This Book
          </h2>
          <p className="text-gray-800 mb-4">{book.summary}</p>
          <p className="text-gray-600">{book.fullContent}</p>
        </div>

        {/* Modules */}
        {book.modules?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                🎯
              </span>
              Key Learning Modules
            </h2>
            <div className="space-y-6">
              {book.modules.map((mod, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl font-bold text-gray-900">
                    {idx + 1}. {mod.title}
                  </h3>
                  <p className="text-gray-700 mb-2">{mod.description}</p>
                  {mod.audioUrl && (
                    <AudioPlayer
                      audioUrl={mod.audioUrl}
                      title={mod.title}
                      transcript={mod.transcript}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Want More Books Like This?
              </h3>
              <p className="text-gray-600 mt-1">
                Help us build our library by suggesting books you'd love to hear
              </p>
            </div>
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-sm"
            >
              {showFeedback ? "Close" : "Request Books"}
            </button>
          </div>

          {showFeedback && (
            <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                Suggest Your Next Favorite Book
              </h4>
              {isSubmitted ? (
                <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg flex items-center">
                  ✅ Thanks for your suggestion! We'll consider adding this book
                  to our library.
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Which book should we summarize next?"
                    rows={4}
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-sm"
                    >
                      Submit Suggestion
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* More from Category */}
        {featuredBooks.length > 0 && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              More from {book.category}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredBooks
                .filter((b) => b.category === book.category && b.id !== book.id)
                .slice(0, 2)
                .map((relatedBook) => (
                  <Link
                    key={relatedBook.id}
                    href={`/book/${relatedBook.id}`}
                    className="flex items-center space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
                  >
                    <img
                      src={relatedBook.coverImage}
                      alt={relatedBook.title}
                      className="w-16 h-20 rounded-lg object-cover group-hover:shadow-md transition-shadow"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {relatedBook.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        by {relatedBook.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {relatedBook.duration}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
