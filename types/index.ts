export interface WordEntry {
  word: string;
  meaning: string;
  example_en: string;
  example_ur: string;
}

export interface SearchResult extends WordEntry {
  isAiGenerated?: boolean;
}
