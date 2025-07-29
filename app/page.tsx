import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="w-full flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/next.svg" alt="SmartWriter AI Logo" width={40} height={40} />
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">SmartWriter AI</span>
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/auth/signin" className="hover:underline">Sign In</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Write High-Quality Blog Posts Effortlessly
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mb-8">
          SmartWriter AI helps you generate, edit, and manage blog content using the power of GPT-4. Save time, boost creativity, and grow your audience.
        </p>
        <Link href="/auth/signup">
          <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition mb-8">
            Get Started
          </button>
        </Link>
        <section id="features" className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">✍️</span>
            <h3 className="font-bold text-lg mb-1">AI-Powered Blog Generation</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Generate full-length blog posts with GPT-4 based on your title and outline.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🧠</span>
            <h3 className="font-bold text-lg mb-1">Smart Suggestions</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Get AI-powered title and outline suggestions to kickstart your writing.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">📝</span>
            <h3 className="font-bold text-lg mb-1">Rich Text Editor</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Edit, save, and manage your posts with a user-friendly editor.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">💳</span>
            <h3 className="font-bold text-lg mb-1">Flexible Pricing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Choose a plan that fits your needs. Free and Pro tiers available.</p>
          </div>
        </section>
      </main>
      <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} SmartWriter AI. All rights reserved.
      </footer>
    </div>
  );
}
