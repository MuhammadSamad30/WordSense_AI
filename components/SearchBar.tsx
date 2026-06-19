'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Loader2 } from 'lucide-react'; // Can keep loader from lucide or react-icons
import Levenshtein from 'fast-levenshtein';
import { wordList } from '@/lib/wordList';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility and suggestions navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1 >= suggestions.length ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 < 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[focusedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedIndex(-1);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
      setFocusedIndex(-1);
    }
  };

  const handleSuggestionClick = (word: string) => {
    setQuery(word);
    onSearch(word);
    setShowSuggestions(false);
    setFocusedIndex(-1);
  };

  // Debounced Levenshtein distance suggestions calculation
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery.length >= 2) {
      debounceTimerRef.current = setTimeout(() => {
        // Optimization: filter candidate words first to avoid heavy calculations
        // Only calculate Levenshtein for words that have a similar length (difference <= 2)
        // or share the first letter to keep interface responsive.
        const firstChar = trimmedQuery[0];
        const candidates = wordList.filter((word) => {
          const lenDiff = Math.abs(word.length - trimmedQuery.length);
          return lenDiff <= 2 || (word[0] === firstChar && lenDiff <= 3);
        });

        // Calculate distances
        const scored = candidates.map((word) => {
          const distance = Levenshtein.get(word, trimmedQuery);
          return { word, distance };
        });

        // Sort by distance and take top 5
        scored.sort((a, b) => a.distance - b.distance);
        const top5 = scored.slice(0, 5).map((item) => item.word);

        setSuggestions(top5);
        setShowSuggestions(true);
      }, 150); // Debounced 150ms
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
          ) : (
            <HiOutlineSearch className="h-7 w-7 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          )}
        </div>

        {/* Big Large Rounded Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search any English word..."
          aria-label="Search English word"
          aria-autocomplete="list"
          aria-expanded={showSuggestions && suggestions.length > 0}
          className="block w-full pl-16 pr-14 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-xl focus:ring-8 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none text-xl font-semibold dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus-visible:ring-8 focus-visible:ring-blue-500/10 focus-visible:border-blue-600"
          autoComplete="off"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            aria-label="Clear search input"
            className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-rose-500 transition-colors z-10"
          >
            <MdClose size={26} />
          </button>
        )}
      </form>

      {/* Auto-suggest dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-50 w-full mt-4 bg-white dark:bg-slate-900 border-2 border-slate-100/80 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="p-3">
            {suggestions.map((suggestion, index) => {
              const isFocused = index === focusedIndex;
              return (
                <li
                  key={suggestion}
                  role="option"
                  aria-selected={isFocused}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-6 py-4 cursor-pointer text-left flex justify-between items-center transition-all duration-150 rounded-2xl ${
                    isFocused
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold scale-[1.01]'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-700 dark:text-slate-300 font-medium'
                  }`}
                >
                  <span className="text-lg">{suggestion}</span>
                  {isFocused && (
                    <span className="text-xs text-blue-500 dark:text-blue-400 font-semibold tracking-wider uppercase">
                      Select
                    </span>
                  )}
                </li>
              );
            })}
          </div>
        </ul>
      )}
    </div>
  );
}
