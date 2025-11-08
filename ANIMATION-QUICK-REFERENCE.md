# Tutoria Card Animation - Quick Reference

## Primary Spring Animation
**Dashboard Cards Entry**
```tsx
type: "spring"
stiffness: 300
damping: 30
delay: index * 0.1  // 100ms stagger
```
**Result**: Pop-in with bounce, staggered by card index
**Duration**: ~400-500ms (self-calculated by spring)

---

## Card Exit Animation (Correct Answer)
**CSS @keyframes fadeOut**
```css
Duration: 700ms (--timing-deliberate)
Easing: cubic-bezier(0, 0, 0.2, 1) (--easing-out)

Transform:
- Y: translateY(-32px) ↑
- Scale: scale(0.94) ↓ 
- Rotate: rotate(-2deg) ↺

Trigger: .exiting class
Removal: 800ms timeout (700ms + 100ms buffer)
```

---

## Card Position Transitions
**CSS Transitions (200ms)**
```css
Duration: 200ms (--timing-smooth)
Easing: cubic-bezier(0, 0, 0.2, 1)

Position 0 (Front):  scale(1.0)   shadow: 4px 12px
Position 1 (Back):   scale(0.95)  offset: 16px
Position 2 (Behind): scale(0.96)  offset: 24px
Position 3+: hidden
```

---

## Corrections & Feedback
**Word Rotate Correction**
```tsx
Duration: 800ms total (400ms fade-out + 400ms fade-in)
Delay: 50ms before transition starts

Original: opacity 1 → 0 (400ms)
Corrected: opacity 0 → 1 (400ms)
Color: Success/Warning per segment
```

---

## Progress Celebrations
**Pulse Animation**
```tsx
Duration: 0.5s
Scale: [1, 1.15, 1]
Color optional: [transparent, --primary-light, transparent]

Triggers on:
- Completion state change
- Progress count update
- Skip first render
```

---

## AnimatePresence Patterns
**mode="wait"** - Used for word cycling
```tsx
Exit: opacity 0, translateY(+50px)
Enter: opacity 0 → 1, translateY(-50px) → 0
Duration: 250ms
Ease: easeOut
```

---

## Global Timing System
```css
--timing-instant: 100ms    /* Quick UI feedback */
--timing-quick: 300ms      /* Button interactions */
--timing-smooth: 200ms     /* Card stacking */
--timing-deliberate: 700ms /* Exit animations */
--timing-celebration: 1000ms /* Victories */
```

---

## No Gesture Support
- No swipe detection
- No drag-to-reorder
- No rotation gestures
- No 3D flip animations
- All state-driven, not gesture-driven

---

## Performance Notes
- CSS transforms: hardware accelerated
- Timeout-based removal: reliable
- Audio independent of animation
- Skip initial render pulses
- Mobile: reduced scale/offset values
