'use client';

import { Volume2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { cn } from '@/lib/utils';

interface SpeakerButtonProps {
  text: string;
  lang: 'en-US' | 'ur-PK';
  className?: string;
}

export default function SpeakerButton({ text, lang, className }: SpeakerButtonProps) {
  return (
    <button
      onClick={() => speak(text, lang)}
      className={cn(
        "p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600",
        className
      )}
      title="Listen"
    >
      <Volume2 size={20} />
    </button>
  );
}
