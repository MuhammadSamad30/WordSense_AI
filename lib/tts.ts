export const speak = (text: string, lang: 'en-US' | 'ur-PK') => {
  if (typeof window === 'undefined') return;

  // Stop any current speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  
  // Try to find a better voice if available
  const voices = window.speechSynthesis.getVoices();
  if (lang === 'ur-PK') {
    const urduVoice = voices.find(v => v.lang.includes('ur') || v.lang.includes('ar'));
    if (urduVoice) utterance.voice = urduVoice;
  } else {
    const englishVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
    if (englishVoice) utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};
