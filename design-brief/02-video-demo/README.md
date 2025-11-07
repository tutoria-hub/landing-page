# Video Demo Section - Design Brief

**Last Updated**: 2025-11-07
**Status**: Finalized - Ready for Development

---

## Purpose

Show product in action within 10 seconds of scrolling from hero. Video demonstrates UI, interaction patterns, and learning experience. Addresses the critical question: "What does this actually look like in practice?"

**User Journey**: Hero establishes credibility → Video demonstrates functionality → User understands product value

---

## Layout Specs

### Desktop (≥1024px)

```css
.video-demo-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #F7F5ED; /* Cream - alternates with white hero */
  padding: 96px 48px;
}

.video-demo-content {
  max-width: 1120px; /* Wider than hero for video emphasis */
  margin: 0 auto;
  text-align: center;
}

/* Component spacing */
.section-header {
  margin-bottom: 48px; /* Consistent with hero spacing */
}

.video-container {
  margin: 0 auto;
}
```

###Mobile (<1024px)

```css
.video-demo-section {
  min-height: auto; /* Don't force full viewport on mobile */
  padding: 64px 24px;
}

.section-header {
  margin-bottom: 32px; /* Tighter on mobile */
}
```

---

## Components

### Section Header

**Purpose**: Clear, immediate label for section content

**HTML Structure**:
```html
<h2 class="section-header">
  See Tutoria in Action
</h2>
```

**Styles**:
```css
.section-header {
  font-family: 'EB Garamond', serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #1A1A1A;
  text-align: center;
}

@media (max-width: 1024px) {
  .section-header {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .section-header {
    font-size: 28px; /* Extra adjustment for very small screens */
  }
}
```

**States**:
- **Default**: Static text
- **Animation (Phase 2)**: Fade in from bottom on scroll into view

**Content**:
- Finalized text: "See Tutoria in Action"
- Do not modify without approval

---

### Video Container

**Purpose**: Display product demo video with placeholder state until video asset is ready

**HTML Structure (Phase 1 - Placeholder)**:
```html
<div class="video-container">
  <div class="video-placeholder">
    <svg class="play-icon" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill="#30A46C"/>
      <path d="M32 26L54 40L32 54V26Z" fill="#FFFFFF"/>
    </svg>
    <p class="placeholder-text">Demo Video Coming Soon</p>
    <p class="placeholder-subtext">We're creating an amazing product demo</p>
  </div>
</div>
```

**HTML Structure (Phase 2 - With Video)**:
```html
<div class="video-container">
  <iframe
    class="video-iframe"
    src="https://www.youtube.com/embed/[VIDEO_ID]"
    title="Tutoria Product Demo"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

**Styles**:
```css
.video-container {
  position: relative;
  width: 100%;
  max-width: 896px; /* 16:9 at comfortable viewing size */
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); /* Deeper shadow than hero card */
  background: #FFFFFF; /* White background for video */
}

/* Phase 1: Placeholder State */
.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #F7F5ED 0%, #FFFFFF 100%);
  padding: 48px 24px;
}

.play-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
  opacity: 0.9;
  transition: all 200ms ease;
}

.play-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

.placeholder-text {
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 8px;
}

.placeholder-subtext {
  font-family: 'Lexend', sans-serif;
  font-size: 16px;
  color: #595959;
  margin: 0;
}

/* Phase 2: Video Iframe */
.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 1024px) {
  .video-container {
    max-width: 100%; /* Full width on mobile */
    border-radius: 12px; /* Slightly smaller radius */
  }

  .play-icon {
    width: 64px;
    height: 64px;
  }

  .placeholder-text {
    font-size: 20px;
  }

  .placeholder-subtext {
    font-size: 14px;
  }
}
```

**States**:
- **Placeholder (Phase 1)**: Gradient background with play icon + text
- **Loading (Phase 2)**: Show loading spinner while iframe loads
- **Loaded (Phase 2)**: Video iframe with YouTube/Vimeo controls
- **Hover (Phase 1)**: Play icon scales 1.1x, opacity increases

**Video Specs (Phase 2)**:
- Aspect ratio: 16:9 (standard YouTube/Vimeo)
- Platform: YouTube or Vimeo (both supported)
- Max width: 896px (comfortable viewing size)
- Border radius: 16px (rounded-xl)
- Captions: Required for accessibility
- Autoplay: No (user-initiated play only)

---

## Accessibility

**Completed**:
- [x] Section header uses semantic h2 tag
- [x] Video iframe includes descriptive title attribute
- [x] Play icon is decorative (no keyboard interaction needed in Phase 1)
- [x] Color contrast exceeds 4.5:1 (placeholder text passes WCAG AA)

**Phase 2**:
- [ ] Video includes captions/subtitles
- [ ] Provide transcript link below video
- [ ] Keyboard controls work (inherited from YouTube/Vimeo player)
- [ ] Screen reader announces video presence

**Testing**:
- Verify with screen reader (announces "Video Demo Coming Soon" in Phase 1)
- Test keyboard navigation (focus flows logically from scroll indicator to video)
- Verify video controls are accessible on mobile (touch targets >44px)

---

## Edge Cases

### No Video Asset Available (Phase 1)

**Problem**: Video not ready for launch
**Solution**: Elegant placeholder state with play icon and "Coming Soon" message

**Benefits**:
- Maintains section structure in layout
- Sets user expectation for future content
- Looks intentional, not broken

### Slow Video Loading

**Problem**: Video iframe takes time to load on slow connections
**Solution** (Phase 2):
```css
.video-container.loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border: 4px solid #F7F5ED;
  border-top-color: #30A46C;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
