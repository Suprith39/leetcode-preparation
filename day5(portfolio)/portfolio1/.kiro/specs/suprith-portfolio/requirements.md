# Requirements Document

## Introduction

A single-page personal portfolio website for Suprith S, an Information Science engineering student and AI enthusiast at Vidyavardhaka College of Engineering, Mysore. Built with plain HTML, CSS, and JavaScript only — no frameworks, no build tools. The site reflects a systems-minded builder: precise, technical, and purposeful. It features a signature vertical "trace rail" navigation, scroll-reveal animations, and a typed looping subtitle in the hero.

## Requirements

### Requirement 1 — Project Setup & Technical Constraints

**User Story:** As a developer, I want a zero-dependency static site, so that it runs by opening index.html directly in any browser without a build step.

#### Acceptance Criteria

1. WHEN the project is delivered THEN it SHALL consist of exactly three files: `index.html`, `style.css`, `script.js`
2. WHEN `index.html` is opened in a browser THEN the site SHALL render fully with no server, build tool, or npm dependency required
3. WHEN styles are defined THEN they SHALL use CSS custom properties (`:root` tokens) for all palette colors and type scale values — no inline styles
4. WHEN JavaScript is written THEN it SHALL be vanilla JS only with no external libraries
5. WHEN the page loads THEN it SHALL load JetBrains Mono and Inter from Google Fonts
6. WHEN the browser tab renders THEN it SHALL display an inline SVG favicon: a dark rounded square with an amber "S"

---

### Requirement 2 — Semantic Structure & Accessibility

**User Story:** As a visitor using assistive technology or keyboard navigation, I want a well-structured, accessible page, so that I can navigate and consume all content without barriers.

#### Acceptance Criteria

1. WHEN the HTML is authored THEN it SHALL use semantic HTML5 elements with one `<section id="...">` per content block (hero, about, skills, projects, education, achievements, contact)
2. WHEN any interactive element receives keyboard focus THEN it SHALL display a clearly visible focus ring
3. WHEN the user has `prefers-reduced-motion` enabled THEN all animations and transitions SHALL be disabled or reduced to instant/no-motion equivalents
4. WHEN anchor/scroll navigation is used THEN each section `id` SHALL match the nav link `href` so in-page scrolling works correctly

---

### Requirement 3 — Design System & Visual Direction

**User Story:** As a visitor, I want a distinctive, technically-minded visual style, so that the site feels like it belongs to a systems-builder rather than a generic portfolio template.

#### Acceptance Criteria

1. WHEN the page renders THEN the background SHALL use deep navy `#0B1220`, panel areas `#101B2D`, primary text `#E8EDF4`, secondary text `#93A1B8`, amber accent `#F5A623`, and teal accent `#4FD1C5`
2. WHEN headings, labels, and data values are displayed THEN they SHALL use JetBrains Mono
3. WHEN body copy is displayed THEN it SHALL use Inter
4. WHEN the design is reviewed THEN it SHALL NOT use cream/terracotta, plain dark + neon, or hairline-newspaper layouts

---

### Requirement 4 — Trace Rail Navigation (Desktop)

**User Story:** As a desktop visitor, I want a vertical trace rail on the left edge of the viewport, so that I can see my scroll progress and jump to any section instantly.

#### Acceptance Criteria

1. WHEN the viewport is ≥ 1180px wide THEN a fixed vertical rail SHALL be visible on the left edge containing one node per section
2. WHEN the user scrolls into a section THEN that section's rail node SHALL fill and glow amber, and previous nodes SHALL remain filled
3. WHEN the user scrolls THEN a small teal "signal" dot SHALL slide along the rail to sit at the currently active section node
4. WHEN a rail node is clicked THEN the page SHALL smooth-scroll to the corresponding section
5. WHEN the viewport is < 1180px wide THEN the trace rail SHALL be hidden and replaced by a hamburger menu
6. WHEN scrollspy detection is implemented THEN it SHALL use `IntersectionObserver` — no scroll-event polling

---

### Requirement 5 — Hamburger Menu (Mobile/Tablet)

**User Story:** As a mobile or tablet visitor, I want a hamburger menu for navigation, so that I can reach any section without the trace rail taking up screen space.

#### Acceptance Criteria

1. WHEN the viewport is < 1180px THEN a hamburger icon SHALL appear in the top corner
2. WHEN the hamburger is tapped THEN a nav menu SHALL open listing all section links
3. WHEN a nav link is tapped THEN the menu SHALL close and the page SHALL scroll to that section
4. WHEN the menu is open THEN pressing Escape SHALL close it

---

### Requirement 6 — Hero Section

**User Story:** As a first-time visitor, I want an impactful hero section, so that I immediately understand who Suprith is and what he does.

#### Acceptance Criteria

1. WHEN the hero renders THEN it SHALL display the name "Suprith S" as the primary heading
2. WHEN the hero renders THEN it SHALL show a looping typed subtitle cycling through: "software engineering student." / "full-stack builder." / "AI enthusiast."
3. WHEN the typed subtitle cycles THEN it SHALL type forward, pause, delete, then type the next phrase in a continuous loop
4. WHEN the hero renders THEN it SHALL show the bio line: "Information Science engineering student who builds full-stack systems end to end — from a QR-based agricultural traceability platform to a live telehealth app."
5. WHEN the hero renders THEN it SHALL show two CTA buttons: "See the work" (scrolls to Projects) and "Get in touch" (scrolls to Contact)
6. WHEN the hero renders THEN it SHALL show a quick stats row: CGPA 7.71 · Projects shipped 02 · Hackathons 02 · Core stack Java / SQL / C

