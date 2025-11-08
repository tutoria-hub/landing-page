# Tutoria Landing Page: Master Design Brief

**Last Updated**: 2025-11-08
**Status**: Phase 1 Complete - All Core Sections Implemented ✅

**Current Implementation**:
- ✅ Hero section (editorial two-column, Harvard stat card)
- ✅ Transition quote
- ✅ Video demo (placeholder state)
- ✅ Features section (flashcard demo, 3 value props)
- ✅ CTA section (waitlist + demo request)
- ✅ Science section (brain plasticity research)
- ✅ Founder section (placeholder photos with initials)
- ⚠️ Testimonials section (implemented - positioned after Founder)

**Ready for Validation**: Complete conversion funnel live at localhost:3000

**Phase 2 Priorities**:
- Replace founder placeholders with real photos + names + story
- Replace video placeholder with actual demo
- Review testimonials positioning (currently after Founder)
- Remove hero typing animation (optional simplification)
- Remove scroll indicator animation (optional simplification)

---

## Design Vision

**Trust through clarity, warmth through restraint.**

Tutoria's landing page communicates scientific credibility (Harvard research, Orton-Gillingham methodology) while remaining emotionally accessible to anxious parents. EB Garamond's classical scholarship establishes literary expertise - appropriate for a reading platform. Lexend's geometric precision ensures modern accessibility. Green accent signals growth. Every section answers: "Why should I trust you with my struggling child?"

