# Tutoria WebApp: Card Transition & Animation Patterns

## Overview
The tutoria-webapp uses Framer Motion v12.10.5 combined with CSS-based animations for a lightweight, performance-optimized card system. The design follows Pieter Levels philosophy: "Make it so simple that bugs can't exist."

---

## 1. FRAMER MOTION ANIMATIONS

### 1.1 Module Practice Cards - Enter Animation
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModulePracticeCard.tsx`
**Lines**: 125-136

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

**Physics Parameters**:
- `type`: "spring" (spring physics)
- `stiffness`: 300 (faster, snappier spring)
- `damping`: 30 (moderate damping)
- `delay`: index * 0.1 (stagger by 100ms per card)

**Trigger**: Dashboard module grid initial render
**Effect**: Cards pop into view with spring bounce, staggered entrance

---

### 1.2 Activity Card - Enter/Exit Fade
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ActivityCard.tsx`
**Lines**: 81-95

```tsx
<motion.div
  className={cn(
    "w-full h-full flex items-center justify-center bg-white rounded-xl p-6 text-center border-2 border-gray-200",
    className
  )}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
```

**Parameters**:
- `duration`: 0.4 seconds (400ms)
- No spring physics - linear easing (default)
- Y offset: 10px for subtle lift

**Trigger**: Activity card first renders
**Effect**: Smooth fade-in for error state or missing activity

---

### 1.3 Exercise Frame Card - Opacity Only
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ExerciseFrameCard.tsx`
**Lines**: 24-35

```tsx
<motion.div
  className={cn(
    "w-full max-w-4xl mx-auto rounded-xl",
    !isRetryCard && "bg-white",
    "h-full",
    className
  )}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

**Parameters**:
- `duration`: 0.3 seconds (300ms)
- Opacity only (no transform)
- No delay

**Trigger**: Exercise frame renders
**Effect**: Quick fade-in for card content wrapper

---

### 1.4 Word Rotate - Cycle with AnimatePresence
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/magicui/word-rotate.tsx`
**Lines**: 1-50

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

**Key Parameters**:
- `AnimatePresence mode="wait"` - Wait for exit before enter
- Enter: `opacity: 0, y: -50` → `opacity: 1, y: 0`
- Exit: `opacity: 0, y: 50`
- `transition.duration`: 0.25 seconds (250ms)
- `ease`: "easeOut" (cubic-bezier(0, 0, 0.2, 1))
- Cycle duration: 2500ms (2.5 seconds) between words
- Triggered by interval state change

**Effect**: Text rotates up on exit, new text fades in from above

---

### 1.5 Word Rotate Correction - Dual State with AnimatePresence
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/WordRotateCorrection.tsx`
**Lines**: 94-136

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

**Parameters**:
- `duration`: Default 800ms, divided in half (400ms per transition)
- `ease`: "easeOut"
- Default exit trigger: 50ms delay after component mounts
- Transition: Original text fades out (0-400ms) → Corrected text fades in (400-800ms)

**Trigger**: Pronunciation correction feedback (triggered after 50ms delay)
**Effect**: Original word disappears, corrected word fades in with color coding

---

### 1.6 Module Progress Bar - Celebration Pulse
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModuleProgressBar.tsx`
**Lines**: 91-130

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
    {retryQueueSize > 0 && (
      <motion.span
        key={`retry-${retryQueueSize}`}
        initial={{ scale: 1, backgroundColor: 'transparent' }}
        animate={isFirstRender.current ? false : {
          scale: [1, 1.15, 1],
          backgroundColor: ['transparent', '#E8F2FF', 'transparent']
        }}
        transition={{ duration: 0.5 }}
        className="text-retry font-medium flex items-center gap-1 px-2 py-1 rounded-md"
      >
        <span>↻</span><span>{retryQueueSize}</span>
      </motion.span>
    )}
  </>
)}
```

**Parameters**:
- `duration`: 0.5 seconds
- `scale`: [1, 1.15, 1] (pulse outward then back)
- Color animations on progress counters
- `backgroundColor`: ['transparent', 'var(--primary-light)', 'transparent']
- Skips on first render to avoid initial animation

**Trigger**: Completion or progress count changes
**Effect**: "Complete!" text pulses with scale, color pulse on remaining count updates

