'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [isUrduSupported, setIsUrduSupported] = useState<boolean>(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
    }
  }, []);

  const updateVoices = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
    
    // We always support Urdu TTS now because we have the Google Translate TTS fallback!
    setIsUrduSupported(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      // Still true since we have online audio fallback as long as window is defined
      setIsUrduSupported(typeof window !== 'undefined');
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
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [updateVoices]);

  const speak = useCallback((text: string, lang: 'en-US' | 'ur-PK') => {
    if (typeof window === 'undefined') return;

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Cancel current web speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setSpeakingText(null);
    if (!text) return;

    // Fallback synthesis function using Web Speech API
    const speakViaSynthesis = () => {
      if (!window.speechSynthesis) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utteranceRef.current = utterance;

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

      utterance.onstart = () => {
        setSpeakingText(text);
      };

      const handleEnd = () => {
        setSpeakingText((prev) => (prev === text ? null : prev));
      };

      utterance.onend = handleEnd;
      utterance.onerror = handleEnd;

      window.speechSynthesis.speak(utterance);
    };

    // Use Google Translate TTS ALWAYS for Urdu to guarantee high-quality voice playback
    if (lang === 'ur-PK') {
      if (audioRef.current) {
        // Use translate_tts endpoint which is highly reliable for Urdu pronunciation
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ur&client=tw-ob&q=${encodeURIComponent(text)}`;
        audioRef.current.src = url;
        audioRef.current.load(); // Reset buffer state
        
        audioRef.current.onplay = () => {
          setSpeakingText(text);
        };
        
        const handleAudioEnd = () => {
          setSpeakingText((prev) => (prev === text ? null : prev));
        };
        
        audioRef.current.onended = handleAudioEnd;
        audioRef.current.onerror = (e) => {
          console.warn("Audio playback failed, trying synthesis", e);
          speakViaSynthesis();
        };

        audioRef.current.play().catch((err) => {
          console.warn("Audio playback failed, trying synthesis", err);
          speakViaSynthesis();
        });
      } else {
        speakViaSynthesis();
      }
    } else {
      speakViaSynthesis();
    }
  }, [voices]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
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
