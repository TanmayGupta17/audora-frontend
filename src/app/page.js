"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [books, setBooks] = useState([]);
  const [demoBookId, setDemoBookId] = useState(null); // Which book's audio is showing
  const [isPlaying, setIsPlaying] = useState(null); // Which book's audio is playing
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your real auth logic

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(
          `${(
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
          ).replace(/\/$/, "")}/user/books`
        );
        const data = await res.json();
        console.log("Fetched books:", data); // Add this line to debug
        setBooks(data.slice(0, 3)); // Only 3 books
      } catch (err) {
        setBooks([]);
      }
    }
    fetchBooks();
  }, []);
  useEffect(() => {
    // Example: check for a token in localStorage
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging line
    setIsLoggedIn(!!token);
  }, []);
  const handleDemoClick = (bookId) => {
    setDemoBookId(bookId);
    setIsPlaying(bookId);
  };

  const handleListenClick = (bookId) => {
    if (!isLoggedIn) {
      // Save the intended page
      sessionStorage.setItem("redirectAfterLogin", `/book/${bookId}`);
      window.location.href = "/Authentication";
      return;
    }

    // Already logged in
    window.location.href = `/book/${bookId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
              🎧 Audio-First Learning Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Books into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 block mt-2">
              Audio Summaries
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Discover key insights from business and self-help books through
            AI-generated audio summaries. Learn faster, retain more, and apply
            knowledge immediately with our curated collection.
          </p>

          {/* Demo and Get Started Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/book/685fdfc000383c58a789100b"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>View Demo</span>
            </Link>

            <Link
              href="/Authentication"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Get Started</span>
            </Link>
          </div>

          <Link
            href="/how-it-works"
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            <span>How It Works</span>
            <svg
              className="w-4 h-4 ml-1"
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

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mt-12 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>24+ Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>150+ Book Summaries</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>10K+ Active Learners</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "AI-Powered Summaries",
              description:
                "Advanced AI extracts key insights and converts them into engaging, easy-to-understand audio content that captures the essence of entire books.",
            },
            {
              title: "Save Valuable Time",
              description:
                "Get the essence of entire books in 15-25 minute audio summaries, perfect for busy professionals and lifelong learners.",
            },
            {
              title: "Learn Anywhere",
              description:
                "Listen while commuting, exercising, or during any downtime to maximize your learning potential and build consistent habits.",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Books */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Featured Summaries
              </h2>
              <p className="text-xl text-gray-600">
                Hand-picked book summaries to accelerate your personal growth
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group transition-transform hover:scale-105 p-6 flex flex-col"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-4">by {book.author}</p>
                <div className="flex gap-2 justify-between mt-auto">
                  <button
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                    onClick={() => handleDemoClick(book._id)}
                  >
                    ▶ Demo
                  </button>
                  <button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 "
                    onClick={() => handleListenClick(book._id)}
                  >
                    Listen Now
                  </button>
                </div>
                {/* Show audio player only if Demo was clicked for this book */}
                {demoBookId === book._id && (
                  <div className="mt-4">
                    <audio
                      src={book.audioUrl}
                      controls
                      autoPlay
                      onPlay={() => setIsPlaying(book._id)}
                      onPause={() => setIsPlaying(null)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of learners who are accelerating their growth with
              our premium audio summaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Categories"
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Start Learning Today</span>
                <svg
                  className="w-5 h-5"
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
              <Link
                href="/book/1"
                className="bg-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-900 transition-colors inline-flex items-center space-x-2"
              >
                <span>Try Demo</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
