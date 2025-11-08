# Hero Section - Design Brief

**Last Updated**: 2025-11-07
**Status**: Implemented - Editorial Two-Column Layout

---

## Purpose

Establish immediate credibility and value proposition within 3 seconds of landing. Combines clear messaging with immediate conversion path:
1. **Left column**: Value proposition + CTA ("What is this?" + "How do I get it?")
2. **Right column**: Social proof ("Why should I trust this?")

---

## Layout Architecture

### Two-Column Editorial Grid

**Decision**: Horizontal split instead of vertical stack
**Rationale**:
- Reduces scroll depth - CTA visible immediately without scrolling
- Creates visual balance - message and proof in parallel
- Differentiates from standard edu-tech single-column patterns
- Editorial layout conveys sophistication and authority

### Desktop (≥1024px)

```css
.hero-section {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr; /* Left column dominant */
  gap: 48px;
  align-items: center;
  background: #F7F5ED; /* Cream - warm entry */
  padding: 96px 96px; /* Desktop: 96px x/y */
  max-width: 1440px;
  margin: 0 auto;
}

.left-column {
  max-width: 640px;
  space-y: 48px; /* Headline to CTA gap */
}

.right-column {
  max-width: 480px;
  justify-self: end;
}
```

### Mobile (<1024px)

```css
.hero-section {
  min-height: 80vh;
  display: block; /* Stack vertically */
  padding: 96px 24px; /* Mobile: 24px horizontal */
}

/* Order: Headline → CTA → Stat Card → Scroll Indicator */
```

---

## Components

### 1. Headline with Decorative Underline

**Purpose**: Immediate value proposition with visual emphasis on "phonics"

**HTML Structure**:
```html
<h1 class="hero-headline">
  <span class="relative inline-block">
    <svg class="decorative-underline">
      <path d="M 5 12 Q 100 5, 200 12 T 395 12" stroke="#30A46C" />
    </svg>
    <span class="relative z-10">Structured phonics</span>
  </span>
  <em class="italic font-bold text-[#30A46C]">actually works!</em>
</h1>
```

**Styles**:
```css
.hero-headline {
  font-family: 'EB Garamond', serif;
  font-weight: 700;
  font-size: 80px;   /* Desktop */
  font-size: 64px;   /* Tablet ≥768px */
  font-size: 48px;   /* Mobile <768px */
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #1A1A1A;
}

.decorative-underline {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 16px;
  margin-top: -6px; /* Overlaps text slightly */
  pointer-events: none;
  z-index: -10; /* Behind text */
}

.decorative-underline path {
  stroke: #30A46C;
  stroke-width: 4px;
  stroke-linecap: round;
  fill: none;
}
```

**Content**:
- Primary text: "Structured phonics"
- Emphasized text: "actually works!" (italic, green)
- Green curvy underline beneath "Structured phonics"

**Design Decision**:
- **Why "actually works" instead of "just works"?** More emphatic. Acknowledges parent frustration ("other methods didn't work") and confidently asserts effectiveness.
- **Why curvy underline?** Adds warmth and personality without being childish. Hand-drawn aesthetic = human touch. Green accent = brand consistency.
- **Why split emphasis?** "Structured phonics" gets visual weight (underline), "actually works!" gets semantic emphasis (italic + color). Balanced hierarchy.

---

### 2. CTA Section

**Purpose**: Immediate conversion path with value-focused supporting text

**HTML Structure**:
```html
<div class="cta-section">
  <p class="cta-support-text">
    Help your child learn to read
  </p>
  <button class="btn-primary">
    Join the Waitlist
  </button>
</div>
```

**Styles**:
```css
.cta-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cta-support-text {
  font-family: 'Lexend', sans-serif;
  font-size: 16px;
  color: #595959;
}

.btn-primary {
  font-family: 'Lexend', sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 16px 48px;
  border-radius: 9999px; /* Pill */
  background: #30A46C;
  color: #FFFFFF;
  box-shadow: 0 6px 0 #2A9461; /* 3D effect */
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: #2A9461;
  transform: translateY(4px);
  box-shadow: 0 2px 0 #2A9461; /* Compressed shadow */
}

.btn-primary:active {
  transform: translateY(6px);
  box-shadow: 0 0px 0 #2A9461; /* Fully compressed */
}
```

**Content**:
- Support text: "Help your child learn to read" (value-focused, honest)
- Button text: "Join the Waitlist"

**Design Decisions**:
- **Why CTA in hero?** Editorial layout allows it without feeling aggressive. Parallel placement with stat card = balanced ask.
- **Why "Help your child learn to read" instead of social proof?** Honest messaging. No fake numbers. Focuses on parent goal, not artificial urgency.
- **Why 3D button shadow?** Matches Duolingo playbook - tactile, inviting, clear affordance. Green = go.

