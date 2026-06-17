import { SearchResult } from '@/types';
import SpeakerButton from './SpeakerButton';
import { Sparkles } from 'lucide-react';

interface WordCardProps {
  result: SearchResult;
}

export default function WordCard({ result }: WordCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6 sm:p-8 space-y-8">
        {/* English Word Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold text-blue-600 tracking-tight">
                {result.word}
              </h2>
              {result.isAiGenerated && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
                  <Sparkles size={12} />
                  AI Generated
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm">English Word</p>
          </div>
          <SpeakerButton text={result.word} lang="en-US" className="mt-2" />
        </div>

        {/* Urdu Meaning Section */}
        <div className="flex justify-between items-center bg-slate-50/50 p-6 rounded-xl border border-slate-100/50">
          <div className="space-y-2 text-right w-full">
            <h3 className="text-4xl font-noto-urdu text-slate-900 leading-relaxed" dir="rtl">
              {result.meaning}
            </h3>
            <p className="text-slate-500 text-sm">اردو معنی</p>
          </div>
          <SpeakerButton text={result.meaning} lang="ur-PK" className="ml-4" />
        </div>

        {/* Examples Section */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <p className="text-slate-700 leading-relaxed font-medium">
                  {result.example_en}
                </p>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Example (English)</p>
              </div>
              <SpeakerButton text={result.example_en} lang="en-US" className="flex-shrink-0" />
            </div>

            <div className="flex justify-between items-start gap-4 bg-slate-50/30 p-4 rounded-lg">
              <div className="space-y-1 text-right w-full">
                <p className="text-slate-600 leading-relaxed font-noto-urdu text-xl" dir="rtl">
                  {result.example_ur}
                </p>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">مثال (اردو)</p>
              </div>
              <SpeakerButton text={result.example_ur} lang="ur-PK" className="flex-shrink-0 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
