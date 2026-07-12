# Implementation Plan

- [x] 1. Create `index.html` with full semantic structure and content



  - Add `<!DOCTYPE html>`, `<head>` with Google Fonts (JetBrains Mono + Inter), favicon inline SVG, and links to `style.css` / `script.js`
  - Add all seven `<section id="...">` blocks: hero, about, skills, projects, education, achievements, contact
  - Populate every section with the real content from requirements (name, bio, stats, skill chips, project cards, timeline entries, achievement items, contact cards)
  - Add inline SVG icons for email, phone, LinkedIn, GitHub in the contact section
  - Add trace rail markup (`rail-line`, `rail-node` × 7, `rail-signal`) and hamburger nav markup
  - Add "Download résumé" `<a href="resume.pdf" download>` in nav
  - _Requirements: 1.1, 1.2, 1.6, 2.1, 6.1, 6.4, 6.5, 6.6, 7.1, 8.1, 9.1, 9.2, 10.1, 11.1, 12.1, 12.2, 13.1_

- [x] 2. Write `style.css` — design tokens and base styles





  - Define all `:root` CSS custom properties: palette colors, font stacks, type scale, spacing, transition values
  - Set base reset, `body` background/color/font, `scroll-behavior: smooth`
  - Style typography: JetBrains Mono for headings/labels/data, Inter for body copy
  - _Requirements: 1.3, 3.1, 3.2, 3.3_

- [x] 3. Style trace rail and hamburger nav in `style.css`




  - Fixed left rail: thin line, evenly-spaced nodes, signal dot; node hover tooltip
  - `.active` / `.passed` node states: amber fill + glow
  - Teal signal dot with CSS `transition` on `transform`
  - Hamburger button (three `<span>` bars → × animation) and slide-down mobile menu
  - Media query `@media (max-width: 1179px)`: hide rail, show hamburger
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 13.1_

- [x] 4. Style all content sections in `style.css`





  - Hero: large name heading, typed-line with blinking cursor, bio, CTA button pair, stats row with amber values
  - About: two-column on desktop, single on mobile
  - Skills: flex-wrap chip grid per category
  - Projects: two-column card grid; card with panel bg, amber accent border, tag chips, GitHub link
  - Education: vertical timeline with CSS `::before` connector line and score badges
  - Achievements: date-badge + description list items
  - Contact: 2×2 card grid with icon + label + value
  - _Requirements: 3.1, 6.1–6.6, 7.1, 8.1, 9.1–9.3, 10.1, 11.1, 12.1–12.3_
-

- [x] 5. Add scroll-reveal CSS classes and responsive layout in `style.css`




  - `.reveal-pending` (opacity 0, translateY 24px, transition) and `.reveal-visible` (opacity 1, translateY 0)
  - Full responsive pass: breakpoints for tablet (≤ 768px) and mobile (≤ 480px) — stacking, font-size, padding
  - Visible keyboard focus rings on all interactive elements (`:focus-visible` outline in amber)
  - `@media (prefers-reduced-motion: reduce)` block: remove all transitions/animations, skip reveal pending state
  - _Requirements: 2.2, 2.3, 14.1, 14.3, 15.1–15.3_

- [x] 6. Implement typed subtitle effect in `script.js`





  - Define strings array: `["software engineering student.", "full-stack builder.", "AI enthusiast."]`
  - Type forward char by char, pause at full string, delete char by char, advance to next string in loop
  - Check `prefers-reduced-motion` — if true, set text to first string immediately with no animation
  - _Requirements: 6.2, 6.3, 2.3_

- [x] 7. Implement trace rail scrollspy and signal dot in `script.js`





  - Use `IntersectionObserver` (threshold 0.4) on each `<section>` to detect the active section
  - On intersection, update `.active` / `.passed` classes on corresponding rail nodes
  - Move signal dot by setting `style.top` to the active node's `offsetTop` (with CSS transition doing the animation)
  - Rail node click → `section.scrollIntoView({ behavior: 'smooth' })`
  - _Requirements: 4.2, 4.3, 4.4, 4.6_

- [x] 8. Implement hamburger menu behavior in `script.js`




  - Toggle `isOpen` state on hamburger button click; add/remove `.open` class on menu and button
  - Close menu on any nav link click (scroll to section)
  - Close menu on Escape keydown
  - _Requirements: 5.2, 5.3, 5.4_

- [x] 9. Implement scroll-reveal observer in `script.js`





  - Query all `[data-reveal]` elements; add `.reveal-pending` class (skip if `prefers-reduced-motion`)
  - Create `IntersectionObserver` (threshold 0.12); on entry swap `.reveal-pending` → `.reveal-visible`, then unobserve
  - _Requirements: 14.1, 14.2, 14.3_
