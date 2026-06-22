'use client';

import { useState, useMemo } from 'react';
import wordsData from '@/data/words.json';
import { WordEntry } from '@/types';
import { HiOutlineSearch } from 'react-icons/hi';
import { FiBookOpen, FiGrid, FiList } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import WordsCard from '@/components/WordsCard';
import { motion } from 'framer-motion';

export default function WordsBankPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 1. Filter words based on the search query
  const filteredWords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return wordsData as WordEntry[];

    return (wordsData as WordEntry[]).filter(
      (item) =>
        item.word.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // 2. Group the filtered words alphabetically (category-wise)
  const groupedWords = useMemo(() => {
    const groups: { [key: string]: WordEntry[] } = {};

    // Sort words alphabetically first
    const sorted = [...filteredWords].sort((a, b) => a.word.localeCompare(b.word));

    sorted.forEach((item) => {
      const firstLetter = item.word.charAt(0).toUpperCase();
      const key = /^[A-Z]$/.test(firstLetter) ? firstLetter : '#';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });

    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });

    return { groups, sortedKeys };
  }, [filteredWords]);

  const { groups, sortedKeys } = groupedWords;

  return (
    <div className="relative flex-1 max-w-7xl mx-auto px-4 py-12 w-full overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[35%] h-[35%] bg-blue-400/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[15%] left-[-5%] w-[40%] h-[40%] bg-indigo-400/5 blur-[120px] rounded-full" />
      </div>

      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 relative z-10">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100/50 dark:border-blue-900/30"
          >
            <Sparkles size={12} />
            <span>Built-in Words Bank</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 dark:from-blue-400 dark:to-indigo-400">Vocabulary</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl">
            Explore our curated selection of <span className="font-extrabold text-blue-600 dark:text-blue-400">{wordsData.length} essential words</span>, organized alphabetically.
          </p>
        </div>

        {/* Client-Side Search Filter & View Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search filter input */}
          <div className="relative flex-1 sm:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <HiOutlineSearch className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Filter words or meanings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl shadow-md focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-semibold dark:text-white"
            />
          </div>

          {/* Grid / List Switcher */}
          <div className="flex items-center bg-slate-105 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/40 dark:border-slate-700/40 shadow-inner self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Alphabet Navigation Quick Jumps (Redesigned) */}
      {sortedKeys.length > 0 && (
        <div className="sticky top-[4.5rem] z-30 w-full mb-8 relative">
          <div 
            className="w-full py-3 px-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-md overflow-x-auto scrollbar-none flex items-center justify-start md:justify-center gap-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Quick Jump Label */}
            <div className="flex-shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-extrabold pr-3 border-r border-slate-200 dark:border-slate-805 mr-1 select-none">
              <Sparkles size={11} className="text-blue-500 animate-pulse" />
              <span>Quick Jump</span>
            </div>

            {/* Alphabet Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {sortedKeys.map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    const element = document.getElementById(`section-${letter}`);
                    if (element) {
                      const offset = 180; // Offset for sticky navbar + subheader
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = element.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-xs font-black rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-650 dark:hover:from-blue-500 dark:hover:to-indigo-500 active:scale-95 transition-all shadow-sm border border-slate-100 dark:border-slate-700/40 cursor-pointer"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
          
          {/* Subtle horizontal gradient overlays for mobile indicators */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-full bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-950/50 pointer-events-none md:hidden" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-full bg-gradient-to-l from-slate-50/50 to-transparent dark:from-slate-950/50 pointer-events-none md:hidden" />
        </div>
      )}

      {/* Grid or List list Grouped by Alphabet */}
      <div className="space-y-10 relative z-10">
        {sortedKeys.map((letter) => (
          <div key={letter} id={`section-${letter}`} className="scroll-mt-48 space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-850 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                {letter}
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-205 to-transparent dark:from-slate-800/60 dark:to-transparent" />
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {groups[letter].length} {groups[letter].length === 1 ? 'Word' : 'Words'}
              </span>
            </div>
            
            {/* List or Grid Container */}
            <div className={viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              : "flex flex-col gap-3.5"
            }>
              {groups[letter].map((entry) => (
                <WordsCard key={entry.word} entry={entry} viewMode={viewMode} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWords.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 relative z-10"
        >
          <FiBookOpen size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4 animate-bounce" />
          <p className="text-slate-500 dark:text-slate-450 text-lg font-bold">No vocabulary matches</p>
          <p className="text-slate-400 dark:text-slate-650 text-sm mt-1">
            Try checking your spelling or search on the homepage.
          </p>
        </motion.div>
      )}

    </div>
  );
}
