# Component Setup Guide

## Quick Start

### Step 1: Review Components
Read `COMPONENTS_PROPOSAL.md` and decide which components to use.

### Step 2: Setup Registry Config
```bash
# Copy the example config
cp components.json.example components.json
```

### Step 3: Install Selected Components

**Example: Install all 6 components**
```bash
npx shadcn@latest add @aceternity/bento-grid
pnpm dlx shadcn@latest add @magicui/highlighter
pnpm dlx shadcn@latest add @magicui/light-rays
pnpm dlx shadcn@latest add @magicui/blur-fade
pnpm dlx shadcn@latest add @magicui/word-rotate
pnpm dlx shadcn@latest add @magicui/shiny-button
```

**Example: Install selectively**
```bash
# Just the hero essentials
pnpm dlx shadcn@latest add @magicui/light-rays
pnpm dlx shadcn@latest add @magicui/shiny-button
pnpm dlx shadcn@latest add @magicui/word-rotate
```

### Step 4: Components Location
Installed components will be in:
```
/components/ui/bento-grid.tsx
/components/ui/highlighter.tsx
/components/ui/light-rays.tsx
/components/ui/blur-fade.tsx
/components/ui/word-rotate.tsx
/components/ui/shiny-button.tsx
```

### Step 5: Import & Use
```tsx
// In app/page.tsx
import { BentoGrid } from "@/components/ui/bento-grid"
import { ShinyButton } from "@/components/ui/shiny-button"
import { WordRotate } from "@/components/ui/word-rotate"

export default function Page() {
  return (
    <section>
      <h1>
        Learn <WordRotate words={["Spanish", "French", "German"]} />
      </h1>
      <ShinyButton>Get Started</ShinyButton>
    </section>
  )
}
```

---

## Files Created

1. **COMPONENTS_PROPOSAL.md** - Component descriptions & use cases (for design team)
2. **components.json.example** - Registry configuration (copy to `components.json` when ready)
3. **SETUP_GUIDE.md** - This file (installation steps)

---

## What Happens Next?

1. Design team reviews proposal
2. You approve components
3. Claude installs & implements approved components
4. UI validation with `/ui` command

---

## Notes

- `components.json` is gitignored (not committed)
- Safe to experiment - components are just React files
- Can uninstall by deleting from `/components/ui/`
- No impact until you import & use them

---

**Status:** 📋 Ready for design team review

No installation yet - waiting for your approval.
