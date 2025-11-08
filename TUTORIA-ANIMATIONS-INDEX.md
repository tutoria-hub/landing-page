# Tutoria Card Animation Documentation Index

Three comprehensive documents covering card transitions and animations from tutoria-webapp.

## Documents Overview

### 1. TUTORIA-CARD-ANIMATIONS.md (24KB)
**Complete reference guide with full analysis**

Includes:
- 7 Framer Motion animations with full code examples
- 4 CSS animation systems with detailed mechanics
- Card stack mechanics and exit/cycle patterns
- Animation trigger flows and state management
- Performance optimizations and mobile considerations
- Configuration guide for timing and easing
- Complete file reference map (10 files)

**Best for**: Deep understanding, implementation reference, architecture decisions

---

### 2. ANIMATION-QUICK-REFERENCE.md (2.2KB)
**Fast lookup reference for common patterns**

Covers:
- Spring entrance physics (stiffness: 300, damping: 30)
- Card exit animation (700ms fadeOut with transforms)
- Card position transitions (200ms CSS)
- Corrections & feedback animations
- Progress celebration pulses
- AnimatePresence patterns
- Global timing system
- Performance notes

**Best for**: Quick lookups, developer reference, copy-paste patterns

---

### 3. ANIMATION-CODE-SNIPPETS.md (7.7KB)
**Exact code from the codebase with locations**

Contains 10 complete code snippets:
1. Spring entrance (ModulePracticeCard)
2. Card exit animation (CSS)
3. Card position transitions (CSS)
4. Word rotate with AnimatePresence
5. Pronunciation correction animation
6. Progress bar pulse
7. Loading spinner pulse
8. Card exit state handling
9. Manual advance after failure
10. Global timing variables

Each snippet includes exact file path and line numbers.

**Best for**: Copy-paste, exact implementation, debugging

---

## Key Findings

### Animation Types
- **Spring Entrance**: stiffness 300, damping 30, 100ms stagger
- **Card Exit**: 700ms @keyframes fadeOut (Y -32px, scale 0.94, rotate -2deg)
- **Card Positioning**: 200ms CSS transitions between positions
- **Text Corrections**: 800ms total (400ms fade-out + 400ms fade-in)
- **Progress Pulses**: 500ms scale [1, 1.15, 1] with optional color
- **Word Cycling**: 2500ms interval, 250ms transition with mode="wait"

### Stack Mechanics
- Position 0 (front): Full scale, highest z-index, interactive
- Position 1 (back): 95% scale, 16px offset, visual depth
- Position 2 (behind): 96% scale, 24px offset, disabled interaction
- Positions 3+: Hidden (display: none)

### Exit Behavior
- **Correct Answer**: Card exits upward (fadeOut), auto-removes after 800ms
- **Wrong Answer**: Card stays in place, blue styling, manual "Continue" button
- **Manual Advance**: Card exits (400ms timeout), moves to back of queue

### No Features
- No swipe gestures
- No drag-to-reorder
- No card rotation/flip
- No shuffle animations
- All state-driven (not gesture-driven)

---

## Quick Links by Use Case

### I want to...

**Understand the spring animation**
→ See ANIMATION-QUICK-REFERENCE.md: "Primary Spring Animation"

**Copy the card exit code**
→ See ANIMATION-CODE-SNIPPETS.md: #2 "Card Exit Animation"

**Debug timing issues**
→ See TUTORIA-CARD-ANIMATIONS.md: Section 7 "Configuration & Customization"

**Implement a similar pattern**
→ See ANIMATION-CODE-SNIPPETS.md: Full working examples

**Understand the full flow**
→ See TUTORIA-CARD-ANIMATIONS.md: Section 3 "Card Stack Mechanics"

**Quick easing reference**
→ See ANIMATION-QUICK-REFERENCE.md: "Global Timing System"

---

## Global Timing Values

All animations use CSS custom properties:

```css
--timing-instant: 100ms
--timing-quick: 300ms
--timing-smooth: 200ms       /* Card transitions */
--timing-deliberate: 700ms   /* Card exit */
--timing-celebration: 1000ms /* Victory moments */
```

Easing:
```css
--easing-out: cubic-bezier(0, 0, 0.2, 1)
--easing-smooth: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Files in Tutoria WebApp

Core animation files:
1. `/src/components/practice/ModuleCardStack.tsx` - Main stack component (553 lines)
2. `/src/styles/module-card-stack.css` - CSS animations (125 lines)
3. `/src/app/globals.css` - Timing variables (583 lines)

Component animations:
4. `/src/components/practice/ModulePracticeCard.tsx` - Spring entrance
5. `/src/components/practice/ActivityCard.tsx` - Fade entry
6. `/src/components/practice/ExerciseFrameCard.tsx` - Opacity transition
7. `/src/components/magicui/word-rotate.tsx` - Cycling text
8. `/src/components/practice/WordRotateCorrection.tsx` - Corrections
9. `/src/components/practice/ModuleProgressBar.tsx` - Progress pulses
10. `/src/components/ui/tutoria-loading-spinner.tsx` - Loading state

---

## Version
- **Framer Motion**: 12.10.5
- **React**: 19.0.0
- **Next.js**: 15.1.4
- **Tailwind CSS**: 3.4.17

---

## Questions?

All three documents are cross-referenced. Start with:
- QUICK-REFERENCE for fast answers
- CODE-SNIPPETS for exact implementations
- FULL GUIDE for deep understanding

Last updated: 2025-11-08
