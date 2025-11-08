# Apple Card Animation - Quick Reference

Copy-paste ready bezier curves and timing values for Apple-quality physics.

## Core Animation (420ms)

### Keyframes
```javascript
x: [0, -8, 0, 45, 280]        // Anticipation pullback → momentum swipe
y: [0, 0, 0, 12, 72]          // Slight arc trajectory
rotate: [0, -0.5, 0, 2.5, 12] // Counter-rotate → natural tilt
scale: [1, 1.01, 1, 0.96, 0.82] // Subtle lift → compress
opacity: [1, 1, 1, 0.92, 0]   // Hold visibility → quick fade
```

### Timing Points
```javascript
times: [0, 0.14, 0.19, 0.67, 1]
// Translates to: [0ms, 60ms, 80ms, 280ms, 420ms]
```

### Bezier Curves

**Horizontal Movement (Spring with overshoot)**
```javascript
ease: [0.34, 1.56, 0.64, 1]
```

**Vertical Arc (Gentle parabola)**
```javascript
ease: [0.22, 0.61, 0.36, 1]
```

**Rotation (Snappy with overshoot)**
```javascript
ease: [0.17, 0.89, 0.32, 1.28]
```

**Scale (iOS standard ease-out)**
```javascript
ease: [0.4, 0, 0.2, 1]
```

**Opacity (Hold then linear fade)**
```javascript
ease: [0.4, 0, 1, 1]
```

## Complete Framer Motion Config

```javascript
exit={{
  // Keyframes
  x: [0, -8, 0, 45, 280],
  y: [0, 0, 0, 12, 72],
  rotate: [0, -0.5, 0, 2.5, 12],
  scale: [1, 1.01, 1, 0.96, 0.82],
  opacity: [1, 1, 1, 0.92, 0],

  // Timing
  transition: {
    duration: 0.42,
    times: [0, 0.14, 0.19, 0.67, 1],

    // Per-property easing
    x: {
      duration: 0.42,
      times: [0, 0.14, 0.19, 0.67, 1],
      ease: [0.34, 1.56, 0.64, 1]
    },
    y: {
      duration: 0.42,
      times: [0, 0.14, 0.19, 0.67, 1],
      ease: [0.22, 0.61, 0.36, 1]
    },
    rotate: {
      duration: 0.42,
      times: [0, 0.14, 0.19, 0.67, 1],
      ease: [0.17, 0.89, 0.32, 1.28]
    },
    scale: {
      duration: 0.42,
      times: [0, 0.14, 0.19, 0.67, 1],
      ease: [0.4, 0, 0.2, 1]
    },
    opacity: {
      duration: 0.42,
      times: [0, 0.14, 0.19, 0.67, 1],
      ease: [0.4, 0, 1, 1]
    }
  }
}}
```

## Card Rise Animation (350ms)

```javascript
transition={{
  duration: 0.35,
  delay: 0.08, // Wait for anticipation to complete
  ease: [0.34, 1.56, 0.64, 1] // Same spring as swipe
}}
```

## Press Feedback

**Press Down (100ms)**
```javascript
animate={{
  scale: 0.98,
  y: 2,
  transition: {
    duration: 0.1,
    ease: [0, 0, 0.2, 1] // ease-out
  }
}}
```

**Spring Back (150ms)**
```javascript
animate={{
  scale: 1,
  y: 0,
  transition: {
    duration: 0.15,
    ease: [0.34, 1.56, 0.64, 1] // spring with overshoot
  }
}}
```

## Timing Synchronization

```javascript
// User releases button
setTimeout(() => {
  // Spring back completes
  setIsPressed(false);
  setIsExiting(true);

  // Drop z-index after anticipation (80ms)
  setTimeout(() => {
    setExitingCardZIndex(0);
  }, 80);

  // Complete cycle (420ms)
  setTimeout(() => {
    setCards(prev => [...prev.slice(1), prev[0]]);
    setIsExiting(false);
  }, 420);
}, 150); // Spring-back duration
```

## CSS Equivalent

For non-Framer Motion implementations:

```css
.card-exit {
  animation: card-swipe 420ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes card-swipe {
  0% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
  14% { transform: translate(-8px, 0) rotate(-0.5deg) scale(1.01); opacity: 1; }
  19% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
  67% { transform: translate(45px, 12px) rotate(2.5deg) scale(0.96); opacity: 0.92; }
  100% { transform: translate(280px, 72px) rotate(12deg) scale(0.82); opacity: 0; }
}
```

Note: CSS version uses single easing curve. For true Apple quality, use Framer Motion with independent per-property easing.

## Testing with Chrome DevTools

1. Open DevTools → Performance
2. Start recording
3. Trigger swipe animation
4. Check for 60fps (green line)
5. Verify total duration ≈ 420ms

## Cubic-bezier.com Visualization

Paste these values into [cubic-bezier.com](https://cubic-bezier.com):

- **Spring overshoot**: `0.34, 1.56, 0.64, 1`
- **Gentle arc**: `0.22, 0.61, 0.36, 1`
- **Snappy rotation**: `0.17, 0.89, 0.32, 1.28`
- **iOS standard**: `0.4, 0, 0.2, 1`

---

**Standard**: Apple Card iOS 15-18
**Duration**: 420ms
**Properties**: x, y, rotate, scale, opacity (5 independent curves)
