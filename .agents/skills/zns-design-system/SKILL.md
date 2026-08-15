---
name: zns-design-system
description: Complete design system, component guidelines, color palette, typography, animations, WebGL effects (MagicBento, SpecularButton, BlurText, ClickSpark), and page creation standards for the Zen Nova Solutions (ZNS) web application. Verified against live site https://zns-eta.vercel.app/ and codebase at d:\project\Zen novo.
---

# Zen Nova Solutions (ZNS) — Design System & Page Creation Skill

> **Verified** from live site inspection (`https://zns-eta.vercel.app/`) + full source code audit of `d:\project\Zen novo`. Use this skill every time you create or extend any page in this project. Matching this reference exactly is mandatory.

---

## 🎨 1. Color Tokens (Exact Values)

All colours are defined in `css/style.css` `:root`. Do NOT invent new colours — use only these:

```css
:root {
  /* Brand */
  --color-primary:       #FF7300;   /* Electric Orange — CTAs, accents, icons, borders */
  --color-dark-teal:     #052E34;   /* Deep Teal — H1/H2 headings, navbar CTA bg */
  --color-dark:          #00313D;   /* Midnight Teal — focus card titles */
  --color-body:          #1D2733;   /* Body / paragraph text */
  --color-muted:         #5C7073;   /* Secondary text, card descriptions, list items */
  --color-focus-text:    #41484B;   /* Section subtext, FAQ answers */
  --color-white:         #FFFFFF;
  --color-black:         #000000;
  --color-teal-mid:      #194755;   /* Process dots, marquee labels */
  --color-teal-link:     #11434A;   /* Service card "Learn more" links */
  --color-border-light:  rgba(0, 49, 61, 0.1);  /* Card/section borders */
  --gradient-bar:        linear-gradient(90deg, #FF3E30 0%, #F18000 100%); /* Announcement bar */

  /* Orbit icon circle backgrounds */
  --dot-sap:    #000000;
  --dot-html:   #E32C00;
  --dot-php:    #8793C4;
  --dot-js:     #FFCB00;
  --dot-css:    #0099FA;
  --dot-react:  #241F20;
  --dot-figma:  #1E1E1E;
  --dot-python: #3776AB;
}
```

**Additional hardcoded values used in specific components:**
- Site footer background: `#031D21` (darker than teal)
- CTA section background: `var(--color-dark-teal)` = `#052E34`
- Hero background: `linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,243,230,0.3) 60%, rgba(255,230,204,0.15) 100%)`
- Our Focus section: `linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 100%)`
- Working Process section: `linear-gradient(180deg, #F8FAFB 0%, #FFFFFF 100%)`
- Testimonials section: `linear-gradient(180deg, #F5F7F8 0%, #FAFBFC 50%, #F5F7F8 100%)`

---

## 🔤 2. Typography System

**Fonts loaded via Google Fonts CDN (always include in `<head>`):**
```html
<!-- Handled via CSS @import inside style.css -->
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

| Token | Value |
|---|---|
| `--font-primary` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--font-secondary` | `'Plus Jakarta Sans', var(--font-primary)` |
| `--font-sf` | `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', sans-serif` |