---

### 3. Harvard Stat Card

**Purpose**: Scientific credibility proof - establishes trust immediately

**HTML Structure**:
```html
<div class="stat-card">
  <!-- Stat number first - dominant visual element -->
  <p class="stat-number">50-90%</p>

  <!-- Explanatory text -->
  <p class="stat-text">
    of at-risk readers can reach grade level with targeted instruction
  </p>

  <!-- Harvard logo - citation at bottom -->
  <img
    src="/assets/harvard-logo-grey.png"
    alt="Harvard Medical School"
    class="harvard-logo"
  />
</div>
```

**Styles**:
```css
.stat-card {
  background: #FFFFFF;
  border: 3px solid #30A46C;
  border-radius: 8px; /* Subtle rounding */
  padding: 40px;
  box-shadow: 0 4px 0 #DCDCDC; /* 3D effect */
}

.stat-number {
  font-family: 'EB Garamond', serif;
  font-weight: 700;
  font-size: 80px;  /* Desktop */
  font-size: 64px;  /* Mobile */
  line-height: 1;
  color: #30A46C;
  margin-bottom: 24px;
}

.stat-text {
  font-family: 'Lexend', sans-serif;
  font-size: 22px;  /* Desktop */
  font-size: 20px;  /* Mobile */
  line-height: 1.5;
  color: #1A1A1A;
  margin-bottom: 24px;
  max-width: 400px;
}

.harvard-logo {
  width: auto;
  height: 80px;  /* Desktop */
  height: 64px;  /* Mobile */
  filter: grayscale(100%);
  opacity: 0.8;
}
```

**Content**:
- Stat: "50-90%"
- Explanation: "of at-risk readers can reach grade level with targeted instruction"
- Citation: Harvard Medical School logo (greyscale, bottom placement)

**Design Decisions**:
- **Why white background instead of cream?** Contrast against cream hero section. Makes card "pop" visually.
- **Why 3px border instead of 2px?** Stronger visual weight to match stat number emphasis. Bolder = more confident.
- **Why Harvard logo at bottom?** Attribution, not endorsement. Logo-first implies "Harvard says X". Stat-first, logo-last = "Research shows X (Harvard conducted it)". Honest hierarchy.
- **Why greyscale logo?** Professional, not promotional. Full-color would feel like sponsorship. Grey = academic citation.
- **Why full stat text with "targeted instruction"?** Critical qualifier. Without it, stat implies any instruction works. "Targeted instruction" = what Tutoria provides.

---

### 4. Scroll Indicator

**Purpose**: Guide users to explore content below without being intrusive

**HTML Structure**:
```html
<div class="scroll-indicator" aria-label="Scroll to continue">
  <svg class="chevron" viewBox="0 0 24 24">
    <path d="M6 9L12 15L18 9" stroke="#595959" />
  </svg>
</div>
```

**Styles**:
```css
.scroll-indicator {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
}

.chevron {
  width: 24px;
  height: 24px;
  stroke-width: 2px;
  stroke-linecap: round;
}

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
  animation: bounce 1s ease-in-out;
}
```

**JavaScript Behavior**:
```javascript
// Animate on load (2s delay), repeat every 15s
setTimeout(animateIndicator, 2000);
setInterval(animateIndicator, 15000);

// Hide after user scrolls 100px
if (window.scrollY > 100) setShowScrollIndicator(false);
```

**States**:
- Initial: Visible but static (2s delay before first animation)
- Animated: Bounce animation (1s duration)
- Hidden: Permanently hidden after scroll

**Accessibility**:
- `aria-label="Scroll to continue"` for screen readers
- Not keyboard-interactive (decorative only)

---

## Background Choice

**Decision**: Cream (#F7F5ED) hero background instead of white
**Rationale**:
- Creates warm, inviting first impression
- Differentiates hero from stark white
- Pattern becomes: Cream (hero) → Cream (testimonials) → White (future sections)
- Alternation still exists, just starts with cream

**Trade-off**: Original brief specified white hero with cream starting at section 02. This breaks that pattern but improves first impression warmth.

---

## Accessibility

**Completed**:
- [x] Semantic h1 for headline
- [x] Button has proper hover/active states
- [x] Harvard logo has descriptive alt text
- [x] Color contrast exceeds 4.5:1 (all text)
- [x] Touch targets exceed 44x44px (button)
- [x] Keyboard navigation flows logically (headline → button → stat card)
- [x] Scroll indicator has aria-label

**Phase 2**:
- [ ] Scroll indicator animation respects `prefers-reduced-motion`
- [ ] Add skip-to-content link
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)

