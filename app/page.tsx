'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WordCard from '@/components/WordCard';
import SkeletonCard from '@/components/SkeletonCard';
import RecentSearches from '@/components/RecentSearches';
import { SearchResult, WordEntry } from '@/types';
import wordsData from '@/data/words.json';
import { Zap, Brain, Globe, Sparkles } from 'react-icons/fi';
import { BookOpen } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentRefresh, setRecentRefresh] = useState(0);

  // Sync with query parameter if present on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const wordParam = params.get('word');
    if (wordParam) {
      handleSearch(wordParam);
    }
  }, []);

  const handleSearch = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    // Update URL query parameter
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('word', trimmed);
      window.history.pushState({}, '', url.toString());
    }

    try {
      // 1. Check local pre-stored words first (case-insensitive)
      const localMatch = (wordsData as WordEntry[]).find(
        (item) => item.word.toLowerCase() === trimmed.toLowerCase()
      );

      if (localMatch) {
        setResult({ ...localMatch, isAiGenerated: false });
        addToRecent(localMatch.word);
        setIsLoading(false);
        return;
      }

      // 2. Fetch from OpenAI server-side route
      const response = await fetch(`/api/meaning?word=${encodeURIComponent(trimmed)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch meaning from AI');
      }

      const data = await response.json();
      setResult(data);
      addToRecent(data.word);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      toast.error(message, {
        style: {
          borderRadius: '1rem',
          background: '#e11d48',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToRecent = (word: string) => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('wordsense_recent');
    let list: string[] = [];
    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch {
        list = [];
      }
    }
    // Remove if already in list, put at the front, limit to 8 searches
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    list = [capitalizedWord, ...list.filter((w) => w.toLowerCase() !== word.toLowerCase())].slice(0, 8);
    localStorage.setItem('wordsense_recent', JSON.stringify(list));
    
    // Increment to trigger reload of RecentSearches component
    setRecentRefresh((prev) => prev + 1);
  };

  return (
    <div className="relative flex-1 flex flex-col items-center px-4 pt-16 pb-24 overflow-hidden">
      
      {/* react-hot-toast notifications */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Background Glow Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-400/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[25%] h-[25%] bg-purple-400/10 blur-[80px] rounded-full animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100/50 dark:border-blue-900/20 shadow-sm"
        >
          <Zap size={16} className="fill-current text-amber-500 animate-pulse" />
          <span className="uppercase tracking-wider">Next-Gen AI Dictionary</span>
        </motion.div>
        
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none"
          >
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 dark:from-blue-450 dark:to-indigo-400">Language</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Experience the world&apos;s most advanced English-to-Urdu dictionary, powered by AI. Instant meanings, perfect pronunciations, and smart examples.
          </motion.p>
        </div>

        {/* Feature Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 text-slate-450 dark:text-slate-500 font-bold text-xs uppercase tracking-wider pt-4"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
            <Brain size={14} className="text-blue-500" />
            <span>Smart Context</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
            <Globe size={14} className="text-indigo-500" />
            <span>Native Urdu</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
            <Sparkles size={14} className="text-amber-505" />
            <span>AI Verified</span>
          </div>
        </motion.div>
      </div>

      {/* Search Input Container */}
      <div className="w-full max-w-2xl relative z-10">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {/* Recent Searches & Random Word Button */}
        <RecentSearches onSearch={handleSearch} triggerRefresh={recentRefresh} />
      </div>

      {/* Result Display Section */}
      <div className="w-full max-w-3xl mt-16 relative z-10">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <SkeletonCard />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-10 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-[2.5rem] text-center space-y-4 shadow-xl"
            >
              <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-450 mb-2">
                 <Zap size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-rose-605 dark:text-rose-400 font-black text-2xl uppercase tracking-wider">Search Failed</p>
                <p className="text-rose-500 dark:text-rose-300 text-lg font-medium">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-rose-600/20 active:scale-95"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {result && !isLoading && !error && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <WordCard result={result} />
            </motion.div>
          )}

          {!result && !isLoading && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 grayscale opacity-30 dark:opacity-20"
            >
              <BookOpen size={100} className="mx-auto text-slate-400 mb-8" />
              <div className="space-y-2">
                <p className="text-3xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Ready to explore</p>
                <p className="text-slate-400 dark:text-slate-500 font-medium">Type any word or click &quot;Random Word&quot; above to search</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
