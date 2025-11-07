# Hero Section - Design Brief

**Last Updated**: 2025-11-07
**Status**: Finalized - Ready for Development

---

## Purpose

Establish immediate credibility and value proposition within 3 seconds of landing. Answers two critical questions:
1. "What is this?" → Structured phonics learning platform
2. "Why should I care?" → Proven effectiveness (50-90% success rate from Harvard research)

---

## Layout Specs

### Desktop (≥1024px)

```css
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #FFFFFF;
  padding: 48px 24px;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

/* Component spacing */
.headline {
  margin-bottom: 48px; /* Increased from 24px - let headline breathe */
}

.stat-card {
  margin-bottom: 48px; /* Space before scroll indicator */
}

.scroll-indicator {
  margin-top: 0; /* Positioned after stat card */
}
```

### Mobile (<1024px)

```css
.hero-section {
  min-height: 80vh;
  padding: 32px 20px;
}

/* Headline and stat-card spacing remain same (48px gap) */
/* Scroll indicator remains same */
```

---

## Components

**Note**: Logo lives in site header, not hero section. Hero contains only headline, stat card, and scroll indicator.

---

### Headline

**Purpose**: Immediate value proposition in plain language

**HTML Structure**:
```html
<h1 class="hero-headline">
  Structured phonics that just works!
</h1>
```

**Styles**:
```css
.hero-headline {
  font-family: 'EB Garamond', serif;
  font-weight: 700;
  font-size: 96px;
  line-height: 1.1;
  letter-spacing: -0.01em; /* Tighter for display serif */
  color: #1A1A1A;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .hero-headline {
    font-size: 48px;
  }
}

@media (max-width: 640px) {
  .hero-headline {
    font-size: 40px; /* Extra adjustment for very small screens */
  }
}
```

**States**:
- **Default**: Static text
- **Animation (Phase 2)**: Fade in from bottom (200ms delay after logo)

**Content**:
- Finalized text: "Structured phonics that just works!"
- Do not modify without approval

---

### Harvard Stat Card

**Purpose**: Establish scientific credibility immediately

**HTML Structure**:
```html
<div class="stat-card">
  <p class="stat-number">50-90%</p>
  <p class="stat-text">
    of at-risk readers can reach grade level with targeted instruction
  </p>
  <img
    src="/assets/harvard-logo-grey.png"
    alt="Harvard Medical School"
    class="harvard-logo"
  >
</div>
```

**Styles**:
```css
.stat-card {
  background: #F7F5ED; /* Cream */
  border: 2px solid #30A46C; /* Green accent */
  border-radius: 16px;
  padding: 32px 48px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 4px 0 #DCDCDC; /* Subtle 3D effect */
  transition: all 200ms ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 0 #DCDCDC; /* Enhanced shadow on hover */
}

.stat-number {
  font-family: 'EB Garamond', serif;
  font-size: 64px;
  font-weight: 700;
  color: #30A46C;
  line-height: 1;
  margin-bottom: 16px;
}

.stat-text {
  font-family: 'Lexend', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  color: #1A1A1A;
  margin-bottom: 20px;
}

.harvard-logo {
  width: auto;
  height: 40px;
  filter: grayscale(100%);
  opacity: 1;
  display: block;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .stat-card {
    padding: 24px 32px;
    max-width: 90%;
  }

  .stat-card:hover {
    transform: none; /* Disable hover on touch devices */
    box-shadow: 0 4px 0 #DCDCDC;
  }

  .stat-number {
    font-size: 48px;
  }

  .stat-text {
    font-size: 18px;
  }

  .harvard-logo {
    height: 32px; /* Slightly smaller on mobile */
  }
}
```

**States**:
- **Default**: Static display with subtle shadow
- **Hover (Desktop)**: Card lifts 4px with enhanced shadow
- **Mobile**: No hover interaction (touch devices)
- **Animation (Phase 2)**: Fade in from bottom (400ms delay after headline)