---

### 1.7 Loading Spinner - Breathing Message
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/ui/tutoria-loading-spinner.tsx`
**Lines**: 65-72, 118-126

```tsx
<motion.p
  className="text-sm text-muted-foreground text-center max-w-xs"
  animate={{ opacity: [0.7, 1, 0.7] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  {message}
</motion.p>

// And for progress bar:
<motion.div
  className="bg-primary h-2 rounded-full"
  initial={{ width: 0 }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 0.3 }}
/>
```

**Parameters**:
- Message opacity: [0.7, 1, 0.7] with 2 second duration
- `repeat: Infinity` (continuous)
- `ease: "easeInOut"`
- Progress bar: 0.3 second duration

**Trigger**: Loading state, progress updates
**Effect**: Message breathing pulse, progress bar smoothly fills

---

## 2. CSS-BASED ANIMATIONS

### 2.1 Card Stack - Position Transitions (CSS)
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/styles/module-card-stack.css`
**Lines**: 1-125

```css
.module-card {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: white;
  border: 2px solid var(--border);
  overflow: hidden;

  /* Prevent edge artifacts */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  /* Always transition position changes - snappy but smooth entrance */
  transition: transform var(--timing-smooth) var(--easing-out),
              border var(--timing-smooth) var(--easing-out),
              opacity var(--timing-smooth) var(--easing-out);
}

/* Card positions - clean stack without rotation */
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

/* Hidden cards */
.module-card[data-position="3"], ... [3-15] {
  display: none;
}
```

**Timing Variables** (from globals.css):
- `--timing-smooth`: 200ms
- `--easing-out`: cubic-bezier(0, 0, 0.2, 1)

**Trigger**: `data-position` attribute changes (React state update)
**Effect**: Cards smoothly slide up/scale when positions shift

---

### 2.2 Card Stack - Exit Animation (CSS + Classes)
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/styles/module-card-stack.css`
**Lines**: 82-94

```css
/* Single exit animation - celebration moment */
.module-card.exiting {
  animation: fadeOut var(--timing-deliberate) var(--easing-out) forwards;
  pointer-events: none;
  transition: none; /* Disable transition, use animation instead */
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateY(-32px) scale(0.94) rotate(-2deg);
  }
}
```

**Timing Parameters**:
- `--timing-deliberate`: 700ms
- `--easing-out`: cubic-bezier(0, 0, 0.2, 1)
- Y offset: -32px (upward)
- Scale: 0.94 (slight shrink)
- Rotate: -2deg (slight counterclockwise)

**Trigger**: `setExitingWord(word)` in ModuleCardStack (line 318)
**Effect**: Card fades out and floats upward on correct answer

**Cleanup**: After 800ms timeout (line 340), word is removed from deck via `setWords(prev => prev.slice(1))`

---

### 2.3 Global Animation Timing System
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/app/globals.css`
**Lines**: 1-12, 75-95

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

/* ... other styles ... */

