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

  // Button pulse on click (idle → recording transition)
  useEffect(() => {
    if (state === 'recording' && prevState === 'idle') {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 300);
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

  // Auto-retry flow (adjusted for 400ms transitions)
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
      }, 1900); // 1500 + 400ms for complete fade

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

  // Phoneme sequences for each bar (independent timing)
  const phonemeSequences = useMemo(() => [
    ['silence', 'consonant', 'vowel', 'consonant', 'silence', 'vowel', 'consonant'],
    ['vowel', 'consonant', 'silence', 'vowel', 'consonant', 'vowel', 'silence'],
    ['consonant', 'vowel', 'vowel', 'silence', 'consonant', 'vowel', 'consonant'],
    ['vowel', 'silence', 'consonant', 'vowel', 'consonant', 'silence', 'vowel'],
  ], []);

  // Phoneme characteristics
  const phonemeData = useMemo(() => ({
    consonant: { duration: 120, minAmp: 0.7, maxAmp: 0.9 },
    vowel: { duration: 400, minAmp: 0.4, maxAmp: 0.6 },
    silence: { duration: 250, minAmp: 0.05, maxAmp: 0.15 },
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

      // Blend amplitudes for smooth transitions
      const currentPhonemeInfo = phonemeData[currentPhoneme as keyof typeof phonemeData];
      const nextPhonemeInfo = phonemeData[nextPhoneme as keyof typeof phonemeData];

      const minAmp = currentPhonemeInfo.minAmp * (1 - crossfadeAmount) +
                     nextPhonemeInfo.minAmp * crossfadeAmount;
      const maxAmp = currentPhonemeInfo.maxAmp * (1 - crossfadeAmount) +
                     nextPhonemeInfo.maxAmp * crossfadeAmount;

      // Add natural variation with sine wave (per-bar phase offset for organic asynchrony)
      const phaseOffset = barIndex * 1.8; // Stagger bars so they don't peak in sync
      const variation = Math.sin(currentTime * 0.01 + phaseOffset) * 0.12; // Faster oscillation = more alive
      let amplitude = (minAmp + maxAmp) / 2 + variation;

      // Add attack/decay for consonants (sharper edges like real speech)
      if (currentPhoneme === 'consonant') {
        if (phonemeProgress < 0.2) {
          // Attack - quick rise
          amplitude *= (phonemeProgress / 0.2);
        } else if (phonemeProgress > 0.7) {
          // Decay - quick fall
          amplitude *= (1 - (phonemeProgress - 0.7) / 0.3);
        }
      }

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
            "transition-all ease-out",
            isPulsing ? "duration-300" : "duration-400",
            "border-4",
            // Instant border feedback (Apple standard: <16ms response)
            isRecording ? "border-[#30A46C] !transition-none" : "border-[#D4D4D4]",
            "hover:scale-[1.02] active:scale-[0.98]",
            // Layered click animations
            isPulsing && "animate-button-pulse animate-shadow-press"
          )}
        >
          {/* Ripple ring effect (shows action propagation) */}
          {isPulsing && (
            <div className="absolute inset-0 rounded-xl border-4 border-[#30A46C] animate-ripple pointer-events-none" />
          )}

          <div className="relative w-10 h-5">
            {/* Loading dots */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-400 ease-out",
                !isLoading && "opacity-0 scale-95"
              )}
            >
              <LoadingDots />
            </div>

            {/* Success checkmark */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-400 ease-out",
                !showSuccess && "opacity-0 scale-95"
              )}
            >
              <Check className="h-6 w-6 text-[#30A46C] stroke-[2.5]" />
            </div>

            {/* Microphone icon */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-400 ease-out",
                (!isIdle || showAutoRetryText || showSuccess) ? "opacity-0 scale-95" : "opacity-100 scale-100",
                // Icon micro-bounce (layered secondary motion)
                isPulsing && "animate-icon-bounce"
              )}
            >
              <Mic className="h-5 w-5 text-[#30A46C]" />
            </div>

            {/* Preparing dots */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-400 ease-out",
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
                "transition-all duration-400"
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
                "absolute inset-0 flex items-center justify-center transition-all duration-400 ease-out",
                (!showAutoRetryText || isRetryTextFadingOut) ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <span className={cn(
                "text-[#3B82F6] text-sm font-semibold whitespace-nowrap transition-all duration-400 ease-out",
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
        "transition-all duration-400",
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
  const [exitingCardZIndex, setExitingCardZIndex] = useState(3); // Dynamic z-index for card shuffle
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
      { state: 'idle' as PracticeState, duration: 3000 },
      { state: 'recording' as PracticeState, duration: 2500 },
      { state: 'checking' as PracticeState, duration: 2000 },
      { state: targetOutcome as PracticeState, duration: 3000 },
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
        // Trigger Apple card shuffle exit animation
        setIsExiting(true);

        // Drop z-index after dismissal signal phase (200ms)
        setTimeout(() => {
          setExitingCardZIndex(0);
        }, 200);

        // Complete cycle after full animation (800ms)
        setTimeout(() => {
          setCards(prev => [...prev.slice(1), prev[0]]);
          setIsExiting(false);
          setExitingCardZIndex(3); // Reset for next card
          setActiveCardState('idle');
        }, 800);
      }
    };

    advance();

    return () => clearTimeout(timeoutId);
  }, [cards]);

  return (
    <div className="relative w-full max-w-[320px] lg:max-w-[380px]">
      {/* Card Stack Container - 4:5 aspect ratio */}
      <div className="relative w-full aspect-[4/5]">

        {/* Card 3 (back) - Position 2 */}
        <motion.div
          key={`card-3-${cards[2]?.letter}`}
          className="absolute inset-0"
          initial={false}
          animate={
            prefersReducedMotion
              ? { opacity: 0.5, zIndex: 1 }
              : {
                  scale: 0.96,
                  y: 24,
                  rotate: 0,
                  opacity: 1,
                  zIndex: 1
                }
          }
          transition={{
            duration: 0.2,
            ease: [0, 0, 0.2, 1] // cubic-bezier(0, 0, 0.2, 1)
          }}
          style={{ pointerEvents: 'none' }}
        >
          <Card letter={cards[2]?.letter || 'cat'} state="idle" isActive={false} />
        </motion.div>

        {/* Card 2 (middle) - Position 1 → Position 0 when exiting */}
        <motion.div
          key={`card-2-${cards[1]?.letter}`}
          className="absolute inset-0"
          initial={false}
          animate={
            prefersReducedMotion
              ? { opacity: 0.7, zIndex: 2 }
              : {
                  scale: isExiting ? 1.0 : 0.95,
                  y: isExiting ? 0 : 16,
                  rotate: isExiting ? 0 : 1,
                  opacity: 1,
                  zIndex: isExiting ? 3 : 2,
                }
          }
          transition={{
            duration: 0.35,
            delay: isExiting ? 0.08 : 0, // Delay rise until anticipation completes (80ms)
            ease: [0.34, 1.56, 0.64, 1], // Spring physics with slight overshoot
          }}
          style={{
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
            boxShadow: isExiting
              ? '0 4px 12px rgba(31, 31, 31, 0.08)'
              : 'none'
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
                activeCardState === 'recording'
                  ? {
                      scale: [1.0, 1.02, 1.0],
                      y: 0,
                      opacity: 1,
                      x: 0,
                      rotate: 0,
                      zIndex: 3,
                      transition: {
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        default: { duration: 0.4 }
                      }
                    }
                  : {
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
                      // Apple Card Physics: Anticipation → Momentum swipe → Gentle settle
                      // Each property has independent timing for natural physics
                      x: [0, -8, 0, 45, 280],        // Anticipation pullback → momentum swipe
                      y: [0, 0, 0, 12, 72],          // Slight arc trajectory
                      rotate: [0, -0.5, 0, 2.5, 12], // Counter-rotate → natural tilt
                      scale: [1, 1.01, 1, 0.96, 0.82], // Subtle lift → compress
                      opacity: [1, 1, 1, 0.92, 0],   // Hold visibility → quick fade
                      transition: {
                        duration: 0.42,  // Apple Card standard: 420ms
                        times: [0, 0.14, 0.19, 0.67, 1], // [0ms, 60ms, 80ms, 280ms, 420ms]
                        // Layered easing curves per property for realistic physics
                        x: {
                          duration: 0.42,
                          times: [0, 0.14, 0.19, 0.67, 1],
                          ease: [0.34, 1.56, 0.64, 1] // Spring overshoot on exit
                        },
                        y: {
                          duration: 0.42,
                          times: [0, 0.14, 0.19, 0.67, 1],
                          ease: [0.22, 0.61, 0.36, 1] // Gentle arc
                        },
                        rotate: {
                          duration: 0.42,
                          times: [0, 0.14, 0.19, 0.67, 1],
                          ease: [0.17, 0.89, 0.32, 1.28] // Snappier rotation with overshoot
                        },
                        scale: {
                          duration: 0.42,
                          times: [0, 0.14, 0.19, 0.67, 1],
                          ease: [0.4, 0, 0.2, 1] // iOS standard for scale
                        },
                        opacity: {
                          duration: 0.42,
                          times: [0, 0.14, 0.19, 0.67, 1],
                          ease: [0.4, 0, 1, 1] // Hold → quick linear fade
                        }
                      }
                    }
              }
              transition={{
                duration: 0.2,
                ease: [0, 0, 0.2, 1]
              }}
              style={{
                boxShadow: '0 4px 12px rgba(31, 31, 31, 0.08)', // Webapp shadow on active card only
                transformOrigin: 'bottom center',
                zIndex: exitingCardZIndex, // Dynamic z-index for card shuffle
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
