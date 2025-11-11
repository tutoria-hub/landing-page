"use client";

/**
 * Flashcard Stack Demo - Landing Page Version
 * 3-card stack matching tutoria-webapp ModuleCardStack exactly
 * With integrated AudioButton and state machine
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFlashcardTextStyles } from './demo/textSizing';
import { Mic, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type PracticeState = 'idle' | 'recording' | 'checking' | 'correct' | 'incorrect';
type CardContent = { letter: string; outcome: 'correct' | 'incorrect' };
type CardInstance = CardContent & { id: string };
type CardPosition = 'front' | 'middle' | 'back' | 'exiting';

/**
 * TIMING ARCHITECTURE (Apple Motion Standards)
 * - Instant: 150ms (micro-interactions)
 * - Fast: 250ms (feedback, state changes)
 * - Standard: 350ms (primary motions like card exit)
 * - Gentle: 450ms (entrances, card rise)
 * - NO idle animations (cards rest until user input)
 */
const TIMING = {
  INSTANT: 150,             // Micro-interactions (button press)
  FAST: 250,                // Feedback (state changes, border color)
  STANDARD: 350,            // Primary motions (card exit)
  GENTLE: 450,              // Entrances (card rise)
  CARD_EXIT: 350,           // Fast and decisive exit
  CARD_RISE: 450,           // Gentle rise with spring
  STATE_TRANSITION: 250,    // Border color, state feedback
  BUTTON_PRESS: 100,        // iOS standard press (ms)
  PHONEME_TRANSITION: 30,   // Waveform update rate (ms)
} as const;

const EASING = {
  OUT: [0, 0, 0.58, 1] as const,              // Appearing, expanding (fast start, soft land)
  IN: [0.42, 0, 1, 1] as const,               // Dismissing, collapsing (soft start, decisive exit)
  STANDARD: [0.42, 0, 0.58, 1] as const,      // Fallback for non-critical animations
} as const;

// Card progression: r (correct) → sh (incorrect) → cat (correct) → loop
const CARD_SEQUENCE: CardContent[] = [
  { letter: 'r', outcome: 'correct' },
  { letter: 'sh', outcome: 'incorrect' },
  { letter: 'cat', outcome: 'correct' },
];

// Physical card instances (stable IDs for tracking through positions)
const INITIAL_CARDS: Record<CardPosition, CardInstance | null> = {
  front: { ...CARD_SEQUENCE[0], id: 'card-a' },
  middle: { ...CARD_SEQUENCE[1], id: 'card-b' },
  back: { ...CARD_SEQUENCE[2], id: 'card-c' },
  exiting: null,
};

/**
 * LoadingDots - Exact webapp component
 */
const LoadingDots = ({ variant = 'default' }: { variant?: 'default' | 'preparing' }) => {
  const colorClass = variant === 'preparing' ? 'bg-gray-400' : 'bg-[#4F46E5]';

  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-1">
        <div className={`w-2 h-2 ${colorClass} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
        <div className={`w-2 h-2 ${colorClass} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
        <div className={`w-2 h-2 ${colorClass} rounded-full animate-bounce`}></div>
      </div>
    </div>
  );
};

/**
 * AudioButton - Integrated webapp version with smooth waveform
 */
interface AudioButtonProps {
  state: PracticeState;
}