---

### Requirement 7 — About Section

**User Story:** As a recruiter or collaborator, I want a concise about section, so that I can quickly understand Suprith's background and interests.

#### Acceptance Criteria

1. WHEN the about section renders THEN it SHALL display the following copy: "Studies B.E. Information Science at Vidyavardhaka College of Engineering, Mysore. AI enthusiast. Interested in problems involving tracking/verifying real-world processes (supply chains, healthcare access). Prefers software that stays honest about what's actually happening underneath the UI. Looking for an entry-level role to keep building that kind of system."

---

### Requirement 8 — Skills Section

**User Story:** As a recruiter, I want to see Suprith's skills grouped by category, so that I can quickly assess technical fit.

#### Acceptance Criteria

1. WHEN the skills section renders THEN skills SHALL be displayed as tag/chip elements grouped under the following categories:
   - Languages: C, Java
   - Foundations: Data Structures & Algorithms, OOP (Java), Operating Systems, Computer Networks
   - Database: SQL
   - Tools: Git & GitHub, Docker, Jenkins
   - Working style: Collaborative, Proactive, Delivers results

---

### Requirement 9 — Projects Section

**User Story:** As a visitor, I want to see Suprith's projects with enough detail to understand what he built and why.

#### Acceptance Criteria

1. WHEN the projects section renders THEN it SHALL display the AgriTrace project with: title "AgriTrace — Agricultural Supply Chain Traceability System", description, tags (Full-stack, QR tracking, Role-based access, Geo-verification), and a GitHub link to `https://github.com/Suprith39`
2. WHEN the projects section renders THEN it SHALL display the Video Healthcare project with: title "Video Healthcare Consultation Platform", description, tags (Real-time video, Live chat, Location discovery), and a GitHub link to `https://github.com/Suprith39`
3. WHEN a project link is clicked THEN it SHALL open in a new tab

---

### Requirement 10 — Education Section

**User Story:** As a recruiter, I want to see Suprith's education history in a clear timeline, so that I can verify his academic background.

#### Acceptance Criteria

1. WHEN the education section renders THEN it SHALL display a timeline (most recent first) with:
   - B.E. Information Science, Vidyavardhaka College of Engineering, Mysore — CGPA 7.71
   - 12th / Pre-University, Govt PU College, Kusanur — 87.5%
   - 10th / SSLC, Sharada English Medium School, Kusanur — 94.6%

---

### Requirement 11 — Achievements Section

**User Story:** As a recruiter, I want to see Suprith's hackathon participation, so that I can gauge his initiative outside of coursework.

#### Acceptance Criteria

1. WHEN the achievements section renders THEN it SHALL display:
   - Sep 2024 — Participant, Cryptoshield Hackathon (Amrutha Vishwa Vidyapeetam)
   - Apr 2026 — Participant, SYMBIOT Hackathon

---

### Requirement 12 — Contact Section

**User Story:** As a recruiter or collaborator, I want easy access to all of Suprith's contact channels, so that I can reach out through my preferred method.

#### Acceptance Criteria

1. WHEN the contact section renders THEN it SHALL show cards/buttons for: Email (`mailto:suprithns.25@gmail.com`), Phone (`tel:+919380461995`), LinkedIn (`https://www.linkedin.com/in/suprith-n-s/`), GitHub (`https://github.com/Suprith39`)
2. WHEN contact icons are displayed THEN they SHALL use inline SVG icons (not icon fonts or CDN)
3. WHEN each contact link is clicked THEN it SHALL open with the correct protocol (`mailto:`, `tel:`, or new tab for external URLs)

---

### Requirement 13 — Resume Download

**User Story:** As a recruiter, I want to download Suprith's résumé directly from the nav, so that I don't have to hunt for it.

#### Acceptance Criteria

1. WHEN the navigation renders THEN it SHALL include a "Download résumé" link pointing to `resume.pdf` in the same directory
2. WHEN the link is clicked THEN it SHALL trigger a file download (using the `download` attribute)

---

### Requirement 14 — Scroll Reveal Animations

**User Story:** As a visitor, I want subtle scroll-driven reveal animations, so that the page feels alive without being distracting.

#### Acceptance Criteria

1. WHEN a section scrolls into the viewport THEN its content SHALL fade in with a slight upward rise
2. WHEN scroll-reveal is implemented THEN it SHALL use `IntersectionObserver` — no scroll-event polling
3. WHEN `prefers-reduced-motion` is active THEN scroll-reveal animations SHALL be skipped (content visible immediately)

---

### Requirement 15 — Responsive Layout

**User Story:** As a visitor on any device, I want the site to be fully usable, so that I can browse on mobile, tablet, or desktop without layout issues.

#### Acceptance Criteria

1. WHEN the viewport is < 1180px THEN the trace rail SHALL be hidden and the hamburger nav SHALL be shown
2. WHEN the viewport is a mobile width THEN all sections SHALL stack vertically and remain readable
3. WHEN the layout adapts THEN no content SHALL be clipped, overlapped, or horizontally scrollable
