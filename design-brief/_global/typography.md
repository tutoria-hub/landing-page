# Typography System

**Decision Date**: October 2025
**Status**: Active
**Rationale**: Visual cohesion and rounded friendliness for UI, with specialized dyslexia support for learning content

---

## Current System: Nunito + OpenDyslexic

### Font Stack

```css
Nunito Bold 700     → Headers, section titles, module names
Nunito Regular 400  → UI text, body copy, descriptions
OpenDyslexic        → Learning content (activity cards only)
```

### Implementation

```typescript
// tailwind.config.ts
fontFamily: {
  heading: ['Nunito', 'sans-serif'],    // Bold 700 weight
  body: ['Nunito', 'sans-serif'],       // Regular 400 weight
  learning: ['OpenDyslexic', 'sans-serif'],
}
```

---

## Why Nunito?

### Design Rationale

**1. Visual Cohesion**
- Single font family creates a professional, unified system
- Weight variations (700 vs 400) provide clear hierarchy
- Eliminates stylistic clash between playful headers and neutral UI

**2. Rounded Friendliness**
- Rounded terminals match Duolingo's approachable aesthetic
- Softer than Lexend's geometric neutrality
- Less clinical, more welcoming for anxious learners

**3. Education-Focused**
- Used by 3.7M+ education websites
- Specifically designed for young readers
- Proven track record in learning contexts

**4. Professional Polish**
- More polished than Londrina Solid's DIY aesthetic
- Maintains warmth without appearing homemade
- Builds parent trust through modern design

---

## Comparison: Previous System

### Old Stack (Londrina Solid + Lexend + OpenDyslexic)

**Strengths:**
- ✅ Lexend has scientific dyslexia research backing
- ✅ Londrina Solid was memorable and unique
- ✅ Clear font separation for context-specific use

**Weaknesses:**
- ❌ Three stylistically different fonts lacked cohesion
- ❌ Londrina Solid could feel "homemade" or remedial
- ❌ Lexend's neutrality lacked warmth
- ❌ Inconsistent personality across the interface

### New Stack (Nunito + OpenDyslexic)

**Strengths:**
- ✅ Unified font family creates professional consistency
- ✅ Rounded warmth throughout the interface
- ✅ Simplified system (2 fonts vs 3)
- ✅ More approachable for young learners

**Trade-offs:**
- ⚠️ Lost Lexend's scientific dyslexia optimization
- ⚠️ Lost Londrina Solid's unique personality
- ⚠️ Nunito has no published dyslexia research

---

## Duolingo Comparison

### Duolingo's System

```
Feather Bold (custom)     → Brand headlines
DIN Next Rounded/Nunito   → Secondary UI
Open Sans                 → Body text, learning content
```

**Philosophy:**
- WCAG accessibility standards
- High contrast ratios
- Generous x-height
- "Dyslexia-friendly reading patterns"
- Custom brand investment (Feather)

### Tutoria's System

```
Nunito Bold 700           → Headers
Nunito Regular 400        → UI text
OpenDyslexic              → Learning content
```

**Philosophy:**
- Visual cohesion through single family
- Specialized dyslexia font for learning moments
- Rounded friendliness throughout
- Strategic font separation (UI vs learning)

### What Tutoria Does Better

1. **Specialized Dyslexia Font**
   - Tutoria: OpenDyslexic (research-backed, weighted bottoms)
   - Duolingo: Open Sans (general readability)

2. **Strategic Separation**
   - Tutoria: Reserves OpenDyslexic for high-stakes learning moments
   - Duolingo: Uses Open Sans everywhere

3. **Context-Specific Optimization**
   - Tutoria: UI can be polished, learning gets specialized support
   - Duolingo: One font for all content types

### What Duolingo Does Better

1. **Custom Brand Font**
   - Duolingo: Unique Feather typeface (owl wing-inspired)
   - Tutoria: Open-source Nunito

