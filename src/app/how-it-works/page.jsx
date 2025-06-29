import Link from "next/link";

export const metadata = {
  title: "How It Works - LearnWise",
  description:
    "Discover how LearnWise transforms books into powerful audio learning experiences",
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Audora Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your learning with our audio-first approach to book
            summaries
          </p>
        </div>

        {/* Business Pitch */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16 border border-indigo-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At LearnWise, we're revolutionizing learning by transforming the
              world's best business and self-help books into powerful audio
              summaries. We believe knowledge should be accessible anytime,
              anywhere.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our AI-powered platform distills key insights from 300+ page books
              into 15-25 minute audio experiences, preserving the essence while
              saving you valuable time.
            </p>

            {/* Value Proposition */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 mt-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                The LearnWise Advantage
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "⏱️",
                    title: "Save 10+ hours per book",
                    description:
                      "Condensed audio summaries deliver key insights without the time commitment",
                  },
                  {
                    icon: "🧠",
                    title: "Retain 40% more information",
                    description:
                      "Audio-first approach improves comprehension and retention rates",
                  },
                  {
                    icon: "📱",
                    title: "Learn anywhere, anytime",
                    description:
                      "Access insights during commutes, workouts, or any downtime",
                  },
                  {
                    icon: "🎭",
                    title: "Professional narration",
                    description:
                      "Industry experts bring content to life with engaging delivery",
                  },
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{advantage.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {advantage.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Process
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "AI-Powered Analysis",
                description:
                  "Our advanced algorithms analyze bestselling books to extract key concepts, principles, and actionable insights that matter most.",
                details: [
                  "Deep content analysis",
                  "Key concept extraction",
                  "Actionable insight identification",
                  "Structure optimization",
                ],
              },
              {
                step: "2",
                title: "Expert Narration",
                description:
                  "Industry professionals transform the content into engaging audio experiences with clear delivery and perfect pacing.",

                details: [
                  "Professional voice actors",
                  "Industry expert review",
                  "Optimized pacing",
                  "High-quality production",
                ],
              },
              {
                step: "3",
                title: "Modular Learning",
                description:
                  "Content is organized into digestible modules with clear takeaways, making it easy to learn and apply knowledge.",

                details: [
                  "Structured modules",
                  "Clear learning objectives",
                  "Practical applications",
                  "Key takeaway summaries",
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">
                  {item.icon}
                </div> */}
                {/* <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm mb-2">
                    {item.step}
                  </span>
                </div> */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Proven Results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Active Learners", icon: "👥" },
              { number: "150+", label: "Book Summaries", icon: "📚" },
              { number: "25+", label: "Categories", icon: "🏷️" },
              { number: "95%", label: "Satisfaction Rate", icon: "⭐" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of professionals accelerating their growth with
              LearnWise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Categories"
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Browse Library</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
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