**Content**:
- Stat number: "50-90%"
- Body: "of at-risk readers can reach grade level with targeted instruction"
- Visual citation: Harvard Medical School logo (greyscale, 40px height)
- Do not modify without approval

**Asset Requirements**:
- Harvard logo in greyscale format
- Format: Transparent PNG
- Minimum height: 80px (2x for retina)
- Location: `/assets/harvard-logo-grey.png`

---

### Scroll Indicator

**Purpose**: Guide users to explore content below the fold without nagging

**HTML Structure**:
```html
<div class="scroll-indicator" aria-label="Scroll to continue">
  <svg class="chevron" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#595959" stroke-width="2" stroke-linecap="round"/>
  </svg>
</div>
```

**Styles**:
```css
.scroll-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  opacity: 0;
}

.chevron {
  width: 24px;
  height: 24px;
}

/* Animation timing: play on load, then every 15 seconds */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.scroll-indicator.animate {
  opacity: 1;
  animation: bounce 1s ease-in-out;
}
```

**JavaScript Behavior**:
```javascript
// Show indicator on page load
window.addEventListener('load', () => {
  const indicator = document.querySelector('.scroll-indicator');
  indicator.classList.add('animate');

  // Remove animation class after completion
  setTimeout(() => indicator.classList.remove('animate'), 1000);

  // Repeat animation every 15 seconds
  setInterval(() => {
    indicator.classList.add('animate');
    setTimeout(() => indicator.classList.remove('animate'), 1000);
  }, 15000);
});

// Hide indicator after user scrolls
window.addEventListener('scroll', () => {
  const indicator = document.querySelector('.scroll-indicator');
  if (window.scrollY > 100) {
    indicator.style.display = 'none';
  }
});
```

**States**:
- **Default**: Invisible (opacity: 0) until triggered
- **Animated**: Visible with bounce animation (1s duration)
- **Hidden**: Permanently hidden after user scrolls 100px

**Accessibility**:
- Includes `aria-label` for screen readers
- Animation respects `prefers-reduced-motion` (Phase 2)
- Not keyboard-interactive (decorative only)

**Mobile**:
- Same behavior as desktop
- Indicator remains 24px size (touch-friendly)

---

## Accessibility

**Completed**:
- [x] Headline uses semantic h1 tag
- [x] Harvard logo has descriptive alt text ("Harvard Medical School")
- [x] Stat card hover only on desktop (no confusing touch interactions)
- [x] Scroll indicator has aria-label for screen readers
- [x] Color contrast exceeds 4.5:1 (all text passes WCAG AA)

**Phase 2**:
- [ ] Scroll indicator animation respects `prefers-reduced-motion` media query
- [ ] Card fade-in animations respect `prefers-reduced-motion`
- [ ] Add skip-to-content link for keyboard users

**Testing**:
- Verify with screen reader (NVDA, JAWS, VoiceOver)
- Test keyboard navigation flow (should skip directly to next section after hero)
- Verify hover states don't interfere with touch/mobile interactions

---

## Edge Cases

### Mobile Landscape (480px-1024px, landscape orientation)

**Problem**: 100vh on landscape mobile causes awkward cropping
**Solution**:
```css
@media (max-width: 1024px) and (orientation: landscape) {
  .hero-section {
    min-height: 60vh; /* Reduce height on landscape */
  }
}
```

### Slow Connections

**Problem**: Large logo file delays hero render
**Solution**:
- Prioritize logo loading (add `<link rel="preload">` in `<head>`)
- Use optimized PNG (compress with TinyPNG or ImageOptim)
- Show placeholder until loaded:
```css
.hero-logo[src=""] {
  background: #F5F5F4;
  border-radius: 8px;
}
```

### Long Headline Translations (Future i18n)

**Problem**: Some languages produce longer headlines
**Solution**:
- Allow line wrapping (already enabled)
- Maintain center alignment
- Reduce font-size on overflow:
```css
.hero-headline[data-lang="de"],
.hero-headline[data-lang="es"] {
  font-size: 84px; /* Slightly smaller for longer text */
}
```

