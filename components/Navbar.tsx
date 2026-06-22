import Link from 'next/link';
import { Book, Info, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                WordSense AI
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link href="/words-bank" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
              <Book size={18} />
              <span>Words Bank</span>
            </Link>
            <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
              <Info size={18} />
              <span>About</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="sm:hidden flex items-center space-x-2">
            <Link href="/" title="Home" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Home size={20} />
            </Link>
            <Link href="/words-bank" title="Words Bank" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Book size={20} />
            </Link>
            <Link href="/about" title="About" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Info size={20} />
            </Link>
            <div className="pl-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
