# Flashcard Demo Assets

This directory contains all assets and components extracted from `tutoria-webapp` for the landing page flashcard demo.

## Directory Structure

```
demo/
├── icons.tsx           # SVG icons (Volume, Microphone, Check)
├── animations.tsx      # Loading dots, Waveform bars, Success check
├── textSizing.ts       # Responsive text sizing utilities
└── README.md          # This file
```

## Assets

### 1. Font
- **OpenDyslexic-Regular.otf** → `/public/fonts/OpenDyslexic/`
- Used for all flashcard letter displays
- Add to CSS with:
  ```css
  @font-face {
    font-family: 'OpenDyslexic';
    src: url('/fonts/OpenDyslexic/OpenDyslexic-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  ```

### 2. Color System

The demo uses these color tokens from the webapp:

```css
/* Primary/Brand Color - Green */
--primary: #22C55E;        /* Used for: active states, success */

/* Feedback Colors */
--success: #22C55E;        /* Green - correct pronunciation */
--warning: #EAB308;        /* Yellow - incorrect segments */
--info: #4F46E5;          /* Blue - loading/checking states */

/* UI Colors */
--border: #E5E7EB;        /* Gray-200 - default borders */
--background: #FFFFFF;     /* White - card backgrounds */
--foreground: #1F2937;    /* Gray-800 - text color */

/* State Colors */
--retry-light: #FEF3C7;   /* Amber-100 - retry card background */
```

### 3. CSS Animations Needed

Add to your global CSS or component styles:

```css
/* Waveform bars */
.recording-bar {
  width: 2px;
  background: #22C55E;
  border-radius: 2px;
  transition: height 150ms ease-out;
  height: var(--bar-height, 4px);
}

.recording-bar[data-active="true"] {
  animation: pulse-bar 300ms ease-in-out;
}

@keyframes pulse-bar {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 400ms ease-out;
}

/* Pulse once (for "try again" text) */
@keyframes pulse-once {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-pulse-once {
  animation: pulse-once 600ms ease-in-out;
}
```

## Components

### Icons (`icons.tsx`)
- `IconVolume` - Speaker icon with sound waves
- `IconMicrophone` - Microphone icon
- `IconCheck` - Checkmark icon

### Animations (`animations.tsx`)
- `LoadingDots` - Three bouncing dots for loading states
- `SuccessCheck` - Animated checkmark
- `WaveformBars` - Four-bar waveform visualization

### Text Sizing (`textSizing.ts`)
- `getOptimalFontSize(text)` - Returns responsive clamp() value
- `getFlashcardTextStyles(text)` - Complete style object for flashcard text

## Demo States

The flashcard demo cycles through these states:

1. **Idle** - Microphone icon, ready state
2. **Recording** - Waveform bars animating (green)
3. **Checking** - Loading dots with "checking..." text
4. **Success** - Green letter + checkmark
5. **Incorrect** - Yellow highlighted segments
6. **Retry** - Same flow, faster timing

**Total loop time: ~30 seconds**

## Usage Example

```tsx
import { IconMicrophone } from './demo/icons';
import { LoadingDots, WaveformBars } from './demo/animations';
import { getFlashcardTextStyles } from './demo/textSizing';

function FlashcardDemo() {
  const [state, setState] = useState('idle');
  const textStyles = getFlashcardTextStyles('r');

  return (
    <div className="flashcard">
      <div style={textStyles}>r</div>
      {state === 'idle' && <IconMicrophone />}
      {state === 'recording' && <WaveformBars isActive={true} />}
      {state === 'checking' && <LoadingDots />}
    </div>
  );
}
```

## Source References

All code extracted from `tutoria-webapp`:
- AudioButton component: `src/components/practice/AudioButton.tsx`
- Text utilities: `src/utils/adaptiveText.ts`
- Color system: Tailwind config and design tokens
