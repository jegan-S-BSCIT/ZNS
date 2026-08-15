# Zen Nova Solutions — pricing.md

Full spec for the **Pricing** page (linked from `index.md`). Built on what makes pricing pages convert: a fast side-by-side comparison, one clearly recommended plan, no hidden gaps a visitor has to guess at, and an FAQ that closes the objections a comparison table can't.

Colors, header, footer, and CTA pattern follow `index.md` — this file only covers what's unique to the Pricing page.

---

## Design Principles Behind This Spec

1. **Reduce the mental math.** The fewer decisions a visitor has to make on their own, the faster they pick a plan — so the middle tier is visually emphasized as the recommended default.
2. **Cards for the quick scan, a table for the detail.** Side-by-side cards work for a fast comparison; a full feature table below catches the visitor who wants every difference spelled out before deciding.
3. **Transparent pricing builds trust.** All three prices stay visible on the page — nothing behind a "contact us" wall, since that adds friction for a local-business visitor who just wants a number.
4. **Every plan gets its own CTA**, not one generic button at the bottom of the page.
5. **Flag what's genuinely unclear rather than inventing it.** A few real-world details (payment terms, revision rounds, whether domain/hosting is included) aren't in the current site content — this spec marks those clearly so you fill in the real answer instead of me guessing.

---

## Page Hero

**Layout:** Centered intro directly above the pricing cards — no separate hero visual needed, since the cards themselves are the page's focal point.

**Eyebrow:** Pricing

**Headline:**
> Simple, Transparent Pricing

**Subheadline:**
> Three plans built for local business budgets — see exactly what's included, no hidden costs.

---

## Pricing Cards

**Layout:** 3-column side-by-side (stacked on mobile), middle card visually emphasized — larger, bordered, or elevated — with a "Most Popular" badge.

### Starter — ₹3,500
*For businesses that need a clean, functional website live fast.*
- 5 Pages
- Responsive Design
- WhatsApp Integration
- Contact Form
- Google Maps
- 7 Days Support

**CTA:** Get Started

---

### Professional — ₹5,000 — Most Popular
*For businesses that want to look established and show up locally.*
- Everything in Starter
- Custom UI
- Google Business Profile Setup
- Gallery
- Custom Contact Page
- 15 Days Support

**CTA:** Get Started

---

### Premium — ₹7,000
*For businesses that want the full premium experience, ready to convert from day one.*
- Everything in Professional
- Premium UI
- Booking Form
- Advanced Animations
- Priority Support
- 30 Days Support

**CTA:** Get Started

---

## Feature Comparison Table

**Layout:** Full-width table below the cards — same three plans as columns, every feature as a row, checkmarks or values per cell. This is for the visitor who scrolled past the cards still deciding.

| Feature | Starter (₹3,500) | Professional (₹5,000) | Premium (₹7,000) |
|---|---|---|---|
| Pages | 5 | 5+ | 5+ |
| Responsive Design | ✅ | ✅ | ✅ |
| WhatsApp Integration | ✅ | ✅ | ✅ |
| Contact Form | ✅ | ✅ | ✅ |
| Google Maps | ✅ | ✅ | ✅ |
| Custom UI | — | ✅ | ✅ |
| Google Business Profile Setup | — | ✅ | ✅ |
| Gallery | — | ✅ | ✅ |
| Custom Contact Page | — | ✅ | ✅ |
| Premium UI | — | — | ✅ |
| Booking Form | — | — | ✅ |
| Advanced Animations | — | — | ✅ |
| Priority Support | — | — | ✅ |
| Support Window | 7 Days | 15 Days | 30 Days |

---

## "Which Plan Is Right for You?"

**Purpose:** Removes the guesswork for a visitor who doesn't know how to map their business needs onto a plan name.

**Layout:** Short paragraph or 3-line guide, sits between the table and the FAQ.

**Copy:**
> New to having a website at all? Starter gets you live fast with everything essential. Want to show up when nearby customers search on Google? Professional adds Google Business Profile setup, built specifically for that. Taking bookings directly through your site, or want the most polished first impression possible? Premium is built for that.

---