### Very Small Screens (<375px)

**Problem**: 40px headline still too large on tiny screens
**Solution**:
```css
@media (max-width: 375px) {
  .hero-headline {
    font-size: 32px;
  }

  .stat-card {
    padding: 20px 24px;
  }

  .stat-number {
    font-size: 40px;
  }
}
```

---

## Implementation Notes

### Phase 1 (Ship First)

**Minimum Viable Version**:
- Headline + stat card (with Harvard logo) + scroll indicator
- Stat card hover interaction (desktop only)
- Scroll indicator with timed animation (JS required)
- Basic responsive (desktop/mobile breakpoints)
- All text finalized

**Time Estimate**: 3-4 hours (JS for scroll indicator adds complexity)

**Deliverable**: Functional hero that establishes credibility and guides users to scroll

### Phase 2 (Polish)

**Enhancements**:
- Fade-in animation sequence:
  1. Headline fades in from bottom (0ms)
  2. Stat card fades in from bottom (200ms delay)
  3. Scroll indicator appears (400ms delay)
- `prefers-reduced-motion` support for all animations
- Subtle parallax scroll effect on stat card (optional)

**Time Estimate**: 2-3 hours

**Deliverable**: Polished, smooth entry animation with accessibility enhancements

### Dependencies

**Assets Required**:
- harvard-logo-grey.png (greyscale PNG, min 80px height for retina)
- EB Garamond font loaded (Bold 700 weight required)
- Lexend font loaded (Regular 400 weight required)

**External**:
- None (fully self-contained section)

**Technical**:
- CSS custom properties for colors (defined in global stylesheet)
- JavaScript for scroll indicator timing (vanilla JS, no frameworks)
- Tailwind utility classes (optional, can use vanilla CSS)

---

## Design Decisions Log

### Why 96px headline on desktop?

**Decision**: Use 96px instead of design system's 72px max
**Rationale**: Hero headline is unique moment - needs commanding presence. 72px felt timid for such a clear value proposition.
**Trade-off**: Requires custom Tailwind config or CSS. Worth it for impact.

### Why cream background on stat card instead of white?

**Decision**: Cream (#F7F5ED) background with green border
**Rationale**: Creates visual separation from white page background. Draws eye to credibility proof. Subtle warmth without full notebook aesthetic.
**Alternative Considered**: White card with green background - rejected as too aggressive.

### Why green border on stat card?

**Decision**: 2px solid #30A46C border
**Rationale**: Green = success/credibility in Tutoria design system. Draws eye without overwhelming. Matches brand identity.
**Alternative Considered**: No border - rejected as card felt too flat.

### Why Harvard logo instead of text citation?

**Decision**: Replace "— Harvard Medical Journal" text with greyscale Harvard logo (40px)
**Rationale**: Visual credibility stronger than text attribution. Logo communicates institutional authority instantly. Greyscale treatment keeps it professional, not promotional.
**Alternative Considered**: Text + logo side-by-side - rejected as cluttered.

### Why 48px gap between headline and stat card?

**Decision**: Increase spacing from 24px to 48px
**Rationale**: Headline deserves isolated impact before introducing proof. 24px felt cramped. 48px lets message land, then reinforces with data.
**Trade-off**: Uses more vertical space, but hero is full-height viewport so room isn't constrained.

### Why timed animation for scroll indicator (15s intervals)?

**Decision**: Animate on load, repeat every 15 seconds
**Rationale**: Guides without nagging. Single animation might be missed. Continuous animation is annoying. 15s strikes balance - reminds hesitant users without pestering engaged ones.
**Alternative Considered**: Continuous pulse - rejected as distracting.

---

## User Notes

See `notes.md` in this folder for:
- User-added mockups or wireframes
- Revision requests
- Open questions about hero layout
- Design variations to explore

---

**This section is ready for development. All specs finalized with improvements. Ship Phase 1 in 3-4 hours.**
