# Tutoria Landing Page: Master Design Brief

**Last Updated**: 2025-11-08
**Status**: Phase 1 Complete - All Core Sections Implemented ✅

**Current Implementation**:
- ✅ Hero section (editorial two-column, Harvard stat card, mixed headline colors)
- ✅ Transition quote
- ✅ Video demo (placeholder state)
- ✅ Features section (flashcard demo, 3 value props)
- ✅ CTA section (waitlist + demo request)
- ✅ Science section (brain plasticity research)
- ✅ Founder section (placeholder photos with initials)
- ✅ Testimonials section (positioned after Founder)
- ✅ **Wave dividers** (geometric sound wave transitions between all sections)
- ✅ **Notebook backgrounds** (lined paper + grain texture on Features & CTA sections)

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
- Subtle cream (#F7F5ED) / soft green (#F5FAF7) section alternation - three-color rhythm
- **Geometric wave dividers** - subtle 24px sound wave transitions (phonics metaphor)
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
.section-soft-green { background: #F5FAF7; } /* Subtle green tint for rhythm */

/* Three-Color Pattern with Wave Transitions:
   Hero (cream) ~wave~ Video (soft green) ~wave~ Features (white) ~wave~
   CTA (cream) ~wave~ Science (soft green) ~wave~ Testimonials (white) ~wave~ Founder (cream)
*/

/* Notebook Background Effects - Editorial Paper Texture */
.notebook-white {
  background-color: #FFFFFF;
  background-image:
    linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),  /* Horizontal lines */
    radial-gradient(circle at 2px 2px, rgba(0,0,0,0.008) 1px, transparent 1px); /* Grain */
  background-size: 100% 24px, 4px 4px; /* Lines every 24px, fine grain pattern */
}

.notebook-beige {
  background-color: #F7F5ED; /* Warm cream */
  background-image:
    linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
    radial-gradient(circle at 2px 2px, rgba(0,0,0,0.008) 1px, transparent 1px);
  background-size: 100% 24px, 4px 4px;
}

/* Applied to:
   - Features section ("What We Offer"): notebook-white
   - CTA section ("For Who"): notebook-beige

   Design Philosophy:
   - Horizontal lines at 1.5% opacity = subtle notebook ruling (24px spacing)
   - Grain texture at 0.8% opacity = paper feel (4px dots)
   - Pure CSS = zero image assets, zero HTTP requests
   - Editorial polish without distraction
   - Inspired by tutoria-webapp's environmental layer
*/
```

### Wave Divider Component

```tsx
// Geometric sine wave transitions between sections (24px height)
const WaveDivider = ({ fromColor, toColor }) => (
  <div className="w-full relative" style={{ backgroundColor: toColor }} aria-hidden="true">
    <svg viewBox="0 0 1440 24" className="w-full h-[24px]" preserveAspectRatio="none">
      <path d="M0,0 L0,12 Q180,0 360,12 T720,12 T1080,12 T1440,12 L1440,0 Z" fill={fromColor} />
    </svg>
  </div>
);

// Usage: <WaveDivider fromColor="#F7F5ED" toColor="#F5FAF7" />
```

**Design Philosophy**:
- Educational metaphor: Phonics = Sound Waves (structured, geometric)
- 24px height = subtle presence (warmth through restraint)
- Responsive SVG scales perfectly (mobile to ultrawide)
- Zero performance impact (pure SVG, no animations)
- Accessibility: `aria-hidden="true"` (decorative element)

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
--bg-soft-green: #F5FAF7; /* Subtle green tint - creates three-color rhythm */
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

### Geometric Wave Dividers Between Sections
**Decision**: 24px subtle sine wave transitions between all sections (not flat breaks, not bold organic curves)
**Rationale**:
- **Educational Metaphor**: Phonics = sound waves. Visual alignment with product purpose.
- **Structured Playfulness**: Geometric (mathematical) curves maintain scholarly positioning while adding warmth.
- **Context-Appropriate Inspiration**: WisprFlow uses organic curves for "voice flow" (human). We use geometric waves for "structured phonics" (patterns, rules). Same principle, different execution.
- **Warmth Through Restraint**: 24px height = subtle presence. Adds flow without dominating.
- **Three-Color Rhythm**: Cream/Soft Green/White alternation with wave transitions prevents scroll fatigue on long pages.
- **Performance**: Pure SVG, zero animations, instant render, fully responsive.
**Trade-off**: Could be invisible on some screens if contrast is too low. Intentional - subconscious rhythm > overt decoration.
**Validation**: 10/10 - Enhances visual flow without overwhelming. Matches "Trust through clarity, warmth through restraint."

### Notebook Backgrounds (Lined Paper + Grain Texture)
**Decision**: Apply subtle lined paper effect with grain texture to Features ("What We Offer") and CTA ("For Who") sections only
**Rationale**:
- **Editorial Polish**: Adds sophisticated paper texture without distracting from content
- **Visual Hierarchy**: Differentiates key value proposition sections from hero/testimonials
- **Webapp Cohesion**: Mirrors tutoria-webapp's environmental notebook background - creates brand consistency
- **Restrained Implementation**: 1.5% opacity lines + 0.8% opacity grain = barely perceptible but adds warmth
- **Pure CSS Performance**: Zero image assets, zero HTTP requests - entire effect via linear/radial gradients
- **24px Line Spacing**: Matches wave divider height - reinforces geometric consistency throughout design
**Trade-off**: Too subtle = invisible on some displays. Intentional - subconscious polish > overt texture.
**Validation**: Fantastic - Adds editorial sophistication that complements EB Garamond's scholarly positioning. Warmth through restraint achieved.

### Anti-Patterns to Reject (Prevent Design Convergence)

**Purpose**: Block drift toward generic SaaS aesthetics. Maintain intentional positioning.

**Typography Convergence:**
- ❌ Inter/Helvetica drift → ✅ EB Garamond (literary authority)
- ❌ Rounded sans (Nunito/Poppins) → ✅ Lexend (geometric clarity)
- **Why banned**: Generic LLM defaults undermine scholarly positioning

**Color Convergence:**
- ❌ Blue CTAs → ✅ Green #30A46C (growth/phonics metaphor)
- ❌ Gradient backgrounds → ✅ Solid cream/white/soft-green
- ❌ Purple accents → ✅ Green reserved for CTAs only
- **Why banned**: SaaS clichés lack brand differentiation

**Animation Convergence:**
- ❌ Light rays, word rotate → ✅ Geometric waves only
- ❌ Excessive blur-fade → ✅ 2-3 strategic highlights max
- ❌ Scattered micro-interactions → ✅ Orchestrated moments (flashcard demo)
- **Why banned**: Gimmicky effects violate "warmth through restraint"

**Layout Convergence:**
- ❌ Bento Grid overuse → ✅ Two-column editorial priority
- ❌ Flat bullet lists → ✅ Card layouts (Duolingo test)
- ❌ Centered hero → ✅ Asymmetric editorial grid (1.2:0.8)
- **Why banned**: Predictable layouts lack context-specific character

**Agent enforcement**: Read this section before UI changes to block convergence automatically.

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

## Component Quality Checklist

### Visual Validation
- [ ] ShinyButton shimmer effect visible on CTAs
- [ ] BlurFade animations smooth on scroll
- [ ] Highlighter green underlines appear correctly
- [ ] Bento Grid cards responsive (mobile/tablet/desktop)
- [ ] Card borders 2px solid (#30A46C green, #DCDCDC gray)
- [ ] Typography scales correctly (16-32px range)

### Interaction Validation
- [ ] CTA buttons clickable with shine effect
- [ ] Scroll animations trigger once per section
- [ ] Highlighter animations complete (~600ms)
- [ ] Cards maintain spacing on all breakpoints

### Accessibility Validation
- [ ] Focus states visible on ShinyButton
- [ ] Highlighter doesn't break screen readers
- [ ] BlurFade doesn't cause motion sickness (respects prefers-reduced-motion)
- [ ] Card hierarchy clear for keyboard navigation

### Performance Validation
- [ ] Page loads in <3 seconds
- [ ] No layout shift from lazy animations
- [ ] No console errors
- [ ] Lighthouse score maintained (>90)

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
