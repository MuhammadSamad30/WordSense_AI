'use client';

import { useState, useMemo } from 'react';
import wordsData from '@/app/Words/words.json';
import { WordEntry } from '@/types';
import { Search, Book } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Book size={24} />
            <h1 className="text-3xl font-bold tracking-tight">Built-in Dictionary</h1>
          </div>
          <p className="text-slate-500">
            Explore our curated list of {wordsData.length} core vocabulary words.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search within built-in words..."
            className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWords.map((word, idx) => (
          <div 
            key={idx}
            className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-blue-100"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                {word.word}
              </h3>
            </div>
            <p className="text-2xl font-noto-urdu text-slate-800 mb-2 leading-relaxed" dir="rtl">
              {word.meaning}
            </p>
            <div className="space-y-2 pt-4 border-t border-slate-50">
              <p className="text-sm text-slate-600 italic">&quot;{word.example_en}&quot;</p>
              <p className="text-sm font-noto-urdu text-slate-400" dir="rtl">{word.example_ur}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No words found matching your search.</p>
        </div>
      )}
    </div>
  );
}