---

## Edge Cases

### Mobile Landscape (480px-1024px, landscape)

**Problem**: 100vh on landscape causes awkward cropping

**Solution**:
```css
@media (max-width: 1024px) and (orientation: landscape) {
  .hero-section {
    min-height: 60vh;
  }
}
```

### Very Small Screens (<375px)

**Problem**: Text too large, button overflows

**Solution**:
```css
@media (max-width: 375px) {
  .hero-headline {
    font-size: 40px;
  }

  .stat-number {
    font-size: 56px;
  }

  .btn-primary {
    padding: 14px 32px;
    font-size: 16px;
  }
}
```

### SVG Underline Distortion

**Problem**: `preserveAspectRatio="none"` can distort curve on extreme aspect ratios

**Solution**: Already handled with relative positioning and z-index. Underline stretches proportionally to text width.

---

## Implementation Notes

### Current Status

**Completed**:
- ✅ Two-column editorial grid (desktop)
- ✅ Single-column stack (mobile)
- ✅ Headline with curvy underline decoration
- ✅ CTA button with 3D shadow effect
- ✅ Harvard stat card (stat-first hierarchy)
- ✅ Scroll indicator with timed animation
- ✅ All copy finalized
- ✅ Responsive breakpoints working

**Time Invested**: ~4-5 hours

### Dependencies

**Assets Required**:
- harvard-logo-grey.png (greyscale PNG, min 160px height for retina)
- EB Garamond font (Bold 700)
- Lexend font (Regular 400, Semibold 600)

**External**:
- None (self-contained section)

**Technical**:
- Next.js Image component for Harvard logo
- Vanilla JavaScript for scroll indicator timing
- Tailwind CSS utilities (inline styles)

---

## Design Decisions Log

### Why Two-Column Editorial Layout?

**Decision**: Horizontal split (left: message/CTA, right: proof) instead of vertical stack
**Rationale**:
- **Reduces scroll requirement**: CTA visible immediately without scrolling past hero
- **Balanced visual hierarchy**: Message and proof receive equal visual weight
- **Sophisticated positioning**: Editorial layouts convey authority (think NYT, Medium)
- **Differentiation**: Most edu-tech uses center-stacked. This stands out.
**Trade-off**: Requires wider viewports to work well. Mobile must stack carefully.

### Why "Actually Works" Instead of "Just Works"?

**Decision**: "actually works!" with italic emphasis
**Rationale**:
- **Acknowledges frustration**: Parents have likely tried other methods that failed
- **Confident assertion**: "Actually" is more emphatic than "just"
- **Emotional resonance**: "Just works" feels casual. "Actually works" feels validating.
**Alternative Considered**: "Just works" (original) - rejected as too passive.

### Why CTA in Hero Section?

**Decision**: Place "Join the Waitlist" button in hero left column
**Rationale**:
- **Editorial layout enables it**: Two-column creates space for parallel CTA + proof
- **Immediate conversion path**: Users who immediately trust can convert without scrolling
- **Not aggressive**: Balanced with stat card = invitation, not hard sell
**Alternative Considered**: Keep CTA in dedicated section 04 - rejected as missed opportunity with editorial layout.

### Why Harvard Logo at Bottom?

**Decision**: Stat number → text → logo (not logo-first)
**Rationale**:
- **Attribution not endorsement**: Logo-first implies "Harvard says this". Stat-first = "Research shows this (Harvard studied it)"
- **Visual hierarchy**: Green number dominates, then explanation, then citation
- **Honesty**: Harvard researched the data, they don't endorse Tutoria specifically
**Alternative Considered**: Logo at top - rejected as misleading.

### Why Cream Background?

**Decision**: #F7F5ED cream instead of white
**Rationale**:
- **Warm first impression**: Cream feels inviting, white feels clinical
- **Visual separation**: Creates section boundary without harsh divider
- **Brand consistency**: Cream used throughout app for warmth
**Trade-off**: Breaks original pattern (white hero → cream section 02), but improves entry.

### Why 3D Button Shadow?

**Decision**: `box-shadow: 0 6px 0 #2A9461` with hover translation
**Rationale**:
- **Duolingo-style affordance**: Clear tactile feedback = high engagement
- **Playful without childish**: 3D effect adds personality appropriate for parents (not kids)
- **Green = go**: Shadow reinforces action color
**Alternative Considered**: Flat button with subtle shadow - rejected as less engaging.

---

## User Notes

See `notes.md` in this folder for:
- User-added mockups or wireframes
- Revision requests
- Open questions about hero layout
- Design variations to explore

---

**Section Status**: ✅ Implemented and validated. Editorial two-column layout approved.
