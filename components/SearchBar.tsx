'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import wordsData from '@/app/Words/words.json';
import { WordEntry } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
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
      const results = fuseRef.current.search(query).map(r => r.item).slice(0, 5);
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
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an English word..."
          className="block w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-lg"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
          >
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item.word)}
                className="w-full px-6 py-3 text-left hover:bg-slate-50 flex justify-between items-center transition-colors group"
              >
                <span className="font-medium text-slate-700 group-hover:text-blue-600">
                  {item.word}
                </span>
                <span className="text-slate-400 font-noto-urdu text-sm" dir="rtl">
                  {item.meaning}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
