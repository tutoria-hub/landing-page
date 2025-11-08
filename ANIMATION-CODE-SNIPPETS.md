# Tutoria Card Animation - Exact Code Snippets

## 1. SPRING ENTRANCE (Dashboard Cards)

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModulePracticeCard.tsx:125-136`

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      delay: index * 0.1
    }
  }}
>
```

---

## 2. CARD EXIT ANIMATION (CSS)

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/styles/module-card-stack.css:82-94`

```css
.module-card.exiting {
  animation: fadeOut var(--timing-deliberate) var(--easing-out) forwards;
  pointer-events: none;
  transition: none;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateY(-32px) scale(0.94) rotate(-2deg);
  }
}
```

---

## 3. CARD POSITION TRANSITIONS

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/styles/module-card-stack.css:14-31`

```css
.module-card {
  transition: transform var(--timing-smooth) var(--easing-out),
              border var(--timing-smooth) var(--easing-out),
              opacity var(--timing-smooth) var(--easing-out);
}

.module-card[data-position="0"] {
  transform: translateY(0) scale(1.0) rotate(0deg);
  z-index: 3;
  box-shadow: 0 4px 12px rgba(31, 31, 31, 0.08);
}

.module-card[data-position="1"] {
  transform: translateY(16px) scale(0.95) rotate(1deg);
  transform-origin: bottom center;
  z-index: 2;
  pointer-events: none;
}

.module-card[data-position="2"] {
  transform: translateY(24px) scale(0.96);
  transform-origin: bottom center;
  z-index: 1;
  pointer-events: none;
}
```

---

## 4. WORD ROTATE WITH ANIMATE PRESENCE

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/magicui/word-rotate.tsx:15-49`

```tsx
export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          className={cn(className)}
          {...motionProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
```

---

## 5. PRONUNCIATION CORRECTION ANIMATION

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/WordRotateCorrection.tsx:94-136`

```tsx
<AnimatePresence mode="wait">
  {!showCorrected ? (
    <motion.div
      key="original"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration / 1000 / 2, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center"
      style={textStyles}
    >
      <span>{originalText}</span>
    </motion.div>
  ) : (
    <motion.div
      key="corrected"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration / 1000 / 2, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center"
      style={textStyles}
    >
      {createColoredWord()}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 6. PROGRESS BAR PULSE

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModuleProgressBar.tsx:91-130`

```tsx
{isComplete ? (
  <motion.span
    key="completed"
    initial={{ scale: 1, backgroundColor: 'transparent' }}
    animate={isFirstRender.current ? false : {
      scale: [1, 1.15, 1],
      backgroundColor: ['transparent', 'var(--primary-light)', 'transparent']
    }}
    transition={{ duration: 0.5 }}
    className="text-primary px-2 py-1 rounded-md"
  >
    Complete! ✓
  </motion.span>
) : (
  <>
    <motion.span
      key={`left-${totalCount - totalCompleted - retryQueueSize}`}
      initial={{ scale: 1, color: 'var(--muted-foreground)' }}
      animate={isFirstRender.current ? false : {
        scale: [1, 1.15, 1],
        color: ['var(--muted-foreground)', 'var(--primary)', 'var(--muted-foreground)']
      }}
      transition={{ duration: 0.5 }}
      className="px-2 py-1 rounded-md"
    >
      {totalCount - totalCompleted - retryQueueSize} left
    </motion.span>
  </>
)}
```

---

## 7. LOADING SPINNER PULSE

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/ui/tutoria-loading-spinner.tsx:65-72`

```tsx
<motion.p
  className="text-sm text-muted-foreground text-center max-w-xs"
  animate={{ opacity: [0.7, 1, 0.7] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  {message}
</motion.p>
```

---

## 8. CARD EXIT STATE HANDLING

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModuleCardStack.tsx:307-340`

```tsx
if (result.correct) {
  // Play success audio
  if (successAudioRef.current) {
    successAudioRef.current.currentTime = 0;
    successAudioRef.current.play().catch(err =>
      logger.error('Failed to play success audio', { error: err })
    );
  }

  // Animate exit
  setExitingWord(word);

  // Clear any existing timeout
  if (exitTimeoutRef.current) {
    clearTimeout(exitTimeoutRef.current);
  }

  // Auto-advance after animation - INDEPENDENT of audio duration
  exitTimeoutRef.current = setTimeout(() => {
    // Success: Remove from front of deck
    setWords(prev => prev.slice(1));

    // Remove from failed set if it was there
    setFailedWords(prev => {
      const next = new Set(prev);
      next.delete(word);
      return next;
    });

    // Reset state
    setExitingWord(null);
    setCurrentFeedback(null);
  }, 800); // Exit animation (700ms) + buffer (100ms)
}
```

---

## 9. MANUAL ADVANCE AFTER FAILURE

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModuleCardStack.tsx:358-388`

```tsx
const handleContinueAfterFailure = useCallback(() => {
  const word = words[0];
  if (!word || !currentFeedback || currentFeedback.overallIsCorrect) return;

  // Special handling for last word - just reset state to allow retry
  if (words.length === 1) {
    // Clear feedback to reset the card for immediate retry
    setCurrentFeedback(null);
    // No animation or word reordering needed - user can retry immediately
    return;
  }

  // Normal flow for multiple words: animate and move to back
  setExitingWord(word);

  // Clear any existing timeout
  if (exitTimeoutRef.current) {
    clearTimeout(exitTimeoutRef.current);
  }

  // Handle after animation
  exitTimeoutRef.current = setTimeout(() => {
    // Move from front to back of deck for retry
    setWords(prev => [...prev.slice(1), word]);

    // Reset state
    setExitingWord(null);
    setCurrentFeedback(null);
  }, 400); // Shorter animation for manual advance
}, [words, currentFeedback]);
```

---

## 10. GLOBAL TIMING VARIABLES

**Location**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/app/globals.css:1-12`

```css
:root {
  /* Animation timing system - MUST be defined FIRST */
  --timing-instant: 100ms;
  --timing-quick: 300ms;
  --timing-smooth: 200ms;
  --timing-deliberate: 700ms;
  --timing-celebration: 1000ms;

  /* Easing curves */
  --easing-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Import Statement

All animations use:
```tsx
import { motion, AnimatePresence } from 'framer-motion';
```

Version: `"framer-motion": "^12.10.5"` (from package.json)

