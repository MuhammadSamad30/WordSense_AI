'use client';

import { useState, useEffect } from 'react';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { GiDiceFire } from 'react-icons/gi'; // Dice icon for random word
import { getRandomWord } from '@/lib/randomWords';

interface RecentSearchesProps {
  onSearch: (word: string) => void;
  triggerRefresh?: number; // Used to trigger reload from parent when a new search occurs
}

export default function RecentSearches({ onSearch, triggerRefresh }: RecentSearchesProps) {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('wordsense_recent');
    if (stored) {
      try {
        setRecent(JSON.parse(stored));
      } catch {
        setRecent([]);
      }
    }
  }, [triggerRefresh]);

  const handleClear = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('wordsense_recent');
    setRecent([]);
  };

  const handleRandomClick = () => {
    const randomWord = getRandomWord();
    onSearch(randomWord);
  };

  if (recent.length === 0) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 w-full">
        <div className="text-slate-400 dark:text-slate-600 text-sm font-medium">
          No recent searches yet. Try a random word!
        </div>
        <button
          onClick={handleRandomClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          <GiDiceFire className="animate-spin-slow text-lg" />
          <span>Random Word</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4 w-full text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-wider">
          <FiClock />
          <span>Recent Searches</span>
        </div>
        <button
          onClick={handleClear}
          title="Clear History"
          className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-605 hover:underline transition-all"
        >
          <FiTrash2 />
          <span>Clear All</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Recent Search Tags */}
        <div className="flex flex-wrap gap-2">
          {recent.map((word) => (
            <button
              key={word}
              onClick={() => onSearch(word)}
              className="px-4 py-2 text-sm font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-100 dark:border-slate-800 rounded-full hover:border-blue-200/50 dark:hover:border-blue-900/30 transition-all hover:shadow-md active:scale-95"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Random Word Button */}
        <button
          onClick={handleRandomClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all ml-auto"
        >
          <GiDiceFire className="text-lg" />
          <span>Random Word</span>
        </button>
      </div>
    </div>
  );
}
