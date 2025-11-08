# Validated UI Patterns

**Grows over time as design-agency approves new patterns.**

Each approved pattern enables instant Tier 1 validation for future uses.

---

## Hero: Two-Column Editorial

**Approved:** 2025-11-08 (Initial design-brief)
**Context:** Landing page hero section
**Design-Agency Review:** Approved - editorial layout establishes credibility

### Specifications

**Layout:**
- Grid: `lg:grid-cols-[1.2fr_0.8fr]` (asymmetric two-column)
- Gap: 48px desktop, 32px mobile
- Min-height: 85vh desktop, 75vh mobile
- Background: Cream (#F7F5ED)

**Left Column (Headline + CTA):**
- Max-width: 640px
- Spacing: 48px between headline and CTA

**Right Column (Harvard Card):**
- Max-width: 480px
- Border: 3px solid #30A46C
- Padding: 32px desktop, 24px mobile
- Shadow: `0 4px 0 #DCDCDC`

**Typography:**
- Headline: EB Garamond 80px desktop / 48px mobile, line-height 1.05
- CTA text: Lexend 18px, color #595959

**Spacing:**
- Section padding: 96px bottom desktop, 64px mobile
- Internal gaps: 48px (headline to CTA)

### Code Example

```tsx
<section className="relative min-h-[85vh] lg:min-h-[75vh] bg-[#F7F5ED] grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center px-6 lg:px-24 pt-24 pb-0 lg:pt-32 lg:pb-0">
  <div className="max-w-[640px] space-y-12">
    <h1 className="font-serif text-[48px] lg:text-[80px] leading-[1.05]">
      Structured phonics truly works!
    </h1>
    <div className="space-y-4">
      <p className="font-sans text-[18px] text-[#595959]">
        Designed for struggling readers.
      </p>
      <button className="bg-[#30A46C] text-white">
        Join the Waitlist
      </button>
    </div>
  </div>

  <div className="max-w-full lg:max-w-[480px]">
    <div className="border-[3px] border-[#30A46C] bg-white p-6 lg:p-8 rounded-lg shadow-[0_4px_0_#DCDCDC]">
      {/* Harvard stat card content */}
    </div>
  </div>
</section>
```

### Design Rationale

- **Asymmetric grid** creates editorial feel (not corporate)
- **1.2fr:0.8fr ratio** gives headline dominance while showcasing credibility
- **Cream background** provides warmth while maintaining professionalism
- **Green border on card** draws eye to Harvard validation without overwhelming

### Usage Guidelines

**Use when:**
- Hero section needs credibility signal (research, testimonials)
- Editorial feel appropriate for brand
- Two key messages need visual balance

**Don't use when:**
- Simple one-column hero sufficient
- No secondary content to showcase
- Mobile-first design (two-column complex on small screens)

---

## Features: Bullet List with Flashcard Demo

**Approved:** 2025-11-08 (Initial implementation)
**Context:** Features section showing Orton-Gillingham benefits
**Design-Agency Review:** Approved - clear hierarchy, visual interest

### Specifications

**Layout:**
- Grid: `lg:grid-cols-[1.2fr_0.8fr]` (matches hero ratio)
- Gap: 48-64px between columns
- Background: White (#FFFFFF)

**Left Column (Feature List):**
- Header: EB Garamond 48px desktop / 32px mobile
- Bullets: Green dot (28px) + Lexend 18-20px text
- Spacing: 32-48px between bullets

**Right Column (Demo Card):**
- Border: 3px solid #30A46C
- Max-width: 320px
- Aspect ratio: 4:5 (card proportion)
- Shadow: `0 4px 0 #DCDCDC`
- Internal padding: 32-40px

**Typography:**
- Section header: EB Garamond 48px, line-height 1.2
- Bullet text: Lexend 18-20px, line-height 1.6
- Green bullets: `•` character at 28px

### Code Example

```tsx
<section className="bg-white px-6 lg:px-24 py-24 lg:py-32">
  <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
    <div className="order-2 lg:order-1">
      <h2 className="font-serif font-bold text-[32px] lg:text-[48px] mb-8 lg:mb-12">
        What We Offer:
      </h2>

      <ul className="space-y-6 lg:space-y-8">
        <li className="flex gap-4">
          <span className="text-[#30A46C] text-[28px]">•</span>
          <p className="font-sans text-[18px] lg:text-[20px]">
            Built on proven Orton-Gillingham principles
          </p>
        </li>
        {/* More bullets */}
      </ul>
    </div>

    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
      <div className="relative w-full max-w-[280px] lg:max-w-[320px]">
        <div className="border-[3px] border-[#30A46C] bg-white rounded-2xl shadow-[0_4px_0_#DCDCDC] aspect-[4/5]">
          {/* Flashcard demo */}
        </div>
      </div>
    </div>
  </div>
</section>
```

### Design Rationale

- **Bullet list** simple, scannable (no decoration needed)
- **Green bullets** tie to brand color without overwhelming
- **32-48px spacing** creates comfortable reading rhythm
- **Flashcard demo** shows product without explaining

### Usage Guidelines

**Use when:**
- List of 3-5 key points
- Visual demo available to showcase
- Need scannable format

**Don't use when:**
- Long-form content (use paragraphs)
- More than 5 bullets (overwhelming)
- No visual component available

---

## CTA Button: 3D Pill with Shadow

**Approved:** 2025-11-08 (Initial design-brief)
**Context:** Primary action button across all sections
**Design-Agency Review:** Approved - playful 3D reinforces confidence

### Specifications

**Visual:**
- Border-radius: `rounded-full` (pill shape)
- Background: #30A46C
- Text color: #FFFFFF
- Shadow: `0 8px 0 #2A9461` (3D solid shadow)
- Padding: 20px vertical, 48px horizontal (desktop)
- Padding: 16px vertical, 32px horizontal (mobile)

**Typography:**
- Font: Lexend
- Size: 18px desktop, 16px mobile
- Weight: 600 (semibold)

**Interactions:**
- Hover: `scale(1.05)`, shadow increases to `0 12px 0`
- Active: translate down 6px, shadow reduces to `0 0px 0`
- Transition: 200ms ease

**Accessibility:**
- Min-width: 320px desktop, 280px mobile
- Min height: 60px (touch target)
- Focus: 3px outline #30A46C, 4px offset

### Code Example

```tsx
<button className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full transition-all duration-150 shadow-[0_6px_0_#2A9461] hover:shadow-[0_2px_0_#2A9461] hover:translate-y-[4px] active:translate-y-[6px] active:shadow-[0_0px_0_#2A9461]">
  Join the Waitlist
</button>
```

### Design Rationale

- **3D shadow** playful confidence (not corporate flat)
- **Pill shape** friendly, approachable
- **Green exclusive** clear action hierarchy
- **Press animation** satisfying tactile feedback

### Usage Guidelines

**Use when:**
- Primary action (one per section)
- Call to action (signup, join, get started)
- High-priority user flow

**Don't use when:**
- Secondary actions (use text links)
- Multiple buttons on screen (dilutes priority)
- Non-action context (navigation, etc.)

---

## Testimonials: Asymmetric Grid

**Approved:** 2025-11-08 (Current implementation)
**Context:** Social proof section with featured + supporting quotes
**Design-Agency Review:** Approved - editorial hierarchy

### Specifications

**Layout:**
- Grid: `lg:grid-cols-[1.5fr_1fr]` (asymmetric)
- Gap: 32-48px between cards
- Background: Cream (#F7F5ED)

**Featured Card (Left):**
- Border: 2px solid #30A46C
- Padding: 48px
- Quote: EB Garamond 28px italic
- Green accent on key phrase

**Supporting Cards (Right Stack):**
- Border: 2px solid #DCDCDC
- Padding: 32px
- Quote: EB Garamond 20px italic
- Stack vertically with 24-32px gap

### Code Example

```tsx
<section className="bg-[#F7F5ED] px-6 lg:px-24 py-24 lg:py-32">
  <h2 className="font-serif font-bold text-[40px] lg:text-[48px] text-center mb-16">
    What Parents Are Saying
  </h2>

  <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
    <div className="border-2 border-[#30A46C] bg-white p-12 rounded-lg">
      <blockquote className="font-serif text-[28px] leading-[1.4] mb-12">
        {/* Featured quote */}
      </blockquote>
      {/* Attribution */}
    </div>

    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="border-2 border-[#DCDCDC] bg-white p-8 rounded-lg">
        {/* Supporting quote 1 */}
      </div>
      <div className="border-2 border-[#DCDCDC] bg-white p-8 rounded-lg">
        {/* Supporting quote 2 */}
      </div>
    </div>
  </div>
</section>
```

### Design Rationale

- **1.5:1 ratio** creates clear featured testimonial
- **Green border** highlights most impactful quote
- **Stacked supporting** provides variety without overwhelming

### Usage Guidelines

**Use when:**
- 3+ testimonials available
- One quote clearly strongest
- Editorial feel appropriate

**Don't use when:**
- Only 1-2 quotes (use simpler layout)
- All quotes equal weight (use uniform grid)

---

## Learning Metrics

**Total Patterns Validated:** 5
**Patterns from Design-Brief:** 5 (initial)
**Patterns from Design-Agency:** 0 (will grow)

**Most Used Patterns:**
1. CTA Button (every section)
2. Hero Two-Column (1 usage)
3. Features Bullet List (1 usage)
4. Testimonials Asymmetric (1 usage)

**Next patterns to validate:**
- CTA Section (pending implementation)
- Science Section (pending implementation)
- Founder Section (pending implementation)
