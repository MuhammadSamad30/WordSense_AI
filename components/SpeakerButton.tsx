'use client';

import { Volume2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { cn } from '@/lib/utils';

interface SpeakerButtonProps {
  text: string;
  lang: 'en-US' | 'ur-PK';
  className?: string;
  size?: number;
}

export default function SpeakerButton({ text, lang, className, size = 20 }: SpeakerButtonProps) {
  return (
    <button
      onClick={() => speak(text, lang)}
      className={cn(
        "p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transform shadow-sm border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm",
        className
      )}
      title="Listen Pronunciation"
    >
      <Volume2 size={size} />
    </button>
  );
}