2. **Brand Recognition**
   - Duolingo: Instantly recognizable custom typography
   - Tutoria: Common education font (less unique)

---

## Typography Hierarchy

### Font Weights

```css
/* Nunito System */
font-weight: 700  → Headers (heading-hero, heading-section)
font-weight: 400  → Body text (text-body, UI elements)

/* OpenDyslexic System */
font-weight: 400  → Learning content (text-learning)
font-weight: 700  → Emphasized learning content
```

### Size Scale

```css
/* Headers - Nunito Bold 700 */
text-7xl (72px)    → Hero headers (.heading-hero)
text-5xl (48px)    → Section headers (.heading-section)
text-3xl (30px)    → Module titles
text-2xl (24px)    → Card headers

/* UI Text - Nunito Regular 400 */
text-lg (18px)     → Comfortable reading
text-base (16px)   → Minimum body text
text-sm (14px)     → Labels (use sparingly)

/* Learning Content - OpenDyslexic */
text-lg (18px)     → Primary learning size
text-2xl (24px)    → Pronunciation practice
```

### Usage Classes

```css
/* Headers */
.heading-hero      → Nunito Bold 700, text-7xl
.heading-section   → Nunito Bold 700, text-5xl

/* Body */
.text-body         → Nunito Regular 400, text-base

/* Learning */
.text-learning     → OpenDyslexic Regular, text-base
```

---

## Implementation Guidelines

### When to Use Each Font

**Nunito Bold 700:**
- Page titles ("Today's Mission", "Module Progress")
- Stage names ("Foundation Phonemes", "Blend Mastery")
- Module titles ("Module 1a: Short Vowels")
- Section headers within pages
- Call-to-action button text

**Nunito Regular 400:**
- Body paragraphs
- Descriptions and instructions
- UI labels and hints
- Navigation text
- Form inputs
- Metadata (word counts, session progress)

**OpenDyslexic:**
- Activity card content (words/phrases to pronounce)
- IPA transcriptions
- Pronunciation feedback text
- Learning exercise instructions inside activity cards

### Component Examples

```tsx
/* Page Header */
<h1 className="heading-hero">
  Welcome to Tutoria
</h1>

/* Section Header */
<h2 className="heading-section">
  Module 1a: Short Vowels
</h2>

/* Body Text */
<p className="text-body text-lg">
  Practice pronouncing these words carefully.
</p>

/* Learning Content */
<Card className="activity-card">
  <p className="text-learning text-2xl">
    cat
  </p>
  <p className="text-learning text-sm text-muted-foreground">
    /kæt/
  </p>
</Card>

/* Button */
<Button className="rounded-full px-6 py-3 font-bold">
  Start Practice
</Button>
```

---

## Accessibility Considerations

### Current Strengths

1. **OpenDyslexic for Learning**
   - Weighted bottoms prevent letter confusion
   - Unique character shapes reduce b/d/p/q errors
   - Specifically designed for dyslexic readers

2. **Nunito Readability**
   - Clear letter distinction
   - Generous x-height
   - Rounded terminals reduce visual stress
   - Open counters (inside letters) prevent closure

3. **Consistent Hierarchy**
   - Weight contrast (700 vs 400) creates clear structure
   - Size scale provides visual organization
   - Predictable patterns reduce cognitive load

### Current Limitations

1. **No Published Research**
   - Nunito lacks Lexend's scientific backing
   - No formal studies on dyslexia readability
   - Relying on design patterns vs. evidence

2. **Generic Education Font**
   - Widely used = less distinctive
   - No unique brand personality
   - May not signal "specialized dyslexia platform"

---

## Future Considerations

### Lexend for Reading Exercises

**Rationale:**
- Lexend has proven reading speed improvements
- Scientific research backing for dyslexic readers
- Could be valuable for extended reading activities

**Potential Use Cases:**
- Story reading exercises
- Passage comprehension activities
- Extended text-based learning modules
- Parent dashboard instructions

