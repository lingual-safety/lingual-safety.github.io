/**
 * LingualSafety 1.0 - Main JavaScript
 * Reads from window.SITE_CONFIG (set in js/config.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  const C = window.SITE_CONFIG;

  // -- Inject configurable links throughout the document
  function setLinks(selector, url, label) {
    document.querySelectorAll(selector).forEach(el => {
      if (url && url !== 'TODO') {
        el.href = url;
        el.removeAttribute('data-disabled');
      } else {
        el.href = '#';
        el.setAttribute('data-disabled', 'true');
        if (el.getAttribute('data-tba-label')) {
          el.textContent = el.getAttribute('data-tba-label') || label || 'To be announced';
        }
      }
    });
  }

  setLinks('[data-link="codalab"]', C.codalabURL || C.codabenchURL, 'CodaLab');
  setLinks('[data-link="codabench"]', C.codalabURL || C.codabenchURL, 'CodaLab');
  setLinks('[data-link="github"]', C.githubURL, 'GitHub');
  setLinks('[data-link="baseline"]', C.baselineURL, 'Baseline');
  setLinks('[data-link="dataset"]', C.datasetURL, 'Dataset');
  setLinks('[data-link="icon"]', C.iconConferenceURL, 'ICON 2026');
  setLinks('[data-link="contact"]', C.contactEmail ? `mailto:${C.contactEmail}` : '#', 'Contact');
  setLinks('[data-link="registration"]', C.registrationURL, 'Registration');

  // Populate dates
  const dateMapping = {
    'date-registration-open':   C.dates.registrationOpen,
    'date-training-release':    C.dates.trainingDataRelease,
    'date-dev-start':           C.dates.developmentPhaseStart,
    'date-dev-end':             C.dates.developmentPhaseEnd,
    'date-submission':          C.dates.submissionDeadline,
    'date-results':             C.dates.resultsLeaderboard,
    'date-paper':               C.dates.systemPaperDeadline,
    'date-conference':          C.dates.conference,
  };
  Object.entries(dateMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || 'To be announced';
  });

  // Populate submission details
  const subMapping = {
    'sub-format':      C.submission.format,
    'sub-max':         C.submission.maxSubmissions,
    'sub-eval':        C.submission.evaluationInstructions,
  };
  Object.entries(subMapping).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || 'To be announced';
  });

  // -- Navigation: sticky scroll behaviour
  const nav = document.getElementById('nav');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 40);
    scrollTopBtn.classList.toggle('visible', scrollY > 400);
    updateActiveNav();
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // -- Mobile hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // -- Active nav highlighting
  const sections = document.querySelectorAll('section[id], div[id][data-section]');
  const navLinks = document.querySelectorAll('.nav-link[data-section-target]');

  function updateActiveNav() {
    let currentSection = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section-target') === currentSection);
    });
  }

  // -- Intersection Observer for reveal animations
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // -- Counter animation for stats
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) statObserver.observe(statsSection);

  function animateStats() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const rawTarget = el.getAttribute('data-target');
      const isPlus = rawTarget.endsWith('+');
      const commaNum = rawTarget.replace('+', '').replace(',', '');
      const target = parseInt(commaNum, 10);
      if (isNaN(target)) return;

      const duration = 1600;
      const start = performance.now();
      const formatNum = n => {
        if (n >= 1000) return n.toLocaleString();
        return String(n);
      };

      function update(ts) {
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = formatNum(current) + (isPlus ? '+' : '');
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  // -- Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -- Keyboard navigation for nav
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });

  // Initial call
  updateActiveNav();
});
