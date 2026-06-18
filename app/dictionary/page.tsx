'use client';

import { useState, useMemo } from 'react';
import wordsData from '@/app/Words/words.json';
import { WordEntry } from '@/types';
import { Search, Book, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DictionaryPage() {
  const [search, setSearch] = useState('');
  
  const filteredWords = useMemo(() => {
    if (!search) return wordsData as WordEntry[];
    const s = search.toLowerCase();
    return (wordsData as WordEntry[]).filter(
      w => w.word.toLowerCase().includes(s) || w.meaning.includes(search)
    );
  }, [search]);

  return (
    <div className="relative flex-1 max-w-7xl mx-auto px-4 py-16 w-full overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[30%] h-[30%] bg-blue-400/5 blur-[100px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-indigo-400/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 relative z-10">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100/50 dark:border-blue-900/30"
          >
            <Sparkles size={12} />
            <span>Curated Collection</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Built-in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Dictionary</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
            Explore our professionally curated list of <span className="font-bold text-blue-600 dark:text-blue-400">{wordsData.length} core vocabulary</span> words with instant offline matches.
          </p>
        </div>

        <div className="relative w-full lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-600" />
          </div>
          <input
            type="text"
            placeholder="Search within built-in words..."
            className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl shadow-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-base font-medium dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {filteredWords.map((word, idx) => (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.03, 0.3) }}
            key={idx}
            className="group p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs font-bold font-mono">
                  #{idx + 1}
                </span>
                <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {word.word}
                </h3>
              </div>
              <p className="text-3xl font-noto-urdu text-slate-800 dark:text-slate-200 mb-6 leading-relaxed text-right" dir="rtl">
                {word.meaning}
              </p>
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">&quot;{word.example_en}&quot;</p>
              <p className="text-base font-noto-urdu text-slate-400 dark:text-slate-500 text-right leading-relaxed" dir="rtl">{word.example_ur}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredWords.length === 0 && (
        <div className="text-center py-24 relative z-10">
          <Book size={64} className="mx-auto text-slate-300 dark:text-slate-700 mb-4 animate-bounce" />
          <p className="text-slate-400 dark:text-slate-600 text-xl font-bold">No vocabulary matches</p>
          <p className="text-slate-400 dark:text-slate-600 font-medium">Try checking your spelling or search on the Home page for full AI synthesis.</p>
        </div>
      )}
    </div>
  );
}
