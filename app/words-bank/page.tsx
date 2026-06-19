'use client';

import { useState, useMemo } from 'react';
import wordsData from '@/data/words.json';
import { WordEntry } from '@/types';
import { HiOutlineSearch } from 'react-icons/hi';
import { FiBookOpen } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import WordsCard from '@/components/WordsCard';
import { motion } from 'framer-motion';

export default function WordsBankPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return wordsData as WordEntry[];

    return (wordsData as WordEntry[]).filter(
      (item) =>
        item.word.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="relative flex-1 max-w-7xl mx-auto px-4 py-16 w-full overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[35%] h-[35%] bg-blue-400/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[15%] left-[-5%] w-[40%] h-[40%] bg-indigo-400/5 blur-[120px] rounded-full" />
      </div>

      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 relative z-10">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100/50 dark:border-blue-900/30"
          >
            <Sparkles size={12} />
            <span>Built-in Words Bank</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Vocabulary</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
            Explore our curated selection of <span className="font-extrabold text-blue-600 dark:text-blue-400">{wordsData.length} essential words</span> with instant pronunciation and translations.
          </p>
        </div>

        {/* Client-Side Search Filter */}
        <div className="relative w-full lg:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <HiOutlineSearch className="h-5 w-5 text-slate-400 dark:text-slate-650 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search words or meanings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl shadow-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-base font-semibold dark:text-white"
          />
        </div>
      </div>

      {/* Grid of Word Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {filteredWords.map((entry, idx) => (
          <motion.div
            layout
            key={entry.word}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.02, 0.3) }}
          >
            <WordsCard entry={entry} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredWords.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 relative z-10"
        >
          <FiBookOpen size={64} className="mx-auto text-slate-300 dark:text-slate-700 mb-4 animate-bounce" />
          <p className="text-slate-450 dark:text-slate-600 text-xl font-bold">No vocabulary matches</p>
          <p className="text-slate-400 dark:text-slate-600 font-medium mt-1">
            Try checking your spelling or search on the homepage.
          </p>
        </motion.div>
      )}

    </div>
  );
}
