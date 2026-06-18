export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            WordSense AI
          </span>
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
            Bridging languages with artificial intelligence.
          </p>
        </div>
        
        <div className="text-center md:text-right space-y-2">
          <p className="text-slate-400 dark:text-slate-600 text-xs font-bold uppercase tracking-widest">
            Developed with Excellence
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} WordSense AI. Powered by GPT-4o.
          </p>
        </div>
      </div>
    </footer>
  );
}