## Add-Ons & Standalone Services

**Purpose:** Not every visitor wants a full website plan — some just need one service. This section prevents them from thinking website design is the *only* thing you offer.

**Copy:**
> Already have a website and just need branding, social creatives, or video editing? Those are available as standalone services, quoted based on scope. See the [Services page] for details, or reach out and we'll give you a clear number.

---

## Trust / Reassurance Line

**Layout:** Small text band under the comparison table, not a full section — a quiet trust signal, not a hard sell.

**Copy:**
> Fixed pricing, no surprise costs. What you see here is what you pay for the plan you choose.

*[Gap to fill before publishing: confirm whether domain and hosting costs are included in these prices or billed separately — this isn't specified in the current content, and it's one of the first questions a visitor will have. Same for payment terms (full amount upfront vs. milestone-based) and how many design revision rounds are included per plan.]*

---

## Pricing FAQ

- **Is domain and hosting included in the price?** *[Confirm and fill in — not currently specified.]*
- **How do I pay?** *[Confirm and fill in — e.g. full amount upfront, 50% to start, or milestone-based.]*
- **How many revisions are included?** *[Confirm and fill in — visitors on Professional/Premium in particular will expect this answered.]*
- **What happens after my support window ends?** You can reach out anytime after your support period for updates or fixes — these are handled separately once the included window closes.
- **Can I upgrade my plan later?** Yes — if you start with Starter and want to add Professional or Premium features later, we can upgrade your site rather than rebuilding from scratch.
- **Do you offer custom pricing outside these three plans?** For larger or more complex projects, reach out and we'll scope it separately.

---

## Final CTA Banner

**Heading:** Ready to Get Started?
**Subheading:** Pick a plan, or tell us what you need — we reply within one business day.
**CTA buttons:** Book Free Consultation · Chat on WhatsApp

---

## Summary of What Changed vs. the Current Site

- Added a **full feature comparison table** underneath the existing cards — the cards alone work for a fast scan, but the table catches visitors who want every difference spelled out before paying.
- Added a **"Which Plan Is Right for You?"** section — the current site lists three plans but gives no guidance on how to choose between them.
- Added an **Add-Ons / Standalone Services** note so visitors who don't need a full website (just branding or video editing) aren't left assuming website design is the only option.
- Flagged **three real gaps** (domain/hosting inclusion, payment terms, revision rounds) that the current pricing content doesn't specify — these are exactly the questions that stall a visitor right before they'd otherwise convert, so worth confirming before this page goes live rather than leaving them to ask over WhatsApp.# Zen Nova Solutions — index.md
### Master Site Reference & AI Build Prompt

This file is the single source of truth for the whole website. It does not contain full page copy — each page's detailed content lives in its own file (`service.md`, `portfolio.md`, etc.). This file contains what applies **everywhere**: brand colors, structure, global components, and site functions.

**How to use this file:** If you're an AI (or developer) implementing this site, read this file first for the design system and sitemap, then open the matching content file for a given page to get its exact section-by-section copy. Don't invent structure that contradicts this file — treat it as the constraint layer, and the page files as the content layer.

---

## 1. Brand & Design System

### Colors

| Name | Hex | Role | Usage |
|---|---|---|---|
| Deep Green | `#264653` | Primary | Header/nav background, footer background, primary body text on light sections, dark UI blocks |
| Vivid Orange | `#fb8500` | Accent / CTA | Buttons, links, hover states, highlights, badges. Keep this the *only* loud color on a page — if everything is orange, nothing stands out. |
| Warm Cream White | `#fefae0` | Base / Background | Page background, card backgrounds, negative space |

**Contrast pairing rules:**
- Orange CTA buttons sit on cream or green backgrounds — never orange text on white, and never orange-on-orange.
- Green is dark enough to use as body text on cream backgrounds, or as a background with cream/white text on top.
- Avoid pairing green text directly on orange, or orange text directly on green — check contrast before using it (low-contrast combos will fail accessibility and are hard to read).

