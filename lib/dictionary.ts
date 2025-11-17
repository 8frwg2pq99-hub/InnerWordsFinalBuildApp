// Comprehensive English dictionary for word validation
import words from 'an-array-of-english-words';

// Convert to Set for O(1) lookup performance
const ENGLISH_WORDS = new Set(words.map((word: string) => word.toUpperCase()));

export function isValidEnglishWord(word: string): boolean {
  return ENGLISH_WORDS.has(word.toUpperCase());
}

