'use client';

import { SearchResult } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { FiVolume2, FiCopy, FiShare2, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface WordCardProps {
  result: SearchResult;
}

export default function WordCard({ result }: WordCardProps) {
  const { speak, isSpeaking, isUrduSupported } = useSpeech();

  const handleCopy = async () => {
    try {
      const copyText = `Word: ${result.word}\nUrdu Meaning: ${result.meaning}\nExample: ${result.example_en}\nTranslation: ${result.example_ur}`;
      await navigator.clipboard.writeText(copyText);
      toast.success('Copied translation to clipboard!', {
        icon: '📋',
        style: {
          borderRadius: '1rem',
          background: '#333',
          color: '#fff',
        },
      });
    } catch {
      toast.error('Failed to copy to clipboard.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `WordSense AI - ${result.word}`,
      text: `Learn the Urdu meaning and usage of "${result.word}" on WordSense AI:\n"${result.meaning}"\n\nExample: ${result.example_en}\nUrdu: ${result.example_ur}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        // Fallback: copy shareable link
        const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/?word=${encodeURIComponent(result.word)}` : '';
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Shareable link copied to clipboard!', {
          icon: '🔗',
          style: {
            borderRadius: '1rem',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Failed to share.');
      }
    }
  };

  const isWordSpeaking = isSpeaking(result.word);
  const isMeaningSpeaking = isSpeaking(result.meaning);
  const isExampleEnSpeaking = isSpeaking(result.example_en);
  const isExampleUrSpeaking = isSpeaking(result.example_ur);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="p-8 sm:p-10 space-y-8">
        
        {/* Top Header Row with Actions */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h2 className="text-5xl font-black text-blue-600 dark:text-blue-400 tracking-tight select-all">
              {result.word}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 dark:text-slate-500 font-mono text-sm uppercase tracking-wider">
                English Word
              </span>
              <button
                onClick={() => speak(result.word, 'en-US')}
                aria-label={`Listen to pronunciation of ${result.word}`}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isWordSpeaking
                    ? 'bg-blue-600 text-white animate-pulse'
                    : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                <FiVolume2 size={20} className={isWordSpeaking ? 'scale-110' : ''} />
              </button>
            </div>
          </div>

          {/* Copy and Share Row */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              title="Copy Word Details"
              aria-label="Copy word details to clipboard"
              className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all active:scale-95"
            >
              <FiCopy size={20} />
            </button>
            <button
              onClick={handleShare}
              title="Share Word"
              aria-label="Share this word definition"
              className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all active:scale-95"
            >
              <FiShare2 size={20} />
            </button>
          </div>
        </div>

        {/* Urdu Meaning Card Section */}
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
            
            {/* TTS volume icon for Urdu */}
            <div className="flex-shrink-0">
              {isUrduSupported ? (
                <button
                  onClick={() => speak(result.meaning, 'ur-PK')}
                  aria-label="Listen Urdu translation pronunciation"
                  className={`p-3 rounded-2xl transition-all duration-200 ${
                    isMeaningSpeaking
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <FiVolume2 size={24} className={isMeaningSpeaking ? 'scale-110' : ''} />
                </button>
              ) : (
                <div className="relative group/tooltip">
                  <div className="p-3 rounded-2xl text-slate-300 dark:text-slate-700 bg-slate-100/50 dark:bg-slate-800/50 cursor-not-allowed">
                    <FiInfo size={24} />
                  </div>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block bg-slate-900 dark:bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50">
                    Urdu TTS is not supported on this browser
                  </div>
                </div>
              )}
            </div>

            {/* Urdu Meaning in Black (Text) */}
            <div className="space-y-1 text-right flex-1 min-w-0 pr-4">
              <h3 
                className="text-4xl sm:text-5xl font-bold font-noto-urdu text-slate-950 dark:text-white leading-relaxed select-all" 
                dir="rtl"
              >
                {result.meaning}
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
                اردو معنی
              </p>
            </div>

          </div>
        </div>

        {/* Examples Section */}
        <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs font-black">
            Example Usage
          </h4>

          <div className="bg-blue-50/20 dark:bg-blue-950/10 p-6 rounded-[2rem] border border-blue-100/50 dark:border-blue-900/20 space-y-5">
            
            {/* English Example */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                  &ldquo;{result.example_en}&rdquo;
                </p>
                <span className="text-slate-400 dark:text-slate-600 text-xs uppercase tracking-wider block">
                  English Example
                </span>
              </div>
              <button
                onClick={() => speak(result.example_en, 'en-US')}
                aria-label="Listen English example sentence"
                className={`p-2 rounded-xl transition-all flex-shrink-0 ${
                  isExampleEnSpeaking
                    ? 'bg-blue-600 text-white animate-pulse'
                    : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                }`}
              >
                <FiVolume2 size={18} />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-blue-100/30 dark:border-blue-900/10" />

            {/* Urdu Example Translation */}
            <div className="flex justify-between items-start gap-4">
              {isUrduSupported ? (
                <button
                  onClick={() => speak(result.example_ur, 'ur-PK')}
                  aria-label="Listen Urdu example translation"
                  className={`p-2 rounded-xl transition-all flex-shrink-0 ${
                    isExampleUrSpeaking
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                  }`}
                >
                  <FiVolume2 size={18} />
                </button>
              ) : (
                <div className="relative group/tooltip flex-shrink-0">
                  <div className="p-2 rounded-xl text-slate-300 dark:text-slate-700 cursor-not-allowed">
                    <FiInfo size={18} />
                  </div>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block bg-slate-900 dark:bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                    Urdu TTS is not supported on this browser
                  </div>
                </div>
              )}
              
              <div className="space-y-1 text-right flex-1 min-w-0">
                <p 
                  className="text-2xl font-bold font-noto-urdu text-slate-650 dark:text-slate-400 leading-loose" 
                  dir="rtl"
                >
                  {result.example_ur}
                </p>
                <span className="text-slate-450 dark:text-slate-600 text-xs uppercase tracking-wider block">
                  اردو ترجمہ
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