/* Module Card Stack Animations - Clean and Natural */
@keyframes card-success {
  to {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
}

@keyframes card-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.animate-vanish {
  animation: card-success var(--timing-deliberate) var(--easing-out) forwards;
}

.animate-fail {
  animation: card-shake var(--timing-deliberate) var(--easing-smooth);
}
```

**Utility Animations**:
- `.animate-vanish` - Card success animation (not currently used, kept for compatibility)
- `.animate-fail` - Card shake on error (not currently used)

---

### 2.4 Recording Button Animations
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/app/globals.css`
**Lines**: 306-358

```css
/* Recording bar - pill-shaped for curvy look */
.recording-bar {
  @apply rounded-full transition-all;
}

/* Burst Phase: Green pills appear (transformation from dots) */
[data-phase="burst"] .recording-bar {
  @apply bg-primary;
  width: 6px;
  height: 24px;
  animation: burst 200ms ease-out;
}

/* Active Phase: Green reactive pills */
[data-phase="active"] .recording-bar {
  @apply bg-primary;
  width: 6px;
  height: var(--bar-height);
  transition: height 80ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes burst {
  0% { transform: scale(1); }
  60% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes pulse-strong {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.animate-pulse-strong {
  animation: pulse-strong 1s ease-in-out infinite;
}
```

**Trigger**: Recording phase state changes (burst/active/idle)
**Effect**: Recording bars scale and animate responsively to audio levels

---

## 3. CARD STACK MECHANICS

### 3.1 How Cards Exit & Cycle
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModuleCardStack.tsx`

**Exit on Correct Answer** (Lines 307-340):
```tsx
if (result.correct) {
  // Play success audio
  if (successAudioRef.current) {
    successAudioRef.current.currentTime = 0;
    successAudioRef.current.play();
  }

  // Animate exit
  setExitingWord(word);

  // Auto-advance after animation
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

**Movement Pattern**:
1. Word submitted correctly
2. Card marked with `exiting` class → CSS animation (700ms)
3. Timeout fires (800ms) → `setWords(prev => prev.slice(1))`
4. Next card moves to position 0 → CSS transition (200ms)

**Total Transition Time**: 700ms animation + 100ms buffer = 800ms before removal

---

### 3.2 Manual Advancement on Failure
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/components/practice/ModuleCardStack.tsx`
**Lines**: 358-388

```tsx
const handleContinueAfterFailure = useCallback(() => {
  const word = words[0];
  if (!word || !currentFeedback || currentFeedback.overallIsCorrect) return;

  // Special handling for last word - just reset state
  if (words.length === 1) {
    setCurrentFeedback(null);
    return;
  }

  // Normal flow: animate and move to back
  setExitingWord(word);

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

**Movement Pattern on Failure**:
1. User clicks "Continue" on failed card
2. Card marked with `exiting` class → CSS animation (700ms of fadeOut plays)
3. Timeout fires (400ms) → `setWords(prev => [...prev.slice(1), word])`
4. Failed word moves to back of queue
5. Next card becomes position 0 → CSS transition (200ms)
6. Retry word now in position 2-3

---

### 3.3 Card Positioning & Depth
**File**: `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/styles/module-card-stack.css`
**Lines**: 34-52

Position Data Attributes | Transform | Z-Index | Interaction
---|---|---|---
`data-position="0"` | translateY(0) scale(1.0) rotate(0deg) | 3 | interactive
`data-position="1"` | translateY(16px) scale(0.95) rotate(1deg) | 2 | pointer-events: none
`data-position="2"` | translateY(24px) scale(0.96) | 1 | pointer-events: none
`data-position="3"+` | display: none | - | hidden

---

## 4. ANIMATION TRIGGERS & STATE FLOW

### Complete Activity Flow:
```
1. Card Enters (Spring):
   ModulePracticeCard renders
   → motion.div with spring (stiffness: 300, damping: 30)
   → Staggered by index * 0.1

2. User Records & Submits:
   ActivityCard captures audio
   → handleActivityComplete() called
   → Backend assessment

3. Correct Answer:
   → setExitingWord(word)
   → .exiting class applied
   → @keyframes fadeOut plays (700ms)
   → SUCCESS audio plays (independent)
   → Timeout at 800ms
   → setWords(prev => prev.slice(1))
   → Next card CSS transition (200ms)

4. Wrong Answer:
   → Mark word with data-failed="true" (blue styling)
   → Show corrected pronunciation animation
   → Keep card in position, wait for user

5. Manual Advance After Failure:
   → setExitingWord(word)
   → @keyframes fadeOut plays (700ms, not fully visible at 400ms timeout)
   → Timeout at 400ms
   → setWords(prev => [...prev.slice(1), word])
   → Word moves to back of queue
   → Next card enters
```

---

## 5. KEY ANIMATION PATTERNS SUMMARY

### Pattern 1: Spring Entrance
- Used for: Dashboard module cards
- Physics: stiffness 300, damping 30
- Duration: Self-calculated (usually ~400-500ms)
- Stagger: index * 0.1 (100ms per card)

### Pattern 2: Fade + Translate Enter
- Used for: Activity cards, exercise frames
- Duration: 300-400ms
- Easing: "easeOut" (default cubic-bezier)
- Y offset: 10-20px

### Pattern 3: AnimatePresence mode="wait"
- Used for: Word rotation, corrections
- Enter: From off-screen (y: -50 or +50)
- Exit: To off-screen (y: +50 or -50)
- Duration: 250ms
- Key changes trigger enter/exit cycle

### Pattern 4: CSS State Transitions
- Used for: Card positioning, stacking
- Duration: 200ms (--timing-smooth)
- Easing: cubic-bezier(0, 0, 0.2, 1) (--easing-out)
- Trigger: data-position attribute changes

### Pattern 5: CSS Keyframe Exit
- Used for: Card exit animation
- Duration: 700ms (--timing-deliberate)
- Effect: Fade opacity + translate Y + scale + rotate
- Trigger: .exiting class applied via setState

### Pattern 6: Pulse Animation
- Used for: Progress counters, completion celebration
- Duration: 500-1000ms
- Effect: Scale pulse [1, 1.15, 1] + optional color pulse
- Pattern: [start, peak, end] for smooth bounce

---

## 6. PERFORMANCE NOTES

**Optimizations**:
1. CSS transforms for card positioning (hardware accelerated)
2. Backface visibility hidden to prevent flickering
3. Transform-style preserve-3d for 3D context
4. Timeout-based removal (not animation-end events) for reliability
5. Audio plays independently of exit animation (no wait)
6. First render skip for progress animations (skip initial pulse)

**Throttling**:
- Recording bars: 80ms transition for audio reactivity
- Card stack: 200ms transitions for smooth stacking
- Progress bar: 300ms fill animation

**Mobile Optimizations** (lines 113-123):
```css
@media (max-width: 640px) {
  .module-card[data-position="1"] {
    transform: translateY(12px) scale(0.97) rotate(0.5deg);
  }
  .module-card[data-position="2"] {
    transform: translateY(20px) scale(0.98);
  }
}
```

---

## 7. CONFIGURATION & CUSTOMIZATION

### Global Timing Variables
Located in `/Users/frederikhandberg/Tutoria-Stack/tutoria-webapp/src/app/globals.css` (lines 1-12):

Change these to adjust all animations:
```css
--timing-instant: 100ms;     /* Quick interactions */
--timing-quick: 300ms;       /* Button clicks, fast feedback */
--timing-smooth: 200ms;      /* Card transitions, positioning */
--timing-deliberate: 700ms;  /* Card exit, major transitions */
--timing-celebration: 1000ms; /* Celebration/victory moments */
```

### Easing Curves
```css
--easing-out: cubic-bezier(0, 0, 0.2, 1);   /* Ease out */
--easing-smooth: cubic-bezier(0.4, 0, 0.2, 1); /* Smooth */
```

### Spring Physics
In Framer Motion components:
```tsx
type: "spring"
stiffness: 300  // Higher = faster/snappier
damping: 30     // Higher = more damping/smoothing
```

---

## 8. FILES REFERENCE MAP

| Purpose | File Path | Lines |
|---------|-----------|-------|
| Card Stack Layout | `/src/components/practice/ModuleCardStack.tsx` | 1-553 |
| Card Stack CSS | `/src/styles/module-card-stack.css` | 1-125 |
| Global Animations | `/src/app/globals.css` | 1-583 |
| Module Cards | `/src/components/practice/ModulePracticeCard.tsx` | 125-136 |
| Activity Card | `/src/components/practice/ActivityCard.tsx` | 81-95 |
| Exercise Frame | `/src/components/practice/ExerciseFrameCard.tsx` | 24-35 |
| Word Rotate | `/src/components/magicui/word-rotate.tsx` | 1-50 |
| Word Correction | `/src/components/practice/WordRotateCorrection.tsx` | 94-136 |
| Progress Bar | `/src/components/practice/ModuleProgressBar.tsx` | 91-130 |
| Loading Spinner | `/src/components/ui/tutoria-loading-spinner.tsx` | 65-126 |

---

## 9. NO SHUFFLE/SWIPE/ROTATE PATTERNS FOUND

The codebase does **NOT** implement:
- ❌ Swipe-to-dismiss gestures
- ❌ Card rotation/flip animations
- ❌ Shuffle animations
- ❌ Drag-to-reorder
- ❌ Gesture handlers (Framer Motion onDrag, onHover gesture)

All card advancement is **programmatic** (state-driven, not gesture-driven).
Cards exit via fadeOut animation, not off-screen in any direction beyond Y-axis.