### Type Scale

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Hero H1 | `--font-primary` | 52px / 58px lh | 700 | `--color-dark-teal` |
| Section label (`OUR FOCUS`) | `--font-primary` | 32px / 58px lh | 700 | `--color-primary` |
| Section heading | `--font-secondary` | 32px / 38px lh | 700 | `--color-dark-teal` |
| Section subtext | `--font-secondary` | 16px / 26px lh | 400 | `--color-focus-text` |
| Hero description | `--font-primary` | 21px / 31px lh | 500 | `--color-body` |
| Navbar links | `--font-primary` | 20px / 21px lh | 400 | `--color-black` |
| Navbar contact button | `--font-primary` | 20px / 21px lh | 400 | `--color-white` |
| Announcement bar | `--font-primary` | 16px / 21px lh | 400 | `--color-white` |
| Service card title | `--font-sf` | 20px / 28px lh | 700, ls -0.849px | `--color-dark-teal` |
| Service card desc | `--font-sf` | 14px / 23px lh | 700, ls -0.15px | `--color-muted` |
| Service card list | `--font-sf` | 14px / 20px lh | 700, ls -0.15px | `--color-muted` |
| Focus card title | `--font-secondary` | 14px / 20px lh | 700, ls 0.28px | `--color-dark` |
| Portfolio card title | `--font-primary` | 18px / 24px lh | 700 | `--color-dark-teal` |
| Testimonial quote | `--font-primary` | 15px / 24px lh | 400 | `--color-body` |
| FAQ question | `--font-primary` | 16px / 24px lh | 500 | `--color-dark-teal` |
| What We Do subtitle | `--font-primary` | 28px / 58px lh | 600 | `--color-black` |
| CTA heading | `--font-primary` | 32px / 42px lh | 700 | `--color-white` |
| Footer body | `--font-primary` | 14px / 22px lh | 400 | `rgba(255,255,255,0.65)` |

---

## ✨ 3. Special Text Effects

### 3.1 Glowing Orange Accent Word (`.grow`)

The hero heading has a highlighted "grow" word that glows orange. This is the most distinctive visual element:

```css
.hero__heading .grow {
  position: relative;
  display: inline-block;
  color: #FF7300;
  -webkit-text-fill-color: #FF7300;
  font-weight: 800;
  text-shadow: 0 0 16px rgba(255, 115, 0, 0.45), 0 0 30px rgba(255, 115, 0, 0.25);
  transition: transform 0.3s ease;
}

/* Glowing gradient underline */
.hero__heading .grow::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #FF7300 0%, #FFA800 50%, #FF3E30 100%);
  border-radius: 9999px;
  box-shadow: 0 2px 12px rgba(255, 115, 0, 0.7), 0 0 24px rgba(255, 115, 0, 0.4);
}
```

> ⚠️ **CRITICAL**: Do NOT apply `-webkit-background-clip: text` or `background-clip: text` to `.grow` — it makes BlurText word spans invisible. Use `color: #FF7300` and `text-shadow` instead.

### 3.2 Sparkle Emoji Pulse (`.grow__sparkle`)

```css
.grow__sparkle {
  display: inline-block;
  font-size: 0.55em;
  margin-left: 2px;
  vertical-align: super;
  -webkit-text-fill-color: initial; /* restore emoji rendering */
  animation: sparklePulse 2.2s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 6px rgba(255, 115, 0, 0.6));
}

@keyframes sparklePulse {
  0%   { transform: scale(0.85) rotate(-12deg); opacity: 0.7; }
  100% { transform: scale(1.25) rotate(18deg);  opacity: 1; filter: drop-shadow(0 0 10px rgba(255, 115, 0, 0.9)); }
}
```

### 3.3 Section Label Pattern

Every section opens with this label + heading combo (centered):
```html
<div class="accent-line-group" style="justify-content: center; margin-bottom: 0;">
  <span class="accent-line"></span>
  <span class="section-label">OUR FOCUS</span>    <!-- Orange, 32px, 700 weight -->
  <span class="accent-line"></span>
</div>
<h2 class="section-heading">Section Heading Here</h2>
<p class="section-subtext">Optional subtext here.</p>
```

---

## 🎪 4. Section Layouts & CSS Classes

### 4.1 Spacing / Container

```css
--container-max: 1440px;
--section-padding: 80px 68px;  /* standard */
```

| Section | Padding |
|---|---|
| Hero | `50px 116px 40px` |
| Our Focus | `60px 68px 70px` |
| What We Do | `40px 68px 80px` |
| Working Process | `60px 35px 80px` |
| Portfolio | `60px 68px 80px` |
| Testimonials | `60px 68px 80px` |
| FAQ | `60px 68px 80px` |
| CTA Footer | `60px 68px` |
| Site Footer | `60px 68px 30px` |

### 4.2 Grid Layouts

```css
/* Service grid: 3-column */
.service-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; }

/* Portfolio grid: 3-column */
.portfolio-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; }

/* Testimonials grid: 3-column */
.testimonial-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; }

/* Site footer: 4-column (2fr 1fr 1fr 1fr) */
.site-footer__container { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
```

