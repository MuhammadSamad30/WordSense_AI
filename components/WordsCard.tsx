'use client';

import { WordEntry } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { FiVolume2, FiInfo } from 'react-icons/fi';

interface WordsCardProps {
  entry: WordEntry;
}

export default function WordsCard({ entry }: WordsCardProps) {
  const { speak, isSpeaking, isUrduSupported } = useSpeech();

  const isWordSpeaking = isSpeaking(entry.word);
  const isMeaningSpeaking = isSpeaking(entry.meaning);

  return (
    <div className="group p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-500/30 flex flex-col justify-between relative overflow-hidden">
      
      {/* Upper Section */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors select-all">
              {entry.word}
            </h3>
            <span className="text-[10px] uppercase font-bold text-slate-450 dark:text-slate-500 tracking-widest block">
              English
            </span>
          </div>

          {/* English TTS Button */}
          <button
            onClick={() => speak(entry.word, 'en-US')}
            aria-label={`Listen to ${entry.word}`}
            className={`p-2 rounded-xl transition-all ${
              isWordSpeaking
                ? 'bg-blue-600 text-white animate-pulse'
                : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-slate-50 dark:bg-slate-800/40'
            }`}
          >
            <FiVolume2 size={16} />
          </button>
        </div>

        {/* Urdu Meaning in black */}
        <div className="my-6 flex justify-between items-center bg-slate-50/50 dark:bg-slate-850/20 p-4 rounded-2xl border border-slate-50 dark:border-slate-800/20">
          {/* Urdu TTS Button */}
          <div>
            {isUrduSupported ? (
              <button
                onClick={() => speak(entry.meaning, 'ur-PK')}
                aria-label={`Listen to translation of ${entry.word}`}
                className={`p-2 rounded-xl transition-all ${
                  isMeaningSpeaking
                    ? 'bg-blue-600 text-white animate-pulse'
                    : 'text-slate-450 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-900 shadow-sm'
                }`}
              >
                <FiVolume2 size={16} />
              </button>
            ) : (
              <div className="relative group/tooltip">
                <div className="p-2 rounded-xl text-slate-305 dark:text-slate-700 bg-white/50 dark:bg-slate-900/50 cursor-not-allowed">
                  <FiInfo size={16} />
                </div>
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block bg-slate-905 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Urdu TTS unavailable
                </div>
              </div>
            )}
          </div>

          <div className="text-right">
            <p 
              className="text-2xl font-bold font-noto-urdu text-slate-900 dark:text-slate-100 leading-normal select-all" 
              dir="rtl"
            >
              {entry.meaning}
            </p>
            <span className="text-[10px] uppercase font-bold text-slate-450 dark:text-slate-500 tracking-widest block">
              اردو معنی
            </span>
          </div>
        </div>
      </div>

      {/* Examples Block */}
      <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/50 mt-2">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
            &ldquo;{entry.example_en}&rdquo;
          </p>
        </div>
        <div>
          <p 
            className="text-base font-bold font-noto-urdu text-slate-450 dark:text-slate-500 text-right leading-relaxed" 
            dir="rtl"
          >
            {entry.example_ur}
          </p>
        </div>
      </div>

    </div>
  );
}
