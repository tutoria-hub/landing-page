# Tutoria Design Principles

*Duolingo's clarity. Notebook warmth. Pieter Levels simplicity.*

---

## Core Philosophy

**For Dyslexic Learners**: We exist to make pronunciation learning accessible to dyslexic children ages 6-12. Every pixel serves this mission. If a design element doesn't reduce cognitive load or increase learning confidence, it doesn't belong here. Period.

**Duolingo's Clarity, Our Warmth**: We adopt Duolingo's proven shape language and interaction patterns because they work—15 minutes average engagement, 86% retention. But we wrap their clinical precision in notebook warmth because dyslexic kids need comfort, not gamification. Think of it as Duolingo's engine in a handwritten journal.

This warmth comes through two layers:
- **Environmental**: Subtle notebook canvas (cream background with faint ruling)
- **Content**: Clean white cards with high contrast text (accessibility first)

**Pieter Levels Simplicity Applied**: Ship what works. Delete what doesn't. Every component must be buildable in under 100 lines. No design system is worth a slow app. We choose fast over fancy, working over perfect, shipped over planned.

---

## Visual Language Rules

### Shapes: Three Primitives, Infinite Possibilities

**The Foundation** (Inspired by Duolingo):
- **Rounded Rectangle**: All containers, cards, buttons
- **Circle**: Profile pictures, recording buttons, progress dots
- **Rounded Triangle**: Directional hints, play buttons (rotated triangle)

**Border Radius Values** (Implemented in Tailwind):
```css
/* These map through tailwind.config.ts */
rounded-sm: 8px;          /* Small elements: tags, badges */
rounded-md: 12px;         /* Inputs, small cards */
rounded-lg: 16px;         /* PRIMARY: standard cards */
rounded-xl: 16px;         /* Also 16px for consistency */
rounded-2xl: 24px;        /* Large cards, modals */
rounded-full: 9999px;     /* Pills: buttons, progress bars */
```

### Spacing: Consistent Breathing Room

**8px Grid** (Tailwind defaults):
```css
/* Use Tailwind's standard spacing */
p-1: 4px       /* Micro */
p-2: 8px       /* Tight */
p-4: 16px      /* Default internal padding */
p-6: 24px      /* Card padding standard */
p-8: 32px      /* Modal padding */
```

### Borders: Subtle Definition

**Border System**:
```css
/* Use Tailwind utilities */
border-2                          /* 2px Duolingo-style borders */
border-primary                    /* Green for active (#30A46C) */
border-destructive               /* Red for errors (#DC6B3C) */
border-blue-400                  /* Blue for retry states */
```

### Shadows: Functional Depth Only

**Shadow Scale** (Tailwind utilities):
```css
shadow-sm      /* Default cards */
shadow-md      /* Hover state */
shadow-lg      /* Modals */
```

**3D Raised Button Effect** (Solid color, no blur):
```css
/* For classic elevated button look */
shadow-[0_4px_0_#DCDCDC]  /* Light gray bar underneath */
```
- ✅ Uses solid hex color (no rgba)
- ✅ Zero blur (hard edge)
- ✅ Creates visible elevation
- ✅ Design-system compliant

**Critical Rule**: Shadows on UI elements (buttons, cards, inputs) MUST use solid hex colors. Only environmental shadows (background textures, paper effects) may use rgba with ≤1.5% opacity.

### States: Clear Feedback

**Interaction States** (200ms transitions):
```css
/* Standard patterns */
hover:scale-105              /* Buttons */
hover:shadow-md              /* Cards */
hover:border-primary         /* Active selection */
transition-all duration-200  /* Smooth transitions */
```

---

## Environmental Design Layer

### The Notebook Canvas (Background Only)
While all content sits on clean white cards for maximum readability, the environmental canvas provides the promised "notebook warmth":

```css
/* Environmental Layer - Body/Layout Only */
Background: #F7F5ED               /* Warm cream notebook */
Ruling: rgba(0,0,0,0.015)        /* 1.5% opacity horizontal lines */
Grain: rgba(0,0,0,0.008)         /* 0.8% opacity paper texture */
Line Height: 24px                /* Natural notebook ruling */
```

**Why rgba?** Hex colors cannot achieve the subtlety needed (1-2% opacity). This is our only rgba exception—used exclusively for environmental atmosphere, never for content.

**Key Principle**: The notebook texture is the *container*, not the *content surface*. All text and UI elements sit on solid white cards with full WCAG contrast.

---

## Color Application

### Color Format Rules
- **Hex for all UI**: #30A46C format for all components and content
- **rgba for environment only**: Subtle opacity effects (0.015 max)
- **Never rgba for content**: All text/UI uses solid hex colors

### Primary Palette (In globals.css)

```css
/* Core Colors - Hex Only */
--primary: #30A46C;              /* Green - success, action */
--primary-foreground: #FFFFFF;   /* White on green */

/* Semantic States */
--destructive: #DC6B3C;          /* Soft red for errors */
--muted: #F5F5F4;               /* Gray backgrounds */
--foreground: #1A1A1A;          /* WCAG compliant text */
```

