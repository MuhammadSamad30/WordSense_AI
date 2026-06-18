'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Sparkles } from 'lucide-react';
import Fuse from 'fuse.js';
import wordsData from '@/app/Words/words.json';
import { WordEntry } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<WordEntry[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fuseRef = useRef<Fuse<WordEntry> | null>(null);

  useEffect(() => {
    fuseRef.current = new Fuse(wordsData as WordEntry[], {
      keys: ['word'],
      threshold: 0.3,
      distance: 100,
    });
  }, []);

  useEffect(() => {
    if (query.length > 1 && fuseRef.current) {
      const results = fuseRef.current.search(query).map(r => r.item).slice(0, 6);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (word: string) => {
    setQuery(word);
    onSearch(word);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          ) : (
            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter any English word..."
          className="block w-full pl-14 pr-14 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl focus:ring-8 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-xl font-medium dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-rose-500 transition-colors z-10"
          >
            <X size={24} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute z-50 w-full mt-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="p-2">
              <div className="px-4 py-2 flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <Sparkles size={12} />
                <span>Quick Suggestions</span>
              </div>
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item.word)}
                  className="w-full px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 flex justify-between items-center transition-all duration-200 group rounded-2xl"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-lg">
                      {item.word}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium italic">Dictionary Match</span>
                  </div>
                  <span className="text-2xl font-noto-urdu text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" dir="rtl">
                    {item.meaning}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