---

## 🃏 5. Component Styles

### 5.1 Service Cards

- **Featured card** (first): `border: 3.8px solid #FF7300`, subtle orange gradient background
- **Regular cards**: `border: 0.8px solid rgba(0,0,0,0.1)`, orange 2px top accent line via `::before`
- Hover: `translateY(-6px)`, shadow, border fades to orange-tint
- Icon: `80×80px` image, `margin-bottom: 10px`
- List items: orange `4px` dot bullet via `::before`
- CTA link: `color: #11434A` → orange on hover, gap expands from 14px → 18px

### 5.2 Focus Cards

- Size: `227px` wide
- Background: white, `border: 1px solid rgba(0,49,61,0.1)`, `border-radius: 12px`
- Icon container: `70×70px`, `border-radius: 50%`, subtle orange gradient bg
- Hover: `translateY(-6px)`, shadow, border fades orange

### 5.3 Portfolio Cards

- `border-radius: 12px`, `overflow: hidden`
- Image: `220px` height, dark overlay on hover + `scale(1.08)` zoom
- Tags: pill chips with category-specific tints (e-com=orange, photo=green, retail=blue, hotel=amber)
- View link: `color: #FF7300`, underline expands on hover

### 5.4 Testimonial Cards

- `padding: 28px 24px`
- `border-left: 4px solid #FF7300` (signature left accent)
- Opening `"` mark: `56px`, `color: #FF7300`, `opacity: 0.7`
- Author separator: `border-top: 1px solid rgba(0,49,61,0.06)`

### 5.5 FAQ Accordion

- Items separated by `border-bottom: 1px solid rgba(0,49,61,0.1)`
- Active state: `border-left: 3px solid #FF7300`, light orange bg
- Toggle icon: dark teal circle → rotates 45° and turns orange when active
- FAQ section heading: `color: #FF7300`, `font-style: italic`

---

## 🔘 6. Buttons

### Primary CTA (`.btn-cta-primary`)
```css
padding: 14px 28px;
background: linear-gradient(135deg, #FF8C1A 0%, #FF6600 100%);
color: #00181D;   /* very dark, not pure black */
border-radius: 6px;
font-family: var(--font-sf);
font-weight: 600;
font-size: 15px;
transition: transform 0.25s, box-shadow 0.25s;
/* hover: translateY(-3px) + box-shadow: 0 8px 20px rgba(255,115,0,0.4) */
```

### Hero CTA (`.hero__cta`) — slightly different
```css
height: 56px;  padding: 0 32px;
background: linear-gradient(135deg, #FF8C1A 0%, #FF6600 100%);
box-shadow: 0px 1px 2px rgba(14,67,74,0.06), 0px 8px 24px -12px rgba(255,115,0,0.3);
color: #00181D;
font-size: 16px;
```

### Secondary CTA (`.btn-cta-secondary`)
```css
padding: 14px 28px;
background: rgba(255,255,255,0.04);
color: #FFFFFF;
border: 1.5px solid rgba(255,255,255,0.2);
border-radius: 6px;
font-family: var(--font-sf);
font-weight: 600;
/* hover: border → white, bg → rgba(255,255,255,0.1), translateY(-2px) */
```

### Navbar Contact Button (`.navbar__contact`)
```css
padding: 10px 20px;
background: #052E34;
border-radius: 6px;
color: #FFFFFF;
font-size: 20px;
/* hover: background #073a42, translateY(-1px) */
```

### "View All" Button (`.btn-view-all`)
```css
padding: 12px 24px;
background: linear-gradient(135deg, #FF8C1A 0%, #FF6600 100%);
color: #FFFFFF;   /* white, unlike .btn-cta-primary */
border-radius: 6px;
font-weight: 600;
```

---

## 🌀 7. Hero Orbit Animation

Three concentric rings of spinning tech icons. The outer ring (440px) rotates clockwise at 32s, middle (320px) counter-clockwise at 24s, inner (200px) clockwise at 16s. Icons counter-rotate to stay upright.