**Visual Direction**:
- 96px EB Garamond hero - classical scholarship for literacy platform
- Lexend body text - geometric clarity, modern accessibility
- Generous whitespace (96px vertical gaps) - information breathes
- Green (#30A46C) reserved for CTAs only - clear action hierarchy
- Subtle cream (#F7F5ED) section alternation - rhythm without notebook cosplay
- Two-column layouts (desktop) → single-column (mobile)

---

## Global Specifications

### Layout Grid

```css
.page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px; /* Mobile */
  padding: 0 48px; /* Desktop ≥1024px */
}

.section {
  margin-bottom: 96px; /* Desktop */
  margin-bottom: 64px; /* Mobile */
}
```

### Background System

```css
.section-white { background: #FFFFFF; }
.section-cream { background: #F7F5ED; }

/* Pattern: Hero (white) → Video (cream) → Features (white) → CTA (cream) → Science (white) → Founder (cream) */
```

### Responsive Breakpoints

```css
sm: 640px;   /* Mobile landscape */
md: 768px;   /* Tablet */
lg: 1024px;  /* Desktop - PRIMARY breakpoint */
xl: 1280px;  /* Large desktop */
```

---

## Typography Scale

```css
/* Headers - EB Garamond (Classical Serif) */
.hero-headline {
  font-family: 'EB Garamond', serif;
  font-weight: 700;
  font-size: 96px;    /* Desktop */
  font-size: 48px;    /* Mobile ≤1024px */
  line-height: 1.1;
  letter-spacing: -0.01em; /* Tighter tracking for display serif */
}

.section-header {
  font-family: 'EB Garamond', serif;
  font-weight: 700;
  font-size: 48px;    /* Desktop */
  font-size: 32px;    /* Mobile */
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* Body - Lexend (Geometric Sans-Serif) */
.body-large {
  font-family: 'Lexend', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.6;
}

.body-standard {
  font-family: 'Lexend', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6;
}

.citation {
  font-family: 'Lexend', sans-serif;
  font-weight: 400;
  font-size: 16px;
  font-style: italic;
  color: #595959;
}
```

---

## Color System

```css
/* Primary Action */
--cta-background: #30A46C;
--cta-hover: #2A9461;
--cta-text: #FFFFFF;

/* Text Hierarchy */
--text-primary: #1A1A1A;
--text-secondary: #595959;

/* Backgrounds */
--bg-white: #FFFFFF;
--bg-cream: #F7F5ED;
```

---

## CTA Button Component

```css
.btn-primary {
  /* Desktop */
  font-family: 'Lexend', sans-serif;
  padding: 20px 48px;
  font-size: 18px;
  font-weight: 600; /* Semibold for buttons */
  border-radius: 9999px; /* Pill */
  background: #30A46C;
  color: #FFFFFF;
  min-width: 320px;
  box-shadow: 0 8px 0 #2A9461; /* 3D solid shadow */
  transition: all 200ms ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 0 #2A9461;
}

.btn-primary:focus-visible {
  outline: 3px solid #30A46C;
  outline-offset: 4px;
}

/* Mobile ≤1024px */
.btn-primary {
  padding: 16px 32px;
  font-size: 16px;
  min-width: 280px;
}
```

---

## Accessibility Standards

```css
/* Focus Indicators */
*:focus-visible {
  outline: 3px solid #30A46C;
  outline-offset: 4px;
}
```

**Requirements**:
- All images have descriptive alt text
- Video includes captions/transcript
- CTA buttons have aria-label
- Heading hierarchy proper (h1 → h2 → h3)
- Color contrast minimum 4.5:1
- Touch targets minimum 44x44px
- Keyboard navigation flows logically

---

## Implementation Phases

### Phase 1: Ship First (Week 1)

**Critical Path**:
1. Hero section (logo, headline, Harvard stat)
2. CTA section with functional waitlist (mailto acceptable)
3. "What We Offer" text (flashcard demo static)
4. Basic responsive layout
5. All text finalized

**Acceptable Compromises**:
- Video shows placeholder
- Founder uses placeholder photos
- No animations
- Basic hover states

**Goal**: Functional landing page that captures emails.

### Phase 2: Polish (Week 2)

**Enhancements**:
1. Testimonials section (after Founder - social proof follows methodology)
2. Video demo embed (replace placeholder)
3. Animated flashcard demo
4. Founder photos + story
5. Hover states, micro-interactions
6. Performance optimization

**Goal**: Professional polish, smooth interactions, conversion optimization.

### Phase 3: Ideal State (Future)

1. Interactive flashcard demo
2. Testimonial section
3. FAQ section
4. A/B testing variations
5. Analytics tracking

**Goal**: Conversion optimization based on data.

---

## Key Design Decisions

### White Background for Landing Page
**Decision**: Clean white with subtle cream alternation
**Rationale**: "Notebook warmth" serves learning app. Landing page serves anxious parents seeking credibility.

### 96px Hero Headline
**Decision**: Custom large size for hero
**Rationale**: "Structured phonics that just works!" deserves commanding presence. 72px too timid.

### Green Reserved for CTAs Only
**Decision**: #30A46C exclusively for action elements
**Rationale**: Every green element drives toward waitlist signup. Clarity > decoration.

### No OpenDyslexic on Landing Page
**Decision**: EB Garamond + Lexend for marketing copy
**Rationale**: OpenDyslexic reserved for learning content. Landing targets parents, not dyslexic children.
**Exception**: Shown in flashcard demo visual (showcases specialized font).

### EB Garamond + Lexend Over Rounded Sans-Serif
**Decision**: Classical serif + geometric sans instead of friendly rounded fonts (Nunito/Poppins/etc)
**Rationale**:
- **Scholarly Authority**: EB Garamond's classical proportions convey academic sophistication - appropriate for a reading/literacy platform rooted in research
- **Literary Heritage**: Garamond has centuries of use in books and scholarship. Reinforces that Tutoria is about serious reading instruction, not gamified fluff.
- **Differentiation**: Edu-tech market saturated with rounded, "friendly" sans-serifs (Quicksand, Nunito, Comic Sans derivatives). Classical serif signals premium quality.
- **Credibility**: Parents trust expertise. Premium typography = premium education. EB Garamond = timeless educational authority.
- **Modern Accessibility**: Lexend for body text provides geometric clarity and legibility while avoiding the "childish" trap of rounded fonts.
**Trade-off**: Serif may feel less "warm" than rounded sans, but gains authority, uniqueness, and literary appropriateness.

---

## Quality Standards

### The Duolingo Test
- [ ] 16px border-radius for cards (rounded-xl)
- [ ] 2px borders where applicable
- [ ] Pills for buttons (rounded-full)
- [ ] 200ms transitions

### The Tutoria Test
- [ ] Minimum 16px font size
- [ ] 4.5:1 contrast minimum
- [ ] Green for success/action
- [ ] EB Garamond headers, Lexend body, OpenDyslexic in demos

### The Pieter Levels Test
- [ ] Ships in 5 days maximum
- [ ] Uses existing Tailwind utilities
- [ ] Minimal custom CSS
- [ ] Functional > perfect

---

## UI Validation Metrics

**Auto-updated by ui-validator skill** - Tracks self-learning progress

### Performance Statistics

**Total Validations:** 0 (baseline)
**Total Time Saved:** 0 minutes (vs manual screenshot workflow)

**Tier Distribution:**
- Tier 1 (Instant): 0 validations | 0% success rate
- Tier 2 (Screenshot): 0 validations | 0% of total
- Tier 3 (Critique): 0 validations | 0% of total

**Average Validation Time:** 0s (target: <1s by Week 4)

### Learning Progress

**Patterns Learned:** 5 (from initial design-brief)
- Hero: Two-Column Editorial ✓
- Features: Bullet List with Demo ✓
- CTA Button: 3D Pill ✓
- Testimonials: Asymmetric Grid ✓
- Typography Scale: EB Garamond + Lexend ✓

**Auto-Fixes Applied:** 0 (baseline)

**Most Common Issues:** (will populate over time)
1. [None yet]
2. [None yet]
3. [None yet]

### Quality Improvements

**Accessibility Fixes:** 0
**Contrast Issues Prevented:** 0
**Spacing Corrections:** 0
**Typography Fixes:** 0

### Trend Analysis

**Week 1 Target:** 50% Tier 1 success
**Week 4 Target:** 95% Tier 1 success
**Week 12 Target:** 99% Tier 1 success

**Current Week:** 0 (baseline established)
**Projected Improvement:** System learns with each Tier 3 critique

### Validated Patterns Repository

See: `.claude/skills/ui-validator/knowledge/validated-patterns.md`

**Pattern Categories:**
- Layout patterns: 4
- Typography patterns: 1
- Color usage patterns: 1
- Component patterns: 1

**Last Pattern Added:** Hero Two-Column Editorial (2025-11-08)
**Next Pattern Target:** CTA Section (pending implementation)

### Time Savings Calculation

**Manual workflow:** 45s per check
- Take 3 screenshots: 15s
- Paste and organize: 10s
- /design-agency analysis: 15s
- Read and fix: 5s

**With ui-validator (mature):**
- Tier 1 pass: 1s (98% of checks)
- Tier 2 screenshot: 3s (1.5% of checks)
- Tier 3 critique: 15s (0.5% of checks)

**Average: 1.2s per check** (after Week 4)

**Projected savings:** 43.8s per validation × validations per week = time saved

---

## Files & Assets

**Global Assets** (`_global/`):
- tutoria-logo.png (480px min width)
- design-principles.md (full system)
- typography.md (EB Garamond + Lexend system)
- wireframe_and_text.md (finalized copy)

**Section Structure**:
- `0X-[section]/README.md` - Implementation specs (created iteratively)
- `0X-[section]/assets/` - User mockups/images
- `0X-[section]/notes.md` - User requests/context

---

**Ship hero section first. Validate with user. Iterate. Then create remaining sections one by one with feedback rounds.**
