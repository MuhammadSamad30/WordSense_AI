'use client';

import { WordEntry } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { FiVolume2 } from 'react-icons/fi';

interface WordsCardProps {
  entry: WordEntry;
  viewMode?: 'grid' | 'list';
}

export default function WordsCard({ entry, viewMode = 'grid' }: WordsCardProps) {
  const { speak, isSpeaking } = useSpeech();

  const isWordSpeaking = isSpeaking(entry.word);
  const isMeaningSpeaking = isSpeaking(entry.meaning);

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="group p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden">
        
        {/* Left/Center: English Word + Translation */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
          
          {/* English Word */}
          <div className="flex items-center gap-2.5 min-w-[160px]">
            <button
              onClick={() => speak(entry.word, 'en-US')}
              aria-label={`Listen to ${entry.word}`}
              className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
                isWordSpeaking
                  ? 'bg-blue-600 text-white animate-pulse'
                  : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-slate-50 dark:bg-slate-800/40'
              }`}
            >
              <FiVolume2 size={14} />
            </button>
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors select-all">
                {entry.word}
              </h3>
              <span className="text-[8px] uppercase font-bold text-slate-450 dark:text-slate-500 tracking-wider block">
                English
              </span>
            </div>
          </div>

          {/* Urdu Translation */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 pr-4 sm:border-r border-slate-150 dark:border-slate-800/60 min-w-[160px]">
            <button
              onClick={() => speak(entry.meaning, 'ur-PK')}
              aria-label={`Listen to Urdu translation of ${entry.word}`}
              className={`p-1.5 rounded-lg transition-all order-1 sm:order-none ${
                isMeaningSpeaking
                  ? 'bg-blue-600 text-white animate-pulse'
                  : 'text-slate-450 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800/50'
              }`}
            >
              <FiVolume2 size={14} />
            </button>
            <div className="text-right">
              <p 
                className="text-base sm:text-lg font-bold font-noto-urdu text-slate-900 dark:text-slate-100 leading-tight select-all" 
                dir="rtl"
              >
                {entry.meaning}
              </p>
              <span className="text-[8px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mt-0.5">
                اردو معنی
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Examples */}
        <div className="flex-[1.5] min-w-0 pl-0 md:pl-6 md:border-l border-slate-150 dark:border-slate-800/60 space-y-1">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
            &ldquo;{entry.example_en}&rdquo;
          </p>
          <p 
            className="text-xs sm:text-sm font-semibold font-noto-urdu text-slate-500 dark:text-slate-500 text-right leading-relaxed" 
            dir="rtl"
          >
            {entry.example_ur}
          </p>
        </div>

      </div>
    );
  }

  // Grid View Layout (Default)
  return (
    <div className="group p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-500/30 flex flex-col justify-between relative overflow-hidden">
      
      <div>
        {/* Header: English Word & Audio */}
        <div className="flex justify-between items-center mb-3">
          <div className="space-y-0.5">
            <h3 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors select-all">
              {entry.word}
            </h3>
            <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block">
              English
            </span>
          </div>

          <button
            onClick={() => speak(entry.word, 'en-US')}
            aria-label={`Listen to ${entry.word}`}
            className={`p-1.5 rounded-lg transition-all ${
              isWordSpeaking
                ? 'bg-blue-600 text-white animate-pulse'
                : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-slate-50 dark:bg-slate-800/40'
            }`}
          >
            <FiVolume2 size={14} />
          </button>
        </div>

        {/* Translation: Urdu Meaning & Audio */}
        <div className="my-3 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20 p-3 rounded-xl border border-slate-100/50 dark:border-slate-800/50">
          <button
            onClick={() => speak(entry.meaning, 'ur-PK')}
            aria-label={`Listen to Urdu translation of ${entry.word}`}
            className={`p-1.5 rounded-lg transition-all ${
              isMeaningSpeaking
                ? 'bg-blue-600 text-white animate-pulse'
                : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-900 shadow-sm'
            }`}
          >
            <FiVolume2 size={14} />
          </button>

          <div className="text-right">
            <p 
              className="text-lg font-bold font-noto-urdu text-slate-900 dark:text-slate-100 leading-tight select-all" 
              dir="rtl"
            >
              {entry.meaning}
            </p>
            <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mt-0.5">
              اردو معنی
            </span>
          </div>
        </div>
      </div>

      {/* Examples: Compact Block */}
      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/50 mt-2">
        <div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
            &ldquo;{entry.example_en}&rdquo;
          </p>
        </div>
        <div>
          <p 
            className="text-xs sm:text-sm font-semibold font-noto-urdu text-slate-500 dark:text-slate-500 text-right leading-relaxed" 
            dir="rtl"
          >
            {entry.example_ur}
          </p>
        </div>
      </div>

    </div>
  );
}
