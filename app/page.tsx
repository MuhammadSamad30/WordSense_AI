'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WordCard from '@/components/WordCard';
import { SearchResult, WordEntry } from '@/types';
import wordsData from '@/app/Words/words.json';
import { Loader2, Sparkles, BookOpen } from 'lucide-react';
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
    <div className="flex-1 flex flex-col items-center px-4 pt-16 pb-24">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold border border-blue-100"
        >
          <Sparkles size={16} />
          <span>AI-Powered English-Urdu Dictionary</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight"
        >
          Unlock Every <span className="text-blue-600">Meaning</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg max-w-xl mx-auto"
        >
          Search any English word and get instant Urdu translations, examples, and pronunciations.
        </motion.p>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <div className="w-full max-w-2xl mt-12">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-4"
            >
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Consulting the AI experts...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 bg-red-50 border border-red-100 rounded-2xl text-center space-y-2"
            >
              <p className="text-red-600 font-semibold text-lg">Oops!</p>
              <p className="text-red-500">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <WordCard result={result} />
            </motion.div>
          )}

          {!result && !isLoading && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 opacity-40 grayscale"
            >
              <BookOpen size={64} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-400 font-medium">Try searching for &quot;Tolerance&quot; or &quot;Ephemeral&quot;</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