```
Outer ring (440px):  Azure, CSS3, HTML5, React  →  32s clockwise
Middle ring (320px): Figma, Python              →  24s counter-clockwise
Inner ring (200px):  JavaScript, PHP            →  16s clockwise
Center:              ZNS logo (120×120px circle)
```

Icon dots: `46×46px` circle, `box-shadow: 0 4px 12px rgba(0,0,0,0.14)`, icon images from `devicons` CDN.
Ring border: `1px solid rgba(5, 46, 52, 0.22)` — thin, subtle.

---

## 📜 8. Marquee / "We Work With" Banner

Infinite horizontal scroll between hero and focus sections:

```html
<div class="we-work-with">
  <div class="we-work-with__inner">
    <span class="we-work-with__label">WE WORK WITH</span>
    <div class="marquee-container">
      <div class="marquee-track" id="marquee-track">
        <!-- items duplicated for seamless loop -->
        <span class="marquee-item">Jewellery</span>
        <span class="marquee-item">Photo Studios</span>
        ...
      </div>
    </div>
  </div>
</div>
```

Each `.marquee-item::before` shows a small `✦` orange bullet. Animation: `marqueeScroll 30s linear infinite` at -50% translateX.

---

## 🎆 9. Interactive FX Libraries

Every page **MUST** load all four FX scripts. Include in this order at the bottom of `<body>`:

```html
<!-- 1. Base JS -->
<script src="js/script.js"></script>

<!-- 2. MagicBento (card spotlight, tilt, particle stars) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="js/magic-bento.js"></script>

<!-- 3. SpecularButton (WebGL SDF rim highlight on buttons) -->
<script src="https://cdn.jsdelivr.net/npm/ogl@1.0.6/dist/ogl.umd.js"></script>
<script src="js/specular-button.js"></script>

<!-- 4. BlurText (word-by-word blur reveal on scroll) -->
<script src="js/blur-text.js"></script>

<!-- 5. ClickSpark (orange spark particles on every click) -->
<script src="js/click-spark.js"></script>
```

And in `<head>`:
```html
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="css/magic-bento.css" />
<link rel="stylesheet" href="css/specular-button.css" />
<link rel="stylesheet" href="css/blur-text.css" />
```

### FX Details

| FX | Target elements | Effect |
|---|---|---|
| **MagicBento** | `.focus-card`, `.service-card`, `.portfolio-card`, `.testimonial-card` | Orange `#FF7300` cursor spotlight glow on border, floating star particles, 3D tilt/magnetism |
| **SpecularButton** | `.btn-cta-primary`, `.navbar__contact`, `.btn-view-all`, `.hero__cta` | WebGL canvas overlay with SDF specular metallic rim light tracking mouse |
| **BlurText** | `h1, h2, h3, .section-heading` | `IntersectionObserver`-triggered word-by-word `blur(12px)→0` reveal on scroll |
| **ClickSpark** | `document` (global) | Fullscreen canvas — 10 orange spark lines radiate from every click point |

---

## 🧱 10. Standard Page HTML Shell

Use this exact shell for all new pages:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Page Name] — Zen Nova Solutions</title>
  <meta name="description" content="[Under 160 chars. Outcome-led. Mention ZNS.]" />
  <meta name="keywords" content="web development, UI/UX design, digital marketing, Zen Nova Solutions" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/magic-bento.css" />
  <link rel="stylesheet" href="css/specular-button.css" />
  <link rel="stylesheet" href="css/blur-text.css" />
  <link rel="icon" href="assest/logo-mark.webp" type="image/webp" />
