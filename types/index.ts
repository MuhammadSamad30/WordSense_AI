export interface WordEntry {
  word: string;
  meaning: string;
  example_en: string;
  example_ur: string;
  phonetic?: string;
  partOfSpeech?: string;
  definition?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface SearchResult extends WordEntry {
  isAiGenerated?: boolean;
}
