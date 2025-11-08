---
description: "Deep teardown of best-in-class landing page sections - strategic learning"
argument-hint: "[reference-url] [section-name]"
model: claude-sonnet-4-5
disable-model-invocation: true
---

# Reference Landing Page Teardown

**Purpose:** Study best-in-class landing pages to extract design principles and strategic insights.

**Not for:** Code comparisons or implementation details. Use `/landing-page:ui-check` for that.

---

## Arguments

**Required:**
- `reference-url`: URL to analyze (e.g., `https://stripe.com`, `https://linear.app`)
- `section-name`: Section to study (e.g., `hero`, `pricing`, `features`, `cta`)

**Examples:**
```bash
/landing-page:compare https://stripe.com hero
/landing-page:compare https://linear.app pricing
/landing-page:compare https://cal.com features
```

---

## Workflow

### Phase 1: Capture (5 seconds)

**Navigate to reference:**
```
Tool: mcp__chrome-devtools__navigate_page
URL: [reference-url]
```

**Capture at 3 breakpoints:**
1. **Desktop (1440x900)** - Primary analysis target
2. **Tablet (768x1024)** - Responsive adaptation
3. **Mobile (375x667)** - Mobile-first validation

**Scroll to target section:**
- Hero: Usually 0-100vh
- Pricing: Mid-page, look for price cards
- Features: Often after hero, before pricing
- CTA: Usually bottom of page

---

### Phase 2: Strategic Analysis (Design-Agency Thinking)

Apply **LoveFrom (Jony Ive)** + **DesignJoy (Brett)** lens to extract principles.

**Analyze these dimensions:**

#### 1. Visual Hierarchy
- What's the first thing your eye sees?
- What's second? Third?
- How is visual weight created? (size, color, contrast, whitespace)
- Does hierarchy serve user goals?