### Learning States

```css
/* Success */
.border-primary .bg-green-50     /* Green indicates correct */

/* Retry */
.border-blue-400 .bg-blue-50     /* Blue indicates retry needed */

/* Error */
.border-destructive .bg-red-50   /* Soft red for mistakes */

/* Pending */
.border-gray-300                 /* Neutral waiting state */
```

---

## Typography Hierarchy

### The Two-Font System

**Nunito** - Headers & UI (Unified):
```css
font-heading                     /* Nunito Bold 700 for headers */
font-body                        /* Nunito Regular 400 for UI */
```

**OpenDyslexic** - Learning Content Only:
```css
.text-learning                   /* Activity cards only */
```

**Rationale**: Single font family (Nunito) creates visual cohesion and rounded friendliness matching Duolingo's proven patterns. Weight contrast (Bold 700 vs Regular 400) provides clear hierarchy. OpenDyslexic remains for specialized learning moments.

**See**: [Typography System Documentation](./typography.md) for full details, Duolingo comparison, and future Lexend considerations.

### Size Scale

```css
/* Use Tailwind's defaults */
text-sm: 14px     /* Labels only */
text-base: 16px   /* MINIMUM for content */
text-lg: 18px     /* Comfortable reading */
text-xl: 20px     /* Section headers */
text-2xl: 24px    /* Page headers */
```

---

## Component Patterns

### Cards
```tsx
<Card className="rounded-xl border-2 p-6 shadow-sm">
```
- Always `rounded-xl` (16px)
- Always `border-2` (2px borders)
- Standard `p-6` padding

### Buttons
```tsx
<Button className="rounded-full px-6 py-3">
```
- Always `rounded-full` (pill-shaped)
- Generous padding for touch

### Inputs
```tsx
<input className="rounded-md border-2 px-4 py-3">
```
- `rounded-md` for inputs (12px)
- Clear borders for visibility

---

## Animation Principles

### Core Animations

**Success** (Card completion):
```css
.animate-vanish    /* 0.5s fade + scale */
```

**Failure** (Wrong answer):
```css
.animate-fail      /* 0.3s shake */
```

**Loading** (Waiting):
```css
.animate-pulse     /* Gentle pulsing */
```

### Timing Rules
- 200ms for interactions
- 300ms for state changes
- 500ms for celebrations
- Never longer than 1s

---

## Accessibility Standards

### Focus Indicators (Implemented)
```css
/* In globals.css */
*:focus-visible {
  outline: 3px solid #30A46C;
  outline-offset: 2px;
}
```

### Text Contrast
- Foreground: #1A1A1A (13.6:1 ratio ✅)
- Muted: #595959 (7.0:1 ratio ✅)
- All text passes WCAG AA

### Touch Targets
- Minimum 44px for all interactive elements
- Buttons use generous padding
- Cards are fully clickable

---

## Implementation Checklist

Before shipping any component:

### The Duolingo Test
- [ ] Uses 16px border-radius for cards (`rounded-xl`)?
- [ ] Has 2px borders (`border-2`)?
- [ ] Pills for buttons (`rounded-full`)?
- [ ] Smooth transitions (200ms)?

### The Tutoria Test
- [ ] Minimum 16px font size?
- [ ] High contrast (4.5:1 minimum)?
- [ ] Green for success, blue for retry?
- [ ] OpenDyslexic for learning content?

### The Pieter Levels Test
- [ ] Under 100 lines of code?
- [ ] Uses existing Tailwind utilities?
- [ ] No custom CSS needed?
- [ ] Ships in 30 minutes?

---

## What We DON'T Do

**Never Add**:
- Custom border-radius values
- OKLCH colors
- Paper textures behind content (environmental canvas excepted)
- 1px borders
- Complex gradients
- Unnecessary animations

**Never Compromise**:
- 16px minimum fonts
- 2px border widths
- High contrast ratios
- Focus indicators

---

## Quick Reference

```tsx
/* Standard Card */
<Card className="rounded-xl border-2 p-6 shadow-sm
                 hover:shadow-md transition-all duration-200">

/* Pill Button */
<Button className="rounded-full px-6 py-3
                   hover:scale-105 transition-all duration-200">

/* Learning Text */
<p className="text-learning text-lg">

/* Success State */
<Card className="border-primary bg-green-50">

/* Retry State */
<Card className="border-blue-400 bg-blue-50">

/* Environmental Canvas (body/layout only) */
.notebook-environment {
  background-color: #F7F5ED;
  background-image:
    linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
    radial-gradient(circle at 2px 2px, rgba(0,0,0,0.008) 1px, transparent 1px);
  background-size: 100% 24px, 4px 4px;
}

/* Content always on white cards */
<Card className="bg-white rounded-xl border-2">
```

---

*Ship what helps dyslexic kids learn. Delete everything else.*