</head>
<body>

  <!-- ======= ANNOUNCEMENT BAR ======= -->
  <div class="announcement-bar" id="announcement-bar">
    <a href="tel:+919345743409" class="announcement-bar__phone">91+ 9345743409</a>
    <div class="announcement-bar__center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      <a href="mailto:zennovasolution01@gmail.com" class="announcement-bar__email">zennovasolution01@gmail.com</a>
    </div>
    <div class="announcement-bar__socials">
      <a href="#" aria-label="Facebook"><!-- FB SVG --></a>
      <a href="#" aria-label="Instagram"><!-- IG SVG --></a>
      <a href="#" aria-label="YouTube"><!-- YT SVG --></a>
    </div>
  </div>

  <!-- ======= NAVBAR ======= -->
  <nav class="navbar" id="navbar">
    <a href="index.html" class="navbar__brand">
      <img src="assest/logo-mark.webp" alt="Zen Nova Solutions Logo" class="navbar__logo" />
      <span class="navbar__name">Zen Nova Solutions</span>
    </a>
    <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="navbar__links" id="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="index.html#our-focus">About</a></li>
      <li><a href="index.html#portfolio">Protofolio</a></li>
      <li><a href="index.html#faq">Pricing</a></li>
    </ul>
    <a href="#cta-footer" class="navbar__contact">Contact</a>
  </nav>

  <!-- ======= PAGE CONTENT ======= -->
  <!-- [Insert page-specific sections here] -->

  <!-- ======= CTA BANNER ======= -->
  <section class="cta-footer" id="cta-footer">
    <h2 class="cta-footer__heading">Ready to grow your business online?</h2>
    <p class="cta-footer__text">
      Let's build a digital experience that works for your business. Connect with our team today.
    </p>
    <div class="cta-footer__buttons">
      <a href="https://wa.me/919345743409" class="btn-cta-primary" target="_blank" rel="noopener noreferrer">
        Start Your Project
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
      </a>
      <a href="https://wa.me/919345743409" class="btn-cta-secondary" target="_blank" rel="noopener noreferrer">
        Talk on WhatsApp
      </a>
    </div>
  </section>

  <!-- ======= SITE FOOTER ======= -->
  <footer class="site-footer">
    <div class="site-footer__container">
      <!-- Col 1: Brand + Contact -->
      <div class="site-footer__col site-footer__brand">
        <a href="index.html" class="site-footer__logo-link">
          <img src="assest/logo-mark.webp" alt="Zen Nova Solutions" class="site-footer__logo" />
          <span class="site-footer__brand-name">Zen Nova Solutions</span>
        </a>
        <p class="site-footer__desc">Building high-converting digital experiences, websites, and marketing strategies engineered to help your business grow.</p>
        <div class="site-footer__contact-info">
          <a href="tel:+919345743409" class="site-footer__contact-item"><!-- phone SVG --> +91 9345743409</a>
          <a href="mailto:zennovasolution01@gmail.com" class="site-footer__contact-item"><!-- email SVG --> zennovasolution01@gmail.com</a>
        </div>
      </div>
      <!-- Col 2: Quick Links -->
      <div class="site-footer__col">
        <h4 class="site-footer__title">Quick Links</h4>
        <ul class="site-footer__links">
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="index.html#our-focus">About Us</a></li>
          <li><a href="index.html#portfolio">Portfolio</a></li>
          <li><a href="index.html#faq">FAQ &amp; Pricing</a></li>
        </ul>
      </div>
      <!-- Col 3: Services -->
      <div class="site-footer__col">
        <h4 class="site-footer__title">Services</h4>
        <ul class="site-footer__links">
          <li><a href="services.html">Frontend Development</a></li>
          <li><a href="services.html">Backend Development</a></li>
          <li><a href="services.html">Full-Stack Apps</a></li>
          <li><a href="services.html">UI/UX Design</a></li>
          <li><a href="services.html">Social Media Marketing</a></li>
        </ul>
      </div>
      <!-- Col 4: Industries -->
      <div class="site-footer__col">
        <h4 class="site-footer__title">Industries</h4>
        <ul class="site-footer__links">
          <li><a href="index.html#we-work-with">Jewellery &amp; Retail</a></li>
          <li><a href="index.html#we-work-with">Photo Studios</a></li>
          <li><a href="index.html#we-work-with">Restaurants &amp; Hotels</a></li>
          <li><a href="index.html#we-work-with">Healthcare &amp; Fintech</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p class="site-footer__copyright">&copy; 2026 Zen Nova Solutions. All rights reserved.</p>
      <div class="site-footer__socials">
        <a href="#" aria-label="Facebook"><!-- FB SVG --></a>
        <a href="#" aria-label="Instagram"><!-- IG SVG --></a>
        <a href="#" aria-label="YouTube"><!-- YT SVG --></a>
      </div>
    </div>
  </footer>

  <!-- ======= SCRIPTS (in this exact order) ======= -->
  <script src="js/script.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="js/magic-bento.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/ogl@1.0.6/dist/ogl.umd.js"></script>
  <script src="js/specular-button.js"></script>
  <script src="js/blur-text.js"></script>
  <script src="js/click-spark.js"></script>
