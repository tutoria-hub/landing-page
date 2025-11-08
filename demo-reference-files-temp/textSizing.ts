/**
 * Text Sizing Utilities for Flashcard Demo
 * Extracted from tutoria-webapp/src/utils/adaptiveText.ts
 *
 * Uses responsive CSS clamp() for proper mobile support
 */

import type { CSSProperties } from 'react';

/**
 * Get optimal font size based on text length
 * Uses CSS clamp() for responsive scaling with viewport constraints
 * Format: clamp(min, preferred, max) ensures text never overflows viewport
 *
 * Source: tutoria-webapp/src/utils/adaptiveText.ts (lines 106-119)
 */
export function getOptimalFontSize(text: string = ''): string {
  const length = text.replace(/[^a-zA-Z0-9]/g, '').length; // Count only letters/numbers

  if (length <= 4) return 'clamp(5rem, 10vw, 7rem)';    // Short words: 80-112px range
  if (length <= 6) return 'clamp(2.5rem, 8vw, 4rem)';   // Medium: 40-64px range
  if (length <= 9) return 'clamp(1.75rem, 5vw, 3rem)';  // Longer: 28-48px range
  if (length <= 12) return 'clamp(1.5rem, 4vw, 2.5rem)'; // Long: 24-40px range
  if (length <= 16) return 'clamp(1.25rem, 3.5vw, 2rem)'; // Very long: 20-32px range
  if (length <= 20) return 'clamp(1rem, 3vw, 1.75rem)';  // Extra long: 16-28px range
  return 'clamp(0.875rem, 2.5vw, 1.5rem)';               // Extremely long: 14-24px range
}

/**
 * Get text styles for flashcard letter display
 * Returns inline styles for optimal dyslexic readability
 */
export function getFlashcardTextStyles(text: string): CSSProperties {
  return {
    fontSize: getOptimalFontSize(text),
    fontWeight: 400,
    lineHeight: 1.2,
    fontFamily: 'OpenDyslexic, sans-serif',
    whiteSpace: 'nowrap',
    display: 'inline-block'
  };
}