function AudioButton({ state }: AudioButtonProps) {
  const [preparationPhase, setPreparationPhase] = useState<'idle' | 'preparing' | 'burst' | 'active'>('idle');
  const [showAutoRetryText, setShowAutoRetryText] = useState(false);
  const [isRetryTextFadingOut, setIsRetryTextFadingOut] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [prevState, setPrevState] = useState<PracticeState>('idle');

  const isRecording = state === 'recording';
  const isLoading = state === 'checking';
  const isIdle = state === 'idle';
  const isIncorrect = state === 'incorrect';
  const showSuccess = state === 'correct';

  // Button press on click (idle → recording transition)
  useEffect(() => {
    if (state === 'recording' && prevState === 'idle') {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), TIMING.BUTTON_PRESS);
    }
    setPrevState(state);
  }, [state, prevState]);

  // Fixed 700ms recording preparation choreography
  useEffect(() => {
    if (isRecording && !isLoading) {
      setPreparationPhase('preparing');

      const burstTimer = setTimeout(() => {
        setPreparationPhase('burst');
      }, 650);

      const activeTimer = setTimeout(() => {
        setPreparationPhase('active');
      }, 700);

      return () => {
        clearTimeout(burstTimer);
        clearTimeout(activeTimer);
      };
    } else {
      setPreparationPhase('idle');
    }
  }, [isRecording, isLoading]);

  // Auto-retry flow (faster timing for demo)
  useEffect(() => {
    if (isIncorrect && !showAutoRetryText) {
      setShowAutoRetryText(true);
      setIsRetryTextFadingOut(false);

      const fadeOutTimer = setTimeout(() => {
        setIsRetryTextFadingOut(true);
      }, 1500);

      const resetTimer = setTimeout(() => {
        setShowAutoRetryText(false);
        setIsRetryTextFadingOut(false);
      }, 1800); // 1500 + 300ms for complete fade

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(resetTimer);
      };
    } else if (!isIncorrect) {
      setShowAutoRetryText(false);
      setIsRetryTextFadingOut(false);
    }
  }, [isIncorrect, showAutoRetryText]);

  // Realistic speech waveform with phoneme simulation
  const [animationFrame, setAnimationFrame] = useState(0);
  const [waveformStartTime] = useState(Date.now());

  // Speech-realistic phoneme sequences (5 types for natural variation)
  const phonemeSequences = useMemo(() => [
    ['silence', 'plosive', 'vowel_open', 'fricative', 'silence', 'vowel_close'],
    ['vowel_open', 'fricative', 'silence', 'vowel_close', 'plosive'],
    ['plosive', 'vowel_close', 'vowel_open', 'silence', 'fricative'],
    ['vowel_close', 'silence', 'fricative', 'vowel_open', 'plosive'],
  ], []);

  // Speech-realistic phoneme characteristics with formant ratios (F1-F4)
  const phonemeData = useMemo(() => ({
    // Plosive consonants (p, t, k) - sharp burst
    plosive: {
      duration: 60,
      minAmp: 0.75,
      maxAmp: 0.95,
      formantRatios: [0.9, 1.0, 0.7, 0.5] // F2 strongest for burst
    },
    // Fricative consonants (s, sh, f) - sustained noise
    fricative: {
      duration: 120,
      minAmp: 0.6,
      maxAmp: 0.8,
      formantRatios: [0.5, 0.7, 1.0, 0.9] // High frequencies (F3-F4) strongest
    },
    // Open vowels (a, o) - low F1, strong formants
    vowel_open: {
      duration: 180,
      minAmp: 0.6,
      maxAmp: 0.85,
      formantRatios: [1.0, 0.8, 0.5, 0.3] // F1 dominant
    },
    // Close vowels (i, u) - F2 dominant
    vowel_close: {
      duration: 200,
      minAmp: 0.5,
      maxAmp: 0.75,
      formantRatios: [0.7, 1.0, 0.6, 0.4] // F2 strongest
    },
    silence: {
      duration: 100,
      minAmp: 0.05,
      maxAmp: 0.15,
      formantRatios: [1.0, 1.0, 1.0, 1.0] // All equal (noise floor)
    },
  }), []);

  // Optimized waveform animation (30ms phoneme transitions, not 60fps RAF)
  useEffect(() => {
    if (preparationPhase !== 'active') return;

    const interval = setInterval(() => {
      setAnimationFrame(Date.now());
    }, TIMING.PHONEME_TRANSITION); // 30ms = smooth phoneme changes without excessive re-renders

    return () => clearInterval(interval);
  }, [preparationPhase]);

  const bars = useMemo(() => {
    const speechIsActive = preparationPhase === 'active';
    const currentTime = animationFrame;
    const minHeight = 4;
    const maxHeight = 24;

    return [0, 1, 2, 3].map((barIndex) => {
      if (!speechIsActive) {
        return { height: minHeight, isActive: false };
      }

      // Calculate total sequence duration for this bar
      const sequence = phonemeSequences[barIndex];
      let totalDuration = 0;
      for (const phoneme of sequence) {
        totalDuration += phonemeData[phoneme as keyof typeof phonemeData].duration;
      }

      // Loop elapsed time within sequence duration
      const elapsedMs = (currentTime - waveformStartTime) % totalDuration;

      // Find current phoneme with smooth crossfading (Apple Voice Memos: crisp 30ms transitions)
      const CROSSFADE_MS = 30; // Shorter = crisper phoneme changes, less perceived lag
      let accumulatedTime = 0;
      let currentPhoneme = sequence[0];
      let nextPhoneme = sequence[1] || sequence[0];
      let crossfadeAmount = 0;

      for (let i = 0; i < sequence.length; i++) {
        const phoneme = sequence[i];
        const duration = phonemeData[phoneme as keyof typeof phonemeData].duration;

        if (elapsedMs < accumulatedTime + duration) {
          currentPhoneme = phoneme;
          nextPhoneme = sequence[i + 1] || sequence[0]; // Loop back

          // Calculate crossfade near end of current phoneme
          const timeUntilEnd = accumulatedTime + duration - elapsedMs;
          if (timeUntilEnd < CROSSFADE_MS) {
            crossfadeAmount = 1 - (timeUntilEnd / CROSSFADE_MS);
          }
          break;
        }

        accumulatedTime += duration;
      }

      // Blend amplitudes for smooth transitions with formant correlation
      const currentPhonemeInfo = phonemeData[currentPhoneme as keyof typeof phonemeData];
      const nextPhonemeInfo = phonemeData[nextPhoneme as keyof typeof phonemeData];

      // Get formant ratio for this bar (F1-F4 spatial correlation)
      const formantRatio = currentPhonemeInfo.formantRatios?.[barIndex] ?? 1.0;
      const nextFormantRatio = nextPhonemeInfo.formantRatios?.[barIndex] ?? 1.0;
      const blendedFormantRatio = formantRatio * (1 - crossfadeAmount) + nextFormantRatio * crossfadeAmount;

      // Base amplitude with formant structure
      const baseMinAmp = currentPhonemeInfo.minAmp * (1 - crossfadeAmount) +
                         nextPhonemeInfo.minAmp * crossfadeAmount;
      const baseMaxAmp = currentPhonemeInfo.maxAmp * (1 - crossfadeAmount) +
                         nextPhonemeInfo.maxAmp * crossfadeAmount;

      // Apply formant ratio (bars correlate like real speech formants)
      const minAmp = baseMinAmp * blendedFormantRatio;
      const maxAmp = baseMaxAmp * blendedFormantRatio;

      // Simple sine variation for smooth, organic motion (maximum performance)
      const phaseOffset = barIndex * 1.8;
      const variation = Math.sin(currentTime * 0.01 + phaseOffset) * 0.12;
      let amplitude = (minAmp + maxAmp) / 2 + variation;

      // Clamp amplitude
      amplitude = Math.max(minAmp, Math.min(maxAmp, amplitude));

      const barHeight = minHeight + (amplitude * maxHeight);

      return {
        height: Math.max(minHeight, Math.min(minHeight + maxHeight, barHeight)),
        isActive: speechIsActive
      };
    });
  }, [preparationPhase, animationFrame, waveformStartTime, phonemeSequences, phonemeData]);

  return (
    <div className="group flex flex-col items-center relative min-h-[64px]">
      <div className="relative bg-white rounded-xl shadow-[0_4px_0_#DCDCDC]">
        <button
          disabled={true}
          className={cn(
            "relative inline-flex items-center justify-center bg-white rounded-xl px-8 py-4",
            "transition-all ease-[cubic-bezier(0,0,0.58,1)]",
            isPulsing ? "duration-100" : "duration-[250ms]",
            "border-4",
            // Fast border color transition (Apple standard: ease-out)
            isRecording ? "border-[#30A46C] transition-colors duration-150" : "border-[#D4D4D4]",
            "hover:scale-[1.02] active:scale-[0.98]",
            // Simplified 2-layer click feedback (200ms, no overshoot)
            isPulsing && "animate-button-press animate-shadow-press"
          )}
        >
          <div className="relative w-10 h-5">
            {/* Loading dots */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]",
                !isLoading && "opacity-0 scale-95"
              )}
            >
              <LoadingDots />
            </div>

            {/* Success checkmark */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]",
                !showSuccess && "opacity-0 scale-95"
              )}
            >
              <Check className="h-6 w-6 text-[#30A46C] stroke-[2.5]" />
            </div>

            {/* Microphone icon */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]",
                (!isIdle || showAutoRetryText || showSuccess) ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <Mic className="h-5 w-5 text-[#30A46C]" />
            </div>

            {/* Preparing dots */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]",
                preparationPhase !== 'preparing' && "opacity-0 scale-95"
              )}
            >
              <LoadingDots variant="preparing" />
            </div>

            {/* Waveform bars - properly spaced */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-between gap-[2px]",
                (preparationPhase !== 'burst' && preparationPhase !== 'active') && "opacity-0 scale-95",
                "transition-all duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]"
              )}
              data-phase={preparationPhase}
            >
              {bars.map((bar, barIndex) => (
                <div
                  key={barIndex}
                  className="recording-bar"
                  style={{
                    '--bar-height': `${bar.height}px`
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Auto-retry "try again" text */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]",
                (!showAutoRetryText || isRetryTextFadingOut) ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <span className={cn(
                "text-[#3B82F6] text-sm font-semibold whitespace-nowrap transition-all duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]",
                (!showAutoRetryText || isRetryTextFadingOut) ? "opacity-0 scale-95" : "opacity-100 scale-110"
              )}>
                try again
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Context text below button */}
      <div className="h-6 flex items-center justify-center mt-2">
        {isLoading && (
          <p className="text-sm text-[#595959] animate-fade-in">checking...</p>
        )}
      </div>
    </div>
  );
}

/**
 * Individual Flashcard Component
 */
interface CardProps {
  letter: string;
  state: PracticeState;
  isActive?: boolean;
}

function Card({ letter, state, isActive = false }: CardProps) {
  const letterStyles = getFlashcardTextStyles(letter);
  const isRetry = state === 'incorrect';
  const isSuccess = state === 'correct';

  // Determine border color based on state (webapp pattern)
  let borderColor = 'border-[#D4D4D4]'; // Default inactive gray
  if (isActive) {
    if (isRetry) {
      borderColor = 'border-[#3B82F6]'; // Retry blue
    } else if (state === 'recording' || state === 'checking' || isSuccess) {
      borderColor = 'border-[#30A46C]'; // Active green
    }
  }

  return (
    <div
      className={cn(
        "w-full h-full",
        "border-2 bg-white rounded-xl",
        "flex flex-col items-center justify-center",
        "p-6 lg:p-8",
        "transition-[transform,opacity,border-color] duration-[250ms] ease-[cubic-bezier(0,0,0.58,1)]",
        borderColor
      )}
      style={{
        transformOrigin: 'bottom center'
      }}
    >
      {/* CONTENT AREA - Letter Display */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          <div className="flex items-center justify-center min-h-[80px]">
            <span style={letterStyles} className="text-[#1A1A1A]">
              {letter}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION AREA - AudioButton (only on active card) */}
      {isActive && (
        <div className="flex-shrink-0 h-[140px] flex flex-col items-center justify-center">
          <AudioButton state={state} />
        </div>
      )}
    </div>
  );
}

/**
 * Main Stack Component
 */
export default function FlashcardStack() {
  const [cardPositions, setCardPositions] = useState<Record<CardPosition, CardInstance | null>>(INITIAL_CARDS);
  const [activeCardState, setActiveCardState] = useState<PracticeState>('idle');
  const [sequenceIndex, setSequenceIndex] = useState(3); // Start at 3 since we're showing cards 0,1,2 initially
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Automatic state machine for demo
  useEffect(() => {
    const currentCard = cardPositions.front;
    if (!currentCard) return;

    const targetOutcome = currentCard.outcome === 'correct' ? 'correct' : 'incorrect';

    const stateMachine = [
      { state: 'idle' as PracticeState, duration: 2000 },      // Just enough to register letter
      { state: 'recording' as PracticeState, duration: 2000 }, // Realistic speech capture
      { state: 'checking' as PracticeState, duration: 1500 },  // AI processing feedback
      { state: targetOutcome as PracticeState, duration: 2500 }, // Savor success, not linger
    ];

    let currentStep = 0;
    let timeoutId: NodeJS.Timeout;

    const advance = () => {
      if (currentStep < stateMachine.length) {
        const { state, duration } = stateMachine[currentStep];
        setActiveCardState(state);
        currentStep++;
        timeoutId = setTimeout(advance, duration);
      } else {
        // Step 1: Trigger exit by removing front card (AnimatePresence will handle exit animation)
        const exitingCard = cardPositions.front!;
        const nextContent = CARD_SEQUENCE[sequenceIndex % CARD_SEQUENCE.length];
        const nextSequenceIndex = sequenceIndex + 1;

        // Remove front card to trigger exit animation
        setCardPositions(prev => ({
          ...prev,
          front: null,  // This triggers AnimatePresence exit for the front card
        }));

        // Step 2: After exit completes, rotate all positions
        setTimeout(() => {
          setCardPositions({
            front: cardPositions.middle,    // Middle card rises to front
            middle: cardPositions.back,     // Back card rises to middle
            back: { ...nextContent, id: exitingCard.id }, // Exited card recycled to back
            exiting: null,
          });
          setActiveCardState('idle');
          setSequenceIndex(nextSequenceIndex);
        }, TIMING.CARD_EXIT);
      }
    };

    advance();

    return () => clearTimeout(timeoutId);
  }, [cardPositions, sequenceIndex]);

  return (
    <div className="relative w-full max-w-[320px] lg:max-w-[380px]">
      {/* Card Stack Container - 4:5 aspect ratio */}
      <div className="relative w-full aspect-[4/5]">

        {/* Back card (position 2) */}
        {cardPositions.back && (
          <motion.div
            key={cardPositions.back.id}
            className="absolute inset-0"
            initial={{
              // New card enters from below/behind where the exited card ended
              scale: 0.94,
              y: 28,
              opacity: 0.8,
              rotate: 0,
              x: 0,
            }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.5, zIndex: 1 }
                : {
                    // Rise to back position with satisfying pop
                    scale: 0.96,
                    y: 24,
                    opacity: 1.0,
                    rotate: 0,
                    x: 0,
                    zIndex: 1
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              mass: 0.8,
            }}
            style={{
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            <Card letter={cardPositions.back.letter} state="idle" isActive={false} />
          </motion.div>
        )}

        {/* Middle card (position 1) */}
        {cardPositions.middle && (
          <motion.div
            key={cardPositions.middle.id}
            className="absolute inset-0"
            initial={{
              // Start from back position
              scale: 0.96,
              y: 24,
              opacity: 1.0,
              rotate: 0,
            }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.7, zIndex: 2 }
                : {
                    // Rise to middle position
                    scale: 0.95,
                    y: 16,
                    opacity: 1.0,
                    rotate: 1,
                    zIndex: 2,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              mass: 0.8,
            }}
            style={{
              pointerEvents: 'none',
              transformOrigin: 'bottom center',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            <Card letter={cardPositions.middle.letter} state="idle" isActive={false} />
          </motion.div>
        )}

        {/* Front card (position 0) - active card with state machine */}
        <AnimatePresence>
          {cardPositions.front && (
            <motion.div
              key={cardPositions.front.id}
              className="absolute inset-0"
              initial={{
                // Start from middle position for satisfying rise
                scale: 0.95,
                y: 16,
                opacity: 1,
                x: 0,
                rotate: 1,
              }}
              animate={{
                // ALL STATES: Card is static and grounded
                // Motion is response to input, not ambient decoration
                scale: 1.0,
                y: 0,
                opacity: 1,
                x: 0,
                rotate: 0,
                zIndex: 4
              }}
              transition={{
                duration: TIMING.STATE_TRANSITION / 1000,
                ease: EASING.OUT
              }}
              exit={
                prefersReducedMotion
                  ? {
                      opacity: 0,
                      transition: { duration: 0.15 }
                    }
                  : {
                      // Single decisive arc - flick card off table
                      x: 400,              // Exit right (off screen)
                      rotate: 12,          // Natural card-flick rotation
                      scale: 0.95,         // Slight shrink (perspective)
                      opacity: 0.6,        // Fade slightly (not to 0 - feels abrupt)
                      transition: {
                        duration: TIMING.CARD_EXIT / 1000,
                        ease: EASING.IN,   // Soft start, decisive exit
                      }
                    }
              }
              style={{
                boxShadow: '0 4px 12px rgba(31, 31, 31, 0.08)',
                transformOrigin: 'bottom center',
                zIndex: 4,
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            >
              <Card
                letter={cardPositions.front.letter}
                state={activeCardState}
                isActive={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Label */}
      <p className="font-sans text-[14px] font-semibold text-center text-[#595959] mt-4 uppercase tracking-[0.05em]">
        Interactive Practice
      </p>
    </div>
  );
}
