# Video Player Setup Guide

## What You Need to Add (2 minutes)

### 1. YouTube Video ID

In `app/page.tsx:170`, replace:
```tsx
videoId="YOUR_YOUTUBE_VIDEO_ID"
```

With your actual ID. Example: If your YouTube URL is `https://youtube.com/watch?v=dQw4w9WgXcQ`, use:
```tsx
videoId="dQw4w9WgXcQ"
```

### 2. Custom Thumbnail Image

Add your thumbnail at: `public/video-thumbnail.jpg`

**Requirements:**
- Recommended size: **1600x900px** (16:9 at 2x for retina)
- Format: JPG or PNG
- Should show a compelling frame from your video

**Until you add the thumbnail:** The component will show a cream (#F7F5ED) background with the play button overlay.

## Features

✅ Zero YouTube branding until clicked (facade pattern)
✅ Custom thumbnail shows your brand first
✅ Smooth 300ms fade when video loads
✅ Matches design system (shadows, colors, spacing, animations)
✅ Simple hover: opacity fade + gentle scale
✅ Responsive at all breakpoints (375px, 768px, 1440px)
✅ Performance: No iframe load until user engages

## Component Location

- **VideoPlayer component**: `app/components/VideoPlayer.tsx`
- **Usage in page**: `app/page.tsx:166-175`
