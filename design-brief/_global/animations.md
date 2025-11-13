# Animation Philosophy

**Principle**: Purposeful motion that enhances clarity, never decoration.

## Global Animation Standards

### Timing (Duolingo-Inspired)
- **Micro-interactions**: 200ms (buttons, hovers)
- **State changes**: 300ms (color transitions, fades)
- **Card transitions**: 700ms (flashcard swipes, modals)
- **Page load**: Staggered reveals (100ms increments)

### Physics (Spring-Based)
- **Stiffness**: 120-140 (natural bounce, not rubber band)
- **Damping**: 20-22 (controlled settle, no oscillation)
- **Type**: Spring preferred over easing curves (more lifelike)

### Motion Budget
- **Hero section**: 1 orchestrated moment (typing animation OR scroll indicator, not both)
- **Per section**: 1 animation maximum (concentrated impact)
- **Scroll triggers**: Sparingly (2-3 key moments only)
- **Hover states**: Always (instant feedback)

## Component-Specific Specs

### Flashcard Demo (app/components/FlashcardDemoCard.tsx)
- Exit: `x: 320px, rotate: 15deg` (swipe-right)
- Duration: 700ms spring transition
- Reduced motion: Fade only (no rotation/translation)
- Audio button: 700ms recording preparation choreography
- See component file for full implementation details

### CTA Buttons (ShinyButton)
- Shimmer: CSS-only gradient animation
- Hover: scale(1.05) in 200ms
- Press: translateY(4-6px) with shadow reduction

### Scroll Animations (BlurFade)
- Blur → sharp transition on IntersectionObserver trigger
- Staggered delays: 100-500ms (5 sections max)
- Respects prefers-reduced-motion

## Anti-Patterns (NEVER DO)

❌ **Light rays** - Gimmicky, violates restraint
❌ **Word rotate** - Reduces clarity, motion sickness risk
❌ **Excessive blur-fade** - Use 2-3 strategic moments max
❌ **Scattered micro-interactions** - Dilutes impact, feels disjointed
❌ **Inconsistent timing** - Use 200ms/300ms/700ms only

## Accessibility Requirements

- **prefers-reduced-motion**: Disable spring physics, keep fades only
- **No autoplay**: User-initiated interactions only (exception: flashcard demo loop)
- **Keyboard navigation**: Animations don't interfere with tab order
- **Screen readers**: Motion doesn't break semantic structure
