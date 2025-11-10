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

/**
 * TIMING ARCHITECTURE (Apple Card Standard)
 * - State transitions: 420ms [0.42,0,0.58,1]
 * - Idle breathing: 3.6s sine-wave [0.37,0,0.63,1]
 * - Button press: 100ms (iOS standard)
 * - Exit/rise: 420ms with 210ms delay (50% overlap)
 * - Waveform: 60fps requestAnimationFrame (no easing)
 */
const TIMING = {
  CARD_EXIT: 420,           // Apple Card standard (ms)
  STATE_TRANSITION: 420,    // All state changes (ms)
  BUTTON_PRESS: 100,        // iOS standard press (ms)
  BUTTON_HOVER: 420,        // Match state transitions (ms)
  IDLE_BREATHING: 3600,     // Calm 3.6s cycle (ms)
  CHECKING_PULSE: 1200,     // Thinking indicator (ms)
  RISE_DELAY: 0.21,         // 50% of exit in seconds (210ms)
} as const;

const EASING = {
  STANDARD: [0.42, 0, 0.58, 1] as const,      // iOS default (all transitions)
  BREATHING: [0.37, 0, 0.63, 1] as const,     // Sine-wave (looping only)
} as const;

// Card progression: r (correct) → sh (incorrect) → cat (correct) → loop
const CARD_SEQUENCE: CardContent[] = [
  { letter: 'r', outcome: 'correct' },
  { letter: 'sh', outcome: 'incorrect' },
  { letter: 'cat', outcome: 'correct' },
];

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

  // Auto-retry flow (iOS standard timing)
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
      }, 1920); // 1500 + 420ms for complete fade

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

  // Continuous animation for active waveform (60fps with requestAnimationFrame)
  useEffect(() => {
    if (preparationPhase !== 'active') return;

    let rafId: number;
    const animate = () => {
      setAnimationFrame(Date.now());
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [preparationPhase]);

  const bars = useMemo(() => {
    const speechIsActive = preparationPhase === 'active';
    const currentTime = Date.now();
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
      let phonemeProgress = 0;
      let crossfadeAmount = 0;

      for (let i = 0; i < sequence.length; i++) {
        const phoneme = sequence[i];
        const duration = phonemeData[phoneme as keyof typeof phonemeData].duration;

        if (elapsedMs < accumulatedTime + duration) {
          currentPhoneme = phoneme;
          nextPhoneme = sequence[i + 1] || sequence[0]; // Loop back
          phonemeProgress = (elapsedMs - accumulatedTime) / duration;

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
            "transition-all ease-[cubic-bezier(0.42,0,0.58,1)]",
            isPulsing ? "duration-100" : "duration-[420ms]",
            "border-4",
            // Smooth border color transition (Apple standard)
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
                "absolute inset-0 flex items-center justify-center transition-all duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]",
                !isLoading && "opacity-0 scale-95"
              )}
            >
              <LoadingDots />
            </div>

            {/* Success checkmark */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]",
                !showSuccess && "opacity-0 scale-95"
              )}
            >
              <Check className="h-6 w-6 text-[#30A46C] stroke-[2.5]" />
            </div>

            {/* Microphone icon */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]",
                (!isIdle || showAutoRetryText || showSuccess) ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <Mic className="h-5 w-5 text-[#30A46C]" />
            </div>

            {/* Preparing dots */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]",
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
                "transition-all duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]"
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
                "absolute inset-0 flex items-center justify-center transition-all duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]",
                (!showAutoRetryText || isRetryTextFadingOut) ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <span className={cn(
                "text-[#3B82F6] text-sm font-semibold whitespace-nowrap transition-all duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]",
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
        "transition-[transform,opacity,border-color] duration-[420ms] ease-[cubic-bezier(0.42,0,0.58,1)]",
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
  const [cards, setCards] = useState<CardContent[]>([...CARD_SEQUENCE]);
  const [activeCardState, setActiveCardState] = useState<PracticeState>('idle');
  const [isExiting, setIsExiting] = useState(false);
  const [exitingCardZIndex, setExitingCardZIndex] = useState(4); // Exiting card stays above rising card (prevents flicker)
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
    const currentCard = cards[0];
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
        // Trigger upward celebration exit animation
        setIsExiting(true);

        // Keep card on top during exit (no z-index drop - looks better for upward motion)
        // The next card rise animation handles the transition naturally

        // Complete cycle after full animation (Apple Card standard)
        setTimeout(() => {
          setCards(prev => [...prev.slice(1), prev[0]]);
          setIsExiting(false);
          setExitingCardZIndex(4); // Reset for next card
          setActiveCardState('idle');
        }, TIMING.CARD_EXIT);
      }
    };

    advance();

    return () => clearTimeout(timeoutId);
  }, [cards]);

  return (
    <div className="relative w-full max-w-[320px] lg:max-w-[380px]">
      {/* Card Stack Container - 4:5 aspect ratio */}
      <div className="relative w-full aspect-[4/5]">

        {/* Card 3 (back) - Position 2 with gentle breathing */}
        <motion.div
          key={`card-3-${cards[2]?.letter}`}
          className="absolute inset-0"
          initial={false}
          animate={
            prefersReducedMotion
              ? { opacity: 0.5, zIndex: 1 }
              : {
                  // Back card breathing (minimal depth)
                  scale: [0.96, 0.965, 0.96],     // 0.5% breathing
                  y: [24, 23.5, 24],              // 0.5px motion (very subtle)
                  opacity: [1.0, 0.94, 1.0],      // 6% fade
                  rotate: 0,
                  zIndex: 1
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.3, ease: EASING.STANDARD }
              : {
                  duration: TIMING.IDLE_BREATHING / 1000,
                  ease: EASING.BREATHING,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 2.4,                     // 240° phase offset (3.6s timing)
                }
          }
          style={{
            pointerEvents: 'none',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          <Card letter={cards[2]?.letter || 'cat'} state="idle" isActive={false} />
        </motion.div>

        {/* Card 2 (middle) - Position 1 → Position 0 when exiting, with breathing */}
        <motion.div
          key={`card-2-${cards[1]?.letter}`}
          className="absolute inset-0"
          initial={false}
          animate={
            prefersReducedMotion
              ? { opacity: 0.7, zIndex: 2 }
              : isExiting
              ? {
                  // Rising to front during exit
                  scale: 1.0,
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  zIndex: 3,
                }
              : {
                  // Middle card breathing (minimal, keeps depth)
                  scale: [0.95, 0.955, 0.95],     // 0.5% breathing (subtle)
                  y: [16, 15, 16],                // 1px counter-motion (minimal parallax)
                  opacity: [1.0, 0.96, 1.0],      // 4% fade
                  rotate: 1,                       // Static rotate
                  zIndex: 2,
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.3, ease: EASING.STANDARD }
              : isExiting
              ? {
                  duration: TIMING.CARD_EXIT / 1000,
                  delay: TIMING.RISE_DELAY,
                  ease: EASING.STANDARD,
                }
              : {
                  duration: TIMING.IDLE_BREATHING / 1000,
                  ease: EASING.BREATHING,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 1.2,                     // 120° phase offset (3.6s timing)
                }
          }
          style={{
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
            boxShadow: isExiting
              ? '0 4px 12px rgba(31, 31, 31, 0.08)'
              : 'none',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          <Card letter={cards[1]?.letter || 'sh'} state="idle" isActive={false} />
        </motion.div>

        {/* Card 1 (front, active) - Position 0 */}
        <AnimatePresence mode="wait">
          {!isExiting && (
            <motion.div
              key={`card-1-${cards[0]?.letter}`}
              className="absolute inset-0"
              initial={{ scale: 1, y: 0, opacity: 1, x: 0, rotate: 0 }}
              animate={
                isExiting
                  ? false  // Cancel all animations - let exit prop take over cleanly
                  : activeCardState === 'recording'
                  ? {
                      // Recording state: breathing animation (matches idle rhythm)
                      scale: [1.0, 1.02, 1.0],
                      y: 0,
                      opacity: 1,
                      x: 0,
                      rotate: 0,
                      zIndex: 3,
                      transition: {
                        scale: {
                          duration: TIMING.IDLE_BREATHING / 1000,
                          repeat: Infinity,
                          ease: EASING.BREATHING
                        },
                        default: { duration: TIMING.STATE_TRANSITION / 1000, ease: EASING.STANDARD }
                      }
                    }
                  : activeCardState === 'checking'
                  ? {
                      // Checking state: subtle thinking pulse
                      scale: [1.0, 1.01, 1.0],        // Minimal pulse (system is thinking)
                      y: 0,
                      opacity: 1,
                      x: 0,
                      rotate: 0,
                      zIndex: 3,
                      transition: {
                        scale: {
                          duration: TIMING.CHECKING_PULSE / 1000,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        default: { duration: TIMING.STATE_TRANSITION / 1000, ease: EASING.STANDARD }
                      }
                    }
                  : activeCardState === 'idle' && !prefersReducedMotion
                  ? {
                      // Idle state: Minimal breathing (very subtle, premium feel)
                      scale: [1.0, 1.02, 1.0],        // 2% breathing (minimal but visible)
                      y: [0, -3, 0],                  // 3px float (subtle)
                      rotate: 0,                       // No rotation (too distracting)
                      x: 0,                            // No drift (keep it simple)
                      opacity: 1,
                      zIndex: 3,
                      transition: {
                        duration: TIMING.IDLE_BREATHING / 1000,
                        ease: EASING.BREATHING,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 0,
                      }
                    }
                  : {
                      // All other states: static position
                      scale: 1,
                      y: 0,
                      opacity: 1,
                      x: 0,
                      rotate: 0,
                      zIndex: 3
                    }
              }
              exit={
                prefersReducedMotion
                  ? {
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }
                  : {
                      // Apple Card exit: graceful upward celebration
                      y: -40,              // Subtle upward motion (Apple standard)
                      scale: 0.94,         // 6% compression (iOS card dismiss)
                      rotate: 2,           // Minimal dimensional hint
                      opacity: 0,          // Fade out
                      transition: {
                        duration: TIMING.CARD_EXIT / 1000,
                        ease: EASING.STANDARD,
                        type: 'tween'      // Ensures consistent frame timing
                      }
                    }
              }
              transition={{
                duration: TIMING.STATE_TRANSITION / 1000,
                ease: EASING.STANDARD
              }}
              style={{
                boxShadow: '0 4px 12px rgba(31, 31, 31, 0.08)', // Webapp shadow on active card only
                transformOrigin: 'bottom center',
                zIndex: exitingCardZIndex, // Dynamic z-index for card shuffle
                // GPU ACCELERATION (eliminates choppiness)
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            >
              <Card
                letter={cards[0]?.letter || 'r'}
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