**Suggested neutral additions** *(optional — confirm with whoever's doing visual design before locking in)*: a mid-gray (e.g. `#6b6b6b`) for secondary/muted text, and pure white (`#ffffff`) for text on top of the green header where cream would feel too close in tone.

### Typography *(suggestion, not locked)*
A clean, modern sans-serif (e.g. Inter, Poppins, or similar) for both headings and body — keeps the site feeling premium without competing with the color palette for attention. Headings can carry more weight (semi-bold/bold); body text stays regular weight for readability.

### Tone of Voice
Plain, conversational, benefit-first. Short sentences. Speaks directly to the local-business owner ("you"), not at them. No jargon. Established across all page files already written — keep new content consistent with this.

---

## 2. Project Overview

**Company:** Zen Nova Solutions — digital agency based in Tamil Nadu, founded September 2025.
**Leadership:** R. Karthikeyan (Founder & CEO), Jegan. S (Managing Director).
**What the site needs to do:** Convert local-business visitors into booked consultations — every page should have a clear, repeated path to "Book Free Consultation" or WhatsApp.
**Audience:** Local and small businesses across Tamil Nadu / South India who need a website, branding, or visibility help, and are comparing agencies on trust and price.

---

## 3. Site Map & File Reference

| Page | Content File | Status | Covers |
|---|---|---|---|
| Home | `zen-nova-solutions-homepage-spec.md` | ✅ Done | Hero, trust strip, services teaser, process, why-us, portfolio teaser, pricing teaser, about teaser, FAQ, final CTA |
| Services | `zen-nova-solutions-services-spec.md` | ✅ Done | All 6 services in full depth, "where to start" guide, services FAQ |
| Portfolio | `portfolio.md` | ⬜ Not yet created | Full case studies per project (currently only teaser versions exist in the homepage file) |
| Pricing | `pricing.md` | ⬜ Not yet created | Full plan breakdown, comparison detail, pricing FAQ |
| About | `about.md` | ⬜ Not yet created | Full leadership bios, mission/vision/values, studio story |
| Contact | `contact.md` | ⬜ Not yet created | Form spec, contact details, map embed, response-time expectations |

> Say the word and I'll build out `portfolio.md`, `pricing.md`, `about.md`, and `contact.md` next, matching this same file-per-page structure.

---

## 4. Global Components (appear on every page)

**Header / Nav**
- Logo (left) · Nav links: Home · Services · Portfolio · Pricing · About · Contact · Persistent CTA button: **Book Free Consultation** (right, visible on scroll)

**Footer**
- Brand blurb + tagline
- Quick links (same as nav)
- Contact block: phone, email, location
- Social links: [Instagram](https://www.instagram.com/zennova_solutions/) · [LinkedIn](https://www.linkedin.com/in/zen-nova-solutions)
- Copyright bar with leadership credit

**Repeating CTA pattern**
- Primary: "Book Free Consultation" (appears in header, hero, and every major section break)
- Secondary: "Chat on WhatsApp" (appears alongside primary CTA at key conversion points — hero, final banner, contact page)

---

## 5. Core Site Functions

- **Contact form** — Full name, Email, Phone, Service interested in (dropdown), Message → submits to `zennovasolution01@gmail.com`
- **WhatsApp click-to-chat** — `+91 93457 43409`, available from header/footer/contact/final CTA banner
- **Google Maps embed** — on Contact page, showing Tamil Nadu service area
- **Google Business Profile link** — external link, referenced in footer or contact page
- **Social links** — Instagram and LinkedIn, in footer (and optionally contact page)
- **Responsive requirement** — mobile-first; every page must be tested at phone, tablet, and desktop widths before considered complete

---

## 6. Build Notes for AI Implementation

- Apply the color system (Section 1) globally — don't introduce new colors per page.
- Use this file for anything cross-page (header, footer, CTAs, tone). Use the matching page file (Section 3) for exact section content on that page.
- Keep the CTA pattern identical across pages — don't invent new button labels per page.
- Where a page file says a section is a "placeholder" (e.g. testimonials) — leave it out of the build rather than inventing filler content.
- Files still marked ⬜ in Section 3 don't have detailed specs yet — use the relevant teaser content from the homepage file as a fallback until the full page file is created.