#### 2. Restraint & Simplicity
- What did they NOT include? (Jony's "what can we remove?")
- How many focal points? (Brett's "one strong direction")
- Where is whitespace used generously?
- What elements fight for attention vs support hierarchy?

#### 3. Typography Strategy
- Headline size (approximate from screenshot)
- Body text size
- Type scale ratio (headline:body)
- Serif vs sans choices - why?
- Line-height creating rhythm?

#### 4. Spacing Philosophy
- Generous vs tight spacing?
- Consistent rhythm (8px grid) or varied?
- Padding within containers
- Breathing room between sections

#### 5. Color Restraint
- Primary action color (how much is visible?)
- Reserved for action vs decorative?
- Text contrast levels
- Background layering (flat vs subtle grays)

#### 6. Content Clarity
- Headline: Abstract vs specific? Length?
- Supporting copy: Minimal vs verbose?
- CTA copy: Generic "Get Started" vs specific?
- Value proposition: Clear in 3 seconds?

#### 7. Interaction Signals
- Button style (pill, rounded, sharp)
- Depth signals (flat, shadow, 3D)
- Visual affordance (looks clickable?)
- Animation or static?

---

### Phase 3: Output Strategic Insights

**Format:**

```markdown
# Teardown: [Reference] - [Section]

## Context
**Company:** [Name]
**Audience:** [Who they target]
**Product Type:** [SaaS, marketplace, etc.]

---

## Visual Strategy Summary

**First Impression:** [1-2 sentences - what hits immediately]

**Core Approach:** [Minimalist? Editorial? Data-driven? Bold?]

---

## Design Principles Observed

### 1. [Principle Name - e.g., "Restraint Through Single CTA"]

**What they do:**
[Specific observation from screenshots]

**Why it works:**
[Design rationale - connects to audience/goals]

**Example:**
- Stripe hero: Single blue CTA, zero distractions
- Why: Enterprise buyers need clarity, not choices
- Principle: Reduce cognitive load = increase conversion

---

### 2. [Principle Name]

[Same format]

---

### 3. [Principle Name]

[Same format]

---

## Strategic Insights

**What makes this section effective:**
1. [Insight about hierarchy, content, spacing, etc.]
2. [Insight]
3. [Insight]

**Patterns worth learning:**
- [Extractable pattern that could apply to other contexts]
- [Pattern]
- [Pattern]

**Context-specific choices:**
- [What works for THEM but might not for others - explain why]

---

## Application to Tutoria

**Principles that align:**
- [Principle from reference] → [How it maps to Tutoria context]

**Principles that don't fit:**
- [Principle from reference] → [Why Tutoria audience/goals differ]

**Questions raised:**
- [Strategic question this teardown surfaces for our approach]
- [Question]

---

## Responsive Strategy

**Desktop → Mobile adaptation:**
- Typography: [How they scale]
- Spacing: [How they compress/expand]
- Layout: [Column changes, hiding/showing elements]
- Content: [Do they simplify copy on mobile?]

**Key insight:**
[What their responsive approach reveals about priorities]

---

## Next Steps

**For exploration:**
- Test [specific approach] on our [section]
- Validate [principle] with user testing
- Experiment with [pattern] in Phase 2

**Don't blindly copy:**
- [What to avoid and why]
```

---

## Quality Standards

**Good teardown:**
- ✅ Extracts principles, not pixels
- ✅ Explains WHY choices work
- ✅ Context-aware (their audience vs ours)
- ✅ Strategic insights actionable
- ✅ Avoids "just copy this"

**Bad teardown:**
- ❌ "They use 72px, we should too"
- ❌ No reasoning for effectiveness
- ❌ Ignores audience differences
- ❌ Vague observations

---

## When to Use

✅ **Use when:**
- Learning from best-in-class (Stripe, Linear, Cal.com, Vercel)
- Exploring new section design (pricing, testimonials)
- Stuck on strategic approach (minimalist vs rich?)
- Building design intuition

❌ **Don't use when:**
- Validating our implementation → use `/landing-page:ui-check`
- Need code-level fixes → use `/ui`
- Quick screenshot check → use HMR + browser

---

## Example Output

```markdown
# Teardown: Stripe - Hero

## Context
**Company:** Stripe
**Audience:** Developers, enterprise buyers
**Product Type:** Financial infrastructure SaaS

## Visual Strategy Summary

**First Impression:** Minimal, confident, premium. Single focal point (headline).

**Core Approach:** Restrained minimalism - says more with less.

## Design Principles Observed

### 1. Single Focal Point Hierarchy

**What they do:**
72px serif headline, 20px subtext (2 lines max), one blue CTA. Logo grid below fold. Zero competing elements above fold.

**Why it works:**
Enterprise buyers = sophisticated audience. Don't need hand-holding. Clarity > persuasion. Single CTA reduces decision fatigue.

**Principle:** Restraint signals confidence. Premium products don't oversell.

### 2. Trust Through Logos, Not Testimonials

**What they do:**
Logo grid of major customers (Amazon, Shopify, etc.) below hero. No testimonial quotes, no star ratings, no social proof copy.

**Why it works:**
Logos = instant credibility for B2B. Developer audience trusts brands over individuals. Visual > verbal for this segment.

**Principle:** Match social proof format to audience sophistication.

### 3. Specific Abstract Headline

**What they do:**
"Financial infrastructure for the internet" - abstract but specific. Not "Send payments" (too narrow) or "Business platform" (too vague).

**Why it works:**
Multiple use cases (billing, checkout, invoicing) = need abstract framing. But "infrastructure" = specific enough to signal seriousness.

**Principle:** Abstract works when product has many applications + sophisticated audience.

## Strategic Insights

**What makes this effective:**
1. Every element serves conversion - zero decoration
2. Whitespace = premium positioning (cheap products fill space)
3. Typography contrast (serif headline, sans body) creates hierarchy without color

**Patterns worth learning:**
- Single CTA restraint (reduce choices = increase action)
- Logo grid social proof (visual, scannable)
- 3-tier hierarchy (headline → subtext → CTA = clear eye path)

**Context-specific:**
- Minimal copy works because Stripe = known brand + developer audience
- Wouldn't work for unknown brand targeting non-technical users

## Application to Tutoria

**Principles that align:**
- Restraint: Our green reserved for CTAs only ✓
- Hierarchy: Clear headline → Harvard card → CTA ✓

**Principles that don't fit:**
- Minimal copy: Parents need more reassurance than developers
- Logo grid: We use Harvard stat (credibility through research, not customers)
- Abstract headline: "Structured phonics that just works" = specific for anxious parents

**Questions raised:**
- Should we test single CTA in hero (currently button + waitlist link)?
- Does our two-column layout create competing focal points vs their single-column?

## Responsive Strategy

**Desktop → Mobile:**
- Typography: 72px → 40px (55% scale)
- Spacing: Generous → Moderate (maintains breathing room)
- Layout: Single-column on both (consistency)
- Logo grid: 8 logos → 4 logos (reduced but present)

**Key insight:**
They maintain whitespace even on mobile = premium positioning consistent across devices.

## Next Steps

**For exploration:**
- Test single CTA in hero (remove secondary waitlist link?)
- Validate if Harvard card competes with headline focal point
- Experiment with more generous mobile spacing (currently 66% of desktop)

**Don't blindly copy:**
- Minimal copy (parents ≠ developers, need reassurance)
- Logo grid (we lack customer logos, Harvard stat more credible)
```

---

## Design Philosophy

**Jony Ive (LoveFrom):**
- Essential simplicity - what did they remove?
- Material truth - honest to web medium?
- Purposeful restraint - every element earns its place?

**Brett (DesignJoy):**
- One strong direction - no hedging with options?
- Design speaks for itself - visual clarity > explanation?
- Ship opinion, not options - clear conviction?

**Tutoria Lens:**
- Context awareness - their audience vs ours?
- Principles over pixels - extract WHY not WHAT?
- Strategic learning - build design intuition, don't copy?

---

## Performance

**Target: 10-15 seconds**
- Capture 3 screenshots: 5s
- Analysis + output: 10s

Fast enough for exploration, thorough enough for learning.
