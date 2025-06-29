import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BookAudio - Transform Books into Audio Summaries",
  description:
    "Discover key insights from business and self-help books through AI-generated audio summaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600">
              © 2025 BookAudio. Transform your learning with AI-powered book
              summaries.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
