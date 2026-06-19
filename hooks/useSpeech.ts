'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [isUrduSupported, setIsUrduSupported] = useState<boolean>(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const updateVoices = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);

    // Check if an Urdu voice is available
    const hasUrdu = availableVoices.some((v) => 
      v.lang.toLowerCase().startsWith('ur') || 
      v.lang.toLowerCase().includes('urdu')
    );
    
    setIsUrduSupported(hasUrdu);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsUrduSupported(false);
      return;
    }

    updateVoices();

    // The getVoices() list is loaded asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [updateVoices]);

  const speak = useCallback((text: string, lang: 'en-US' | 'ur-PK') => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel current speaking
    window.speechSynthesis.cancel();
    setSpeakingText(null);

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utteranceRef.current = utterance;

    // Find custom voice if possible
    if (voices.length > 0) {
      if (lang === 'ur-PK') {
        const urduVoice = voices.find((v) => 
          v.lang.toLowerCase() === 'ur-pk' || 
          v.lang.toLowerCase() === 'ur-in' ||
          v.lang.toLowerCase().startsWith('ur')
        );
        if (urduVoice) {
          utterance.voice = urduVoice;
        }
      } else {
        const englishVoice = voices.find((v) => 
          v.lang.toLowerCase() === 'en-us' || 
          v.lang.toLowerCase() === 'en-gb' ||
          v.lang.toLowerCase().startsWith('en')
        );
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }
    }

    // Set speaking state handlers
    utterance.onstart = () => {
      setSpeakingText(text);
    };

    const handleEnd = () => {
      setSpeakingText((prev) => (prev === text ? null : prev));
    };

    utterance.onend = handleEnd;
    utterance.onerror = handleEnd;

    window.speechSynthesis.speak(utterance);
  }, [voices]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeakingText(null);
  }, []);

  const isSpeaking = useCallback((text: string) => {
    return speakingText === text;
  }, [speakingText]);

  return {
    speak,
    stop,
    isSpeaking,
    isUrduSupported,
    speakingText,
  };
}
