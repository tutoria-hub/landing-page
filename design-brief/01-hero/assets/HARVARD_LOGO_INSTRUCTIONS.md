# Harvard Medical School Logo - Acquisition & Preparation

**Last Updated**: 2025-11-07

---

## Download Source

**Recommended Source**: BrandEPS (third-party logo repository)

**Direct PNG URL**:
```
https://brandeps.com/logo-download/H/Harvard-Medical-School-logo-01.png
```

**Alternative**: Download ZIP package from https://brandeps.com/logo/H/Harvard-Medical-School-01
- Contains SVG, EPS, PNG, JPG with transparent backgrounds

---

## Preparation Steps

### 1. Download Logo
- Right-click URL above → "Save Link As..." → `harvard-logo-original.png`
- Or visit page and click "Download ZIP" → extract PNG

### 2. Convert to Greyscale

**Option A: Using Preview (Mac)**
1. Open `harvard-logo-original.png` in Preview
2. Tools → Adjust Color
3. Saturation slider → 0 (full greyscale)
4. Export → Save as `harvard-logo-grey.png`

**Option B: Using ImageMagick (Command Line)**
```bash
convert harvard-logo-original.png -colorspace Gray harvard-logo-grey.png
```

**Option C: Using Photoshop**
1. Image → Mode → Grayscale
2. File → Export → Export As → PNG
3. Save as `harvard-logo-grey.png`

**Option D: Using Online Tool**
- https://www.imgonline.com.ua/eng/make-grayscale.php
- Upload PNG → Convert → Download as `harvard-logo-grey.png`

### 3. Optimize for Web

**Target Specs**:
- Format: PNG with transparency
- Minimum height: 80px (for 2x retina at 40px display size)
- Recommended height: 120-160px (provides flexibility)
- File size: < 50KB

**Optimization Tool**:
```bash
# Using ImageMagick
convert harvard-logo-grey.png -resize x120 -strip harvard-logo-grey-optimized.png

# Or use TinyPNG.com for manual compression
```

### 4. Place in Assets

**Final Location**:
```
/public/assets/harvard-logo-grey.png
```

or

```
/design-brief/_global/harvard-logo-grey.png
```

(Depending on whether you're using shared assets or section-specific)

---

## Verification Checklist

- [ ] Logo is greyscale (no color)
- [ ] Background is transparent
- [ ] Height is at least 80px
- [ ] File size < 50KB
- [ ] Logo is crisp/sharp (not blurry)
- [ ] Logo placed in correct directory

---

## Usage in Hero Section

```html
<img
  src="/assets/harvard-logo-grey.png"
  alt="Harvard Medical School"
  class="harvard-logo"
  width="auto"
  height="40"
>
```

```css
.harvard-logo {
  width: auto;
  height: 40px;
  filter: grayscale(100%); /* Backup if PNG not already greyscale */
  opacity: 1;
  display: block;
  margin: 0 auto;
}
```

---

## Legal Notice

Harvard Medical School logo is copyrighted and trademarked. Use in this context:
- **Purpose**: Educational citation (referencing Harvard research in stat card)
- **Treatment**: Greyscale, small size (40px) - attribution, not promotion
- **Guideline**: Similar to academic citation in bibliography

For official permission, contact: design@hms.harvard.edu

---

**Once complete, update this file with actual download date and source used.**