**Implementation:**
```css
/* Future addition */
font-story: ['Lexend', 'sans-serif'];  /* For reading exercises */
```

**Decision Point:**
- Test Nunito with dyslexic kids first
- Measure engagement and reading comfort
- Consider adding Lexend if Nunito shows limitations in extended reading

### Font Toggle Feature

**Idea:**
- Let families choose between OpenDyslexic and Lexend for activity cards
- Profile-level preference setting
- A/B test with real users

**Benefits:**
- Personalization for different learning styles
- Some kids prefer OpenDyslexic, others find it distracting
- Empowers families to choose what works

**Implementation Complexity:**
- Requires user preference storage
- Dynamic class switching
- Testing across all components

---

## Migration Notes

### From Londrina Solid + Lexend → Nunito

**Files to Update:**
1. `/src/app/globals.css` - Font imports and @font-face declarations
2. `/tailwind.config.ts` - Font family configuration
3. All CSS classes using `font-heading` or `font-body`
4. Component hardcoded font-family references

**Breaking Changes:**
- None (Tailwind classes remain the same)
- Only internal font references change

**Font Files:**
- Add: `/public/fonts/Nunito/Nunito-Regular.ttf`
- Add: `/public/fonts/Nunito/Nunito-Bold.ttf`
- Remove: Londrina Solid TTF files (optional cleanup)
- Remove: Lexend TTF files (optional cleanup)

---

## Typography Testing Checklist

Before finalizing the Nunito system:

- [ ] Test Nunito with dyslexic children (ages 6-12)
- [ ] Compare reading comfort vs previous Lexend system
- [ ] Measure engagement with new header style
- [ ] Verify WCAG AA contrast ratios across all sizes
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Validate focus indicators with Nunito font
- [ ] Check header hierarchy clarity (Bold 700 vs Regular 400)
- [ ] Ensure OpenDyslexic still feels appropriate for learning moments

---

## Design Decisions Log

### Why Move Away from Londrina Solid?

**Problems:**
- Could feel "homemade" or remedial to parents
- Playful style sometimes clashed with professional UI
- Limited weight options (Light 300, Regular 400)
- Inconsistent with body font personality

**Decision:**
- Nunito Bold provides warmth without looking DIY
- More professional while maintaining friendliness
- Better cohesion with body font

### Why Move Away from Lexend?

**Problems:**
- Neutral, clinical aesthetic
- Lacked warmth for anxious learners
- Geometric without being friendly
- Stylistic clash with Londrina Solid headers

**Decision:**
- **Trade scientific optimization for emotional appeal** (for now)
- Nunito's rounded friendliness may reduce anxiety more than Lexend's spacing helps
- Can reintroduce Lexend for reading exercises if needed

**Risk Accepted:**
- Lost marketing angle: "Scientifically proven fonts"
- Lost research-backed dyslexia optimization
- Betting on visual cohesion > technical optimization

---

## Summary

### The Nunito System Philosophy

**Unified, Warm, and Strategic**

1. **Unified:** One font family (Nunito) for all UI creates professional consistency
2. **Warm:** Rounded terminals throughout reduce intimidation for young learners
3. **Strategic:** Reserve specialized font (OpenDyslexic) for high-stakes learning moments

### Trade-offs Made

**Gained:**
- Visual cohesion and professional polish
- Rounded friendliness matching Duolingo's proven patterns
- Simplified design system (2 fonts instead of 3)

**Lost:**
- Lexend's scientific dyslexia research
- Londrina Solid's unique personality
- Marketing angle around "evidence-based fonts"

### When to Revisit

- If user testing shows Nunito hinders readability
- If parents ask about dyslexia-optimized fonts
- When adding extended reading exercises (consider Lexend)
- If brand needs more unique personality (consider custom font)

---

*Current system prioritizes visual cohesion and emotional appeal over scientific optimization. Future iterations may reintroduce Lexend for reading-heavy features.*
