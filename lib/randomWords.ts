// Curated list of 100 English words for the "Random Word" generator
export const randomWordsList: string[] = [
  "Abundant", "Benevolent", "Clarity", "Diligence", "Eloquence", 
  "Fortitude", "Gratitude", "Harmony", "Innovation", "Jubilant", 
  "Kinship", "Luminous", "Melancholy", "Nostalgia", "Optimism", 
  "Perseverance", "Quintessential", "Resilience", "Serendipity", "Tranquility", 
  "Ubiquitous", "Vibrant", "Wisdom", "Xenon", "Yearning", 
  "Zeal", "Altruism", "Bravery", "Compassion", "Diversity", 
  "Empathy", "Flourish", "Generosity", "Honesty", "Integrity", 
  "Justice", "Knowledge", "Loyalty", "Mindfulness", "Noble", 
  "Patience", "Quality", "Respect", "Sincerity", "Trust", 
  "Unity", "Valor", "Wonder", "Xylophone", "Youthful", 
  "Zenith", "Adaptability", "Boldness", "Creativity", "Determination", 
  "Enthusiasm", "Flexibility", "Growth", "Humility", "Imagination", 
  "Joy", "Kindness", "Liberty", "Motivation", "Nurture", 
  "Opportunity", "Passion", "Quest", "Reflection", "Strength", 
  "Tenacity", "Understanding", "Vision", "Warmth", "Zest", 
  "Aspiration", "Belief", "Courage", "Discovery", "Endurance", 
  "Faith", "Grace", "Hope", "Insight", "Jovial", 
  "Legacy", "Miracle", "Novelty", "Peace", "Radiance", 
  "Sympathy", "Triumph", "Unique", "Vigor", "Worth", 
  "Yearn", "Zen", "Amity", "Bliss", "Candor"
];

/**
 * Returns a random word from the curated list of 100 words.
 */
export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * randomWordsList.length);
  return randomWordsList[randomIndex];
}
