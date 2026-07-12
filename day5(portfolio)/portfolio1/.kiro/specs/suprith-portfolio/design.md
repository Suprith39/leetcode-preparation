# Design Document — Suprith S Portfolio

## Overview

A single-page portfolio site delivered as three static files (`index.html`, `style.css`, `script.js`). No build step, no dependencies beyond two Google Fonts. The visual identity centers on a deep navy/ink palette with amber and teal accents, monospace headings, and a signature vertical trace rail that doubles as primary desktop navigation. The overall feel is precise and systems-minded — built by someone who cares about what's happening underneath the UI.

---

## Architecture

```
/
├── index.html       — all markup, inline SVG favicon, section scaffolding
├── style.css        — design tokens, layout, components, animations, responsive
├── script.js        — typed subtitle, trace rail scrollspy, scroll-reveal, hamburger
└── resume.pdf       — supplied separately by user
```

The page is a single scrollable document. No routing, no state management. JavaScript enhances progressively — if JS is disabled, content is still readable (just no animations or typed effect).

**Loading order:** `<link>` to Google Fonts in `<head>`, `style.css` linked in `<head>`, `script.js` deferred at end of `<body>`.

---

## Components and Interfaces

### 1. CSS Design Tokens (`:root`)

```css
--color-bg:         #0B1220;
--color-panel:      #101B2D;
--color-text:       #E8EDF4;
--color-text-muted: #93A1B8;
--color-amber:      #F5A623;
--color-teal:       #4FD1C5;

--font-mono: 'JetBrains Mono', monospace;
--font-body: 'Inter', sans-serif;

/* type scale, spacing scale, transition tokens */
```

### 2. Trace Rail (desktop, ≥ 1180px)

Fixed `position: fixed; left: 0; top: 0; height: 100vh`. Contains:
- A thin vertical `<div class="rail-line">` (1–2px wide, muted color)
- One `<button class="rail-node" data-section="...">` per section, evenly spaced vertically
- A `<div class="rail-signal">` teal dot that `transform: translateY(...)` to the active node

State transitions via JS adding/removing `.active` and `.passed` classes on nodes. The signal dot moves with a CSS transition on `top` or `transform`.

Rail node labels appear as tooltip-style text on hover (right of node, absolute positioned).

Hides via `display: none` / `visibility: hidden` below 1180px breakpoint.

### 3. Hamburger Menu (< 1180px)

Fixed top-right `<nav class="mobile-nav">`:
- `<button class="hamburger">` with three `<span>` bars, animates to × when open
- `<ul class="mobile-menu">` slides down / fades in when open
- Links match the same section IDs as the rail nodes
- "Download résumé" link included
- Close on link click or Escape key

### 4. Hero Section

```
<section id="hero">
  <h1>Suprith S</h1>
  <p class="typed-line"><span id="typed-text"></span><span class="cursor">|</span></p>
  <p class="bio">...</p>
  <div class="cta-group">
    <a href="#projects" class="btn btn-primary">See the work</a>
    <a href="#contact" class="btn btn-outline">Get in touch</a>
  </div>
  <div class="stats-row">...</div>
</section>
```

Typed effect: JS cycles through an array of strings, types character by character with a small delay, pauses, deletes, then moves to next string. Respects `prefers-reduced-motion` by just displaying all strings statically or showing the first string instantly.

Stats row: four items separated by a muted `·` divider. Labels in Inter, values in JetBrains Mono + amber.

### 5. About Section

Simple two-column layout on desktop (label column + content column), single column on mobile.

### 6. Skills Section

Category label (`<h3>`) followed by a flex-wrap row of `<span class="skill-chip">` elements. Chips use amber border/text for language chips, teal for tool chips, muted for others — or a consistent amber outline style for all.

### 7. Projects Section

Two `<article class="project-card">` elements inside a grid (two columns on desktop, one on mobile). Each card:
- Title (JetBrains Mono)
- Description paragraph
- Tag chips row
- GitHub link with inline SVG icon

Cards use `--color-panel` background with a subtle amber top-border accent or left-border accent on hover.

### 8. Education Section

Vertical timeline using CSS `::before` pseudo-element for the connecting line. Each entry is a `<div class="timeline-entry">`:
- Year/institution label
- Degree/level
- Score badge (amber chip)

### 9. Achievements Section

Simple list of `<div class="achievement-item">` each with a date badge (JetBrains Mono, amber) and description.

### 10. Contact Section

Four `<a class="contact-card">` elements in a 2×2 grid (collapsing to 1 column on mobile). Each card:
- Inline SVG icon (32×32)
- Label (e.g. "Email")
- Value/handle text
- Correct `href` (`mailto:`, `tel:`, or `https://`)

SVG icons: envelope (email), phone handset (phone), LinkedIn "in" logo, GitHub octocat outline.

### 11. Nav Bar / Download Résumé

On desktop the nav is minimal — just the "Download résumé" button floated top-right (since the rail handles section nav). On mobile it's inside the hamburger menu. The button uses `<a href="resume.pdf" download>`.

---

## Data Models

No dynamic data. All content is hardcoded in HTML. The only JS "state" is:

```js
// Typed effect
{ strings: [...], currentIndex, charIndex, isDeleting }

// Scrollspy
{ activeSectionId: string }  // tracked by IntersectionObserver callback

// Mobile menu
{ isOpen: boolean }
```

---

## Error Handling

- If Google Fonts fails to load, the stack fallbacks (`monospace`, `sans-serif`) keep text readable.
- `resume.pdf` not existing causes a 404 — no JS handling needed; the link just won't download.
- `IntersectionObserver` is supported in all modern browsers; no polyfill needed for the target audience.

---

## Scroll Reveal

Each section and key child elements get a `data-reveal` attribute. On page load, JS queries all `[data-reveal]` elements, sets initial CSS:

```css
.reveal-pending {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
```

`IntersectionObserver` with `threshold: 0.12` swaps the class when the element enters the viewport. `prefers-reduced-motion` check disables the initial hidden state so content is immediately visible.

---

## Testing Strategy

Manual testing checklist (no automated test framework — static HTML/CSS/JS):

1. Open `index.html` directly in Chrome, Firefox, and Edge — confirm full render
2. Resize to 1180px, 768px, 375px — confirm rail/hamburger breakpoint and layout
3. Tab through all interactive elements — confirm focus rings visible
4. Enable OS reduced-motion setting — confirm no animations
5. Click all nav links (rail nodes, hamburger menu) — confirm smooth scroll to correct section
6. Verify typed effect cycles all three strings
7. Verify trace rail signal dot moves correctly through all 7 sections
8. Test all contact links open with correct protocols
9. Test "Download résumé" triggers download
10. Test "See the work" and "Get in touch" CTAs scroll to correct sections

---

## Visual Layout Sketch

```
[viewport]
┌─────────────────────────────────────────────────────┐
│ ●  │                                   [Download CV] │  ← top nav (desktop)
│ │  │                                                 │
│ ●  │   HERO                                          │
│ │  │   Suprith S                                     │
│ ●  │   > software engineering student._              │
│ │  │   bio line...                                   │
│ ●  │   [See the work]  [Get in touch]                │
│ │  │   CGPA 7.71 · 02 projects · ...                 │
│ ●  │                                                 │
│ │  │   ABOUT  /  SKILLS  /  PROJECTS  / ...          │
│ ●  │                                                 │
└─────────────────────────────────────────────────────┘
  ↑
trace rail (fixed left)
```
