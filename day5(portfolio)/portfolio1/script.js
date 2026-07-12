/* script.js */

/* ── Typed subtitle effect ─────────────────────────────────────────── */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = [
    'software engineering student.',
    'full-stack builder.',
    'AI enthusiast.'
  ];

  // Respect prefers-reduced-motion (Requirement 2.3, 6.3)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = strings[0];
    return;
  }

  const TYPE_SPEED   = 65;   // ms per character while typing
  const DELETE_SPEED = 35;   // ms per character while deleting
  const PAUSE_AFTER  = 1800; // ms pause at full string
  const PAUSE_BEFORE = 400;  // ms pause before typing next string

  let stringIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function tick() {
    const current = strings[stringIndex];

    if (!isDeleting) {
      // Type forward one character
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Full string typed — pause, then start deleting
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // Delete one character
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Fully deleted — advance to next string
        isDeleting  = false;
        stringIndex = (stringIndex + 1) % strings.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
})();

/* ── Trace Rail Scrollspy ──────────────────────────────────────────── */
(function initTraceRail() {
  const sections  = document.querySelectorAll('section[id]');
  const nodes     = document.querySelectorAll('.rail-node');
  const signal    = document.querySelector('.rail-signal');

  if (!nodes.length || !signal) return;

  // Build a map: section id → rail node element
  const nodeMap = {};
  nodes.forEach(node => {
    nodeMap[node.dataset.section] = node;
  });

  let activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;

    let passed = true; // sections before the active one are "passed"
    nodes.forEach(node => {
      const sectionId = node.dataset.section;
      if (sectionId === id) {
        node.classList.add('active');
        node.classList.remove('passed');
        passed = false; // sections after active are neither
        // Move signal dot to this node's vertical position
        signal.style.top = node.offsetTop + 'px';
      } else if (passed) {
        node.classList.add('passed');
        node.classList.remove('active');
      } else {
        node.classList.remove('active', 'passed');
      }
    });
  }

  // IntersectionObserver — threshold 0.4 per requirement 4.6
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));

  // Rail node click → smooth scroll to section (Requirement 4.4)
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const target = document.getElementById(node.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ── Hamburger Menu ────────────────────────────────────────────────── */
(function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const menu      = document.querySelector('.mobile-menu');

  if (!hamburger || !menu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('open');
    menu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // Toggle on hamburger click (Requirement 5.2)
  hamburger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on nav link click and scroll to section (Requirement 5.3)
  menu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Close on Escape key (Requirement 5.4)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
})();

/* ── Scroll Reveal ─────────────────────────────────────────────────── */
(function initScrollReveal() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('[data-reveal]');

  if (!elements.length) return;

  // If reduced motion, leave elements visible immediately (Requirement 14.3)
  if (reducedMotion) return;

  // Set initial hidden state on all reveal elements (Requirement 14.1)
  elements.forEach(el => el.classList.add('reveal-pending'));

  // IntersectionObserver at threshold 0.12 — no scroll-event polling (Requirement 14.2)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();
