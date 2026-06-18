import { SearchResult } from '@/types';
import SpeakerButton from './SpeakerButton';
import { Sparkles, Book, Quote, Layers, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface WordCardProps {
  result: SearchResult;
}

export default function WordCard({ result }: WordCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="p-8 sm:p-10 space-y-10">
        {/* English Word Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                {result.word}
              </h2>
              {result.partOfSpeech && (
                <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                  {result.partOfSpeech}
                </span>
              )}
              {result.isAiGenerated && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  AI Verified
                </span>
              )}
            </div>
            {result.phonetic && (
              <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-mono text-lg">
                <span>{result.phonetic}</span>
                <SpeakerButton text={result.word} lang="en-US" size={20} />
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
             {/* Empty for spacing or maybe a save button later */}
          </div>
        </div>

        {/* Urdu Meaning Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="space-y-4 text-right w-full">
              <h3 className="text-5xl sm:text-6xl font-noto-urdu text-slate-900 dark:text-white leading-relaxed" dir="rtl">
                {result.meaning}
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium uppercase tracking-widest">اردو معنی</p>
            </div>
            <div className="mr-6">
              <SpeakerButton text={result.meaning} lang="ur-PK" size={28} />
            </div>
          </div>
        </div>

        {/* English Definition */}
        {result.definition && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs font-bold">
              <Book size={14} />
              <span>Definition</span>
            </div>
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic">
              &quot;{result.definition}&quot;
            </p>
          </div>
        )}

        {/* Examples Section */}
        <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs font-bold mb-4">
            <Quote size={14} />
            <span>Usage Examples</span>
          </div>
          
          <div className="grid gap-6">
            <div className="bg-blue-50/30 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100/50 dark:border-blue-900/20 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {result.example_en}
                </p>
                <SpeakerButton text={result.example_en} lang="en-US" />
              </div>
              <div className="flex justify-between items-start gap-4 pt-4 border-t border-blue-100/30 dark:border-blue-900/10">
                <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-noto-urdu text-right w-full" dir="rtl">
                  {result.example_ur}
                </p>
                <SpeakerButton text={result.example_ur} lang="ur-PK" className="mr-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Synonyms & Antonyms */}
        {(result.synonyms?.length || result.antonyms?.length) && (
          <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            {result.synonyms && result.synonyms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs font-bold">
                  <Layers size={14} />
                  <span>Synonyms</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.synonyms.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-100 dark:border-emerald-900/30">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.antonyms && result.antonyms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs font-bold">
                  <ArrowRightLeft size={14} />
                  <span>Antonyms</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.antonyms.map((a, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-medium border border-rose-100 dark:border-rose-900/30">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