```

### Mobile Viewport Width

**Problem**: Video too small on narrow screens (<375px)
**Solution**: Video remains 100% width with maintained aspect ratio

### YouTube/Vimeo Privacy

**Problem**: Embedded videos may track users
**Solution** (Phase 2):
- Use YouTube's `youtube-nocookie.com` domain for privacy-enhanced mode
- Or use Vimeo with `dnt=1` parameter (Do Not Track)

**Example**:
```html
<iframe src="https://www.youtube-nocookie.com/embed/[ID]?rel=0"></iframe>
```

---

## Implementation Notes

### Phase 1 (Ship First)

**Minimum Viable Version**:
- Section header ("See Tutoria in Action")
- Video placeholder with play icon
- Cream background (#F7F5ED)
- Responsive layout (desktop/mobile)

**Time Estimate**: 1-2 hours

**Deliverable**: Complete section with elegant placeholder that prepares users for future video

### Phase 2 (When Video Ready)

**Enhancements**:
- Replace placeholder with actual video embed
- Add loading state while iframe loads
- Add transcript download link below video
- Scroll-triggered fade-in animation

**Time Estimate**: 1-2 hours (mostly asset integration)

**Deliverable**: Functional video demo with captions and accessibility features

### Dependencies

**Assets Required** (Phase 2):
- Video hosted on YouTube or Vimeo
- Video ID for embed URL
- Captions file (.srt or platform-native)
- Optional: Custom thumbnail image

**External**:
- YouTube or Vimeo account
- Video embed permissions enabled

**Technical**:
- CSS aspect ratio support (modern browsers only - fallback with padding-top hack)
- iframe sandbox attributes for security

---

## Design Decisions Log

### Why "See Tutoria in Action" instead of "Watch a Demo"?

**Decision**: "See Tutoria in Action" as section header
**Rationale**:
- "See" is more conversational than "Watch"
- "Tutoria in Action" emphasizes product name and active learning
- Avoids corporate jargon ("Demo" feels sales-y)
**Alternative Considered**: "How Tutoria Works" - rejected as too dry/instructional

### Why 16:9 aspect ratio?

**Decision**: Standard 16:9 video container
**Rationale**:
- Universal standard for YouTube/Vimeo
- Comfortable viewing size across devices
- No letterboxing or awkward cropping
**Alternative Considered**: Square 1:1 for mobile - rejected as most product demos are horizontal

### Why cream background for video section?

**Decision**: Cream (#F7F5ED) background, white video container
**Rationale**:
- Alternates with white hero (creates visual rhythm)
- White container makes video pop against cream background
- Consistent with global design system
**Alternative Considered**: White background with cream container - rejected as video needs maximum contrast

### Why placeholder state instead of omitting section?

**Decision**: Show elegant placeholder with "Coming Soon" message
**Rationale**:
- Maintains layout structure for future video
- Sets user expectation
- Looks intentional and professional
- Easier to swap in video later without layout shifts
**Alternative Considered**: Hide section until video ready - rejected as misses opportunity to show roadmap

### Why no autoplay?

**Decision**: User-initiated play only (no autoplay)
**Rationale**:
- Respects user bandwidth and attention
- Better accessibility (no unexpected audio)
- Higher engagement (users who click play are interested)
- Avoids annoying auto-play patterns
**Alternative Considered**: Muted autoplay on scroll - rejected as intrusive

---

## User Notes

See `notes.md` in this folder for:
- Video asset status and URL
- Platform preference (YouTube vs Vimeo)
- Revision requests
- Open questions about video content

---

**This section is ready for Phase 1 implementation (placeholder state). Swap to Phase 2 when video asset is ready.**
