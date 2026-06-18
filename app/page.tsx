'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WordCard from '@/components/WordCard';
import { SearchResult, WordEntry } from '@/types';
import wordsData from '@/app/Words/words.json';
import { Loader2, Sparkles, BookOpen, Zap, Brain, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Check local JSON first
      const localMatch = (wordsData as WordEntry[]).find(
        (item) => item.word.toLowerCase() === query.toLowerCase()
      );

      if (localMatch) {
        // Even if found locally, we might want to enrich it with AI for the "Next Level" experience
        // but for now let's just use the local match to save tokens if it's there.
        setResult(localMatch);
        setIsLoading(false);
        return;
      }

      // 2. Fetch from AI if not found locally
      const response = await fetch(`/api/dictionary?word=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col items-center px-4 pt-16 pb-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-400/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[25%] h-[25%] bg-purple-400/10 blur-[80px] rounded-full animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100/50 dark:border-blue-900/30 shadow-sm"
        >
          <Zap size={16} className="fill-current" />
          <span className="uppercase tracking-wider">Next-Gen AI Dictionary</span>
        </motion.div>
        
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
          >
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Language</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Experience the world&apos;s most advanced English-to-Urdu dictionary, powered by GPT-4o. Instant meanings, perfect pronunciations, and smart examples.
          </motion.p>
        </div>

        {/* Feature Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 text-slate-400 dark:text-slate-500 font-medium text-sm pt-4"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
            <Brain size={14} />
            <span>Smart Context</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
            <Globe size={14} />
            <span>Native Urdu</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
            <Sparkles size={14} />
            <span>AI Verified</span>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      <div className="w-full max-w-3xl mt-16 relative z-10">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse rounded-full" />
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin relative" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">AI is thinking...</p>
                <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Analyzing context and generating Urdu meanings</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-10 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-[2rem] text-center space-y-4 shadow-xl"
            >
              <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 mb-2">
                 <Zap size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-rose-600 dark:text-rose-400 font-black text-2xl uppercase tracking-wider">Connection Lost</p>
                <p className="text-rose-500 dark:text-rose-300 text-lg font-medium">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="px-6 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {result && (
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
              className="text-center py-20 grayscale opacity-20"
            >
              <BookOpen size={120} className="mx-auto text-slate-400 mb-8" />
              <div className="space-y-2">
                <p className="text-3xl font-black text-slate-400 uppercase tracking-[0.2em]">Ready to explore</p>
                <p className="text-slate-400 font-medium">Type any word above to begin your journey</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
