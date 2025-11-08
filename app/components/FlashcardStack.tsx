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

  const isRecording = state === 'recording';
  const isLoading = state === 'checking';
  const isIdle = state === 'idle';
  const isIncorrect = state === 'incorrect';
  const showSuccess = state === 'correct';

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

  // Auto-retry flow
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
      }, 2000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(resetTimer);
      };
    } else if (!isIncorrect) {
      setShowAutoRetryText(false);
      setIsRetryTextFadingOut(false);
    }
  }, [isIncorrect, showAutoRetryText]);

  // Smooth waveform bars with realistic animation
  const [animationFrame, setAnimationFrame] = useState(0);

  // Continuous animation for active waveform
  useEffect(() => {
    if (preparationPhase === 'active') {
      const interval = setInterval(() => {
        setAnimationFrame(prev => prev + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [preparationPhase]);

  const bars = useMemo(() => {
    const speechIsActive = preparationPhase === 'active';
    const time = Date.now();

    return [0, 1, 2, 3].map((barIndex) => {
      let barLevel;
      if (speechIsActive) {
        // Create smooth sine wave variation
        const variation = [0.7, 1.0, 1.0, 0.8][barIndex];
        const wave = Math.sin(time * 0.003 + barIndex * 0.5) * 0.3 + 0.7;
        barLevel = 0.8 * variation * wave;
      } else {
        barLevel = 0.02;
      }

      const amplifiedLevel = Math.min(1, barLevel * 4);
      const minHeight = 4;
      const maxHeight = 24;

      const barHeight = speechIsActive
        ? minHeight + (amplifiedLevel * maxHeight)
        : minHeight;

      return {
        height: Math.max(minHeight, Math.min(minHeight + maxHeight, barHeight)),
        isActive: speechIsActive
      };
    });
  }, [preparationPhase, animationFrame]);

  return (
    <div className="group flex flex-col items-center relative min-h-[64px]">
      <div className="relative bg-white rounded-xl shadow-[0_4px_0_#DCDCDC]">
        <button
          disabled={true}
          className={cn(
            "relative inline-flex items-center justify-center bg-white rounded-xl px-8 py-4",
            "transition-all duration-200 ease-out",
            "border-4",
            isRecording ? "border-[#30A46C]" : "border-[#D4D4D4]",
            "hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          <div className="relative w-10 h-5">
            {/* Loading dots */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <LoadingDots />
              </div>
            )}

            {/* Success checkmark */}
            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <Check className="h-6 w-6 text-[#30A46C] stroke-[2.5]" />
              </div>
            )}

            {/* Microphone icon */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
                (!isIdle || showAutoRetryText || showSuccess) ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <Mic className="h-5 w-5 text-[#30A46C]" />
            </div>

            {/* Preparing dots */}
            {preparationPhase === 'preparing' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingDots variant="preparing" />
              </div>
            )}

            {/* Waveform bars - properly spaced */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-between gap-[2px]",
                (preparationPhase !== 'burst' && preparationPhase !== 'active') && "opacity-0 scale-95",
                "transition-all duration-200"
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
            {showAutoRetryText && (
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
                isRetryTextFadingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}>
                <span className={cn(
                  "text-[#3B82F6] text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-out",
                  isRetryTextFadingOut ? "opacity-0 scale-95" : "opacity-100 scale-110 animate-pulse-once"
                )}>
                  try again
                </span>
              </div>
            )}
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
        "transition-all duration-200",
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // State machine for active card
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
        // Trigger exit animation
        setIsExiting(true);
        setTimeout(() => {
          // Cycle cards: move first to end
          setCards(prev => [...prev.slice(1), prev[0]]);
          setIsExiting(false);
          setActiveCardState('idle');
        }, 700); // Match exit animation duration
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

        {/* Card 2 (middle) - Position 1 */}
        <motion.div
          key={`card-2-${cards[1]?.letter}`}
          className="absolute inset-0"
          initial={false}
          animate={
            prefersReducedMotion
              ? { opacity: 0.7, zIndex: 2 }
              : {
                  scale: 0.95,
                  y: 16,
                  rotate: 1,
                  opacity: 1,
                  zIndex: 2
                }
          }
          transition={{
            duration: 0.2,
            ease: [0, 0, 0.2, 1]
          }}
          style={{ pointerEvents: 'none' }}
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
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
                x: 0,
                rotate: 0,
                zIndex: 3
              }}
              exit={
                prefersReducedMotion
                  ? {
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }
                  : {
                      // Hybrid: shuffle right then cycle to back
                      x: 320,
                      rotate: 15,
                      opacity: 0.3,
                      transition: {
                        duration: 0.7,
                        ease: [0, 0, 0.2, 1]
                      }
                    }
              }
              transition={{
                duration: 0.2,
                ease: [0, 0, 0.2, 1]
              }}
              style={{
                boxShadow: '0 4px 12px rgba(31, 31, 31, 0.08)' // Webapp shadow on active card only
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
