import Link from 'next/link';
import { Book, Info, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WordSense AI
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link href="/dictionary" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
              <Book size={18} />
              <span>Built-in Dictionary</span>
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
              <Info size={18} />
              <span>About</span>
            </Link>
          </div>

          {/* Mobile menu icon would go here for a full implementation */}
        </div>
      </div>
    </nav>
  );
}