</body>
</html>
```

---

## 📱 11. Responsive Breakpoints

```css
@media (max-width: 1100px) { /* Tablet landscape — hero shrinks, orbit 340px */ }
@media (max-width: 900px)  { /* Tablet — hero stacks, orbit hides or shrinks to 260px */ }
@media (max-width: 640px)  { /* Mobile — single column, padding 40px 20px */ }
```

Key mobile rules:
- Hero becomes vertical stack (`.hero` → `flex-direction: column`)
- `.service-grid` → `grid-template-columns: 1fr` (single column)
- `.portfolio-grid`, `.testimonial-grid` → single column on <640px
- Navbar links collapse behind hamburger
- Announcement bar phone / socials hide on very small screens

---

## ✍️ 12. Copywriting Standards (Research-Backed)

Based on Ramotion / Clay / Instrument agency benchmarks:

1. **Outcome-led headlines** — every section headline must tell the visitor what they *get*, not what ZNS *does*. E.g. "Pixel-accurate interfaces that load fast" > "We do frontend development".
2. **Plain sentences** — no jargon unless the audience clearly knows it (APIs, React are OK). Surrounding sentences stay conversational.
3. **Service pages are sales pages** — answer *"why does this matter to my business"* before the feature list.
4. **3–5 second value test** — the visitor must understand: *who we help + what problem we solve + why choose ZNS* from just the hero section.
5. **Contact details always visible** — WhatsApp: `https://wa.me/919345743409`, Phone: `tel:+919345743409`, Email: `zennovasolution01@gmail.com`.

---

## 🗂️ 13. File Map

```
d:\project\Zen novo\
├── index.html             ← Homepage
├── services.html          ← Services page
├── css/
│   ├── style.css          ← Master design system (ALL tokens here)
│   ├── magic-bento.css    ← Card glow FX styles
│   ├── specular-button.css← WebGL button canvas styles
│   └── blur-text.css      ← Word blur reveal transitions
├── js/
│   ├── script.js          ← Navbar, FAQ accordion, hamburger, orbit JS
│   ├── magic-bento.js     ← GSAP card spotlight + particles
│   ├── specular-button.js ← OGL WebGL SDF shader
│   ├── blur-text.js       ← IntersectionObserver word splitter
│   └── click-spark.js     ← Canvas spark burst on click
└── assest/
    ├── logo-mark.webp     ← Brand logomark
    ├── image.png          ← Service icon 1
    ├── image copy.png     ← Service icon 2
    ├── image copy 2.png   ← Service icon 3
    ├── image copy 3.png   ← Service icon 4
    ├── image copy 4.png   ← Service icon 5
    └── image copy 5.png   ← Service icon 6
```

---

## ✅ 14. Pre-launch Checklist for New Pages

Before committing any new page:
- [ ] Uses correct CSS file links (all 4 stylesheets)
- [ ] Loads all 5 JS FX scripts in correct order
- [ ] Announcement bar present with real phone + email
- [ ] Navbar active state — current page link has `style="color: var(--color-primary);"`
- [ ] All headings use verified color tokens (no invented colours)
- [ ] `.grow` word uses `color: #FF7300` + `text-shadow` NOT `background-clip: text`
- [ ] Service cards have orange top accent (featured = 3.8px full border, others = 2px `::before` top)
- [ ] CTA section uses `background: var(--color-dark-teal)` + white text
- [ ] Footer uses `background: #031D21`
- [ ] All CTAs link to `https://wa.me/919345743409` or `#cta-footer`
- [ ] Mobile breakpoints tested at 375px, 768px, 1100px
