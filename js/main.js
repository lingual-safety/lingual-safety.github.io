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

  setLinks('[data-link="Codabench"]', C.CodabenchURL || C.codabenchURL, 'Codabench');
  setLinks('[data-link="codabench"]', C.CodabenchURL || C.codabenchURL, 'Codabench');
  setLinks('[data-link="starter-kit"]', C.starterKitURL || C.baselineURL, 'Starter kit');
  setLinks('[data-link="participate"]', C.registrationURL, 'Participate');
  setLinks('[data-link="baseline"]', C.baselineURL, 'Baseline');
  setLinks('[data-link="dataset"]', C.datasetURL, 'Dataset');
  setLinks('[data-link="icon"]', C.iconConferenceURL, 'ICON 2026');

  // Populate timeline dynamically from CONFIG.timelineEvents
  function renderTimeline() {
    const container = document.getElementById('timeline-events-list');
    if (!container || !C.timelineEvents || !Array.isArray(C.timelineEvents)) return;

    // Determine current date in YYYY-MM-DD format (local time)
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Find the current/upcoming milestone index
    // The active event is the earliest event with date >= todayStr, or the last event if all are past
    let activeIdx = C.timelineEvents.findIndex(ev => ev.date >= todayStr);
    if (activeIdx === -1 && C.timelineEvents.length > 0) {
      activeIdx = C.timelineEvents.length - 1; // all completed, highlight the final milestone
    }

    container.innerHTML = C.timelineEvents.map((item, idx) => {
      let state = 'timeline-future';
      let badgeHtml = '';

      if (idx < activeIdx) {
        state = 'timeline-completed';
      } else if (idx === activeIdx) {
        state = 'timeline-current';
        badgeHtml = '<span class="timeline-badge" aria-label="Current or next milestone">UP NEXT</span>';
      }

      const descHtml = item.description ? `<p class="timeline-desc">${item.description}</p>` : '';

      return `
        <div class="timeline-item ${state}" data-date="${item.date}">
          <div class="timeline-date-col">
            <time class="timeline-date" datetime="${item.date}">${item.displayDate}</time>
          </div>
          <div class="timeline-node-col" aria-hidden="true">
            <span class="timeline-dot"></span>
          </div>
          <div class="timeline-content-col">
            <div class="timeline-title-wrap">
              <h3 class="timeline-title">${item.title}</h3>
              ${badgeHtml}
            </div>
            ${descHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  renderTimeline();

  // Populate submission details
  const subMapping = {
    'sub-format':      C.submission?.format,
    'sub-max':         C.submission?.maxSubmissions,
    'sub-eval':        C.submission?.evaluationInstructions,
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
