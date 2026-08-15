/* =============================================
   MAGIC BENTO — Vanilla JS Port
   Ported from React Bits MagicBento component
   Adapted for Zen Nova Solutions (#FF7300)
   Dependencies: GSAP (loaded via CDN)
   ============================================= */

(function () {
  'use strict';

  // ---- Configuration ----
  const CONFIG = {
    glowColor: '255, 115, 0',         // #FF7300
    particleCount: 10,
    spotlightRadius: 300,
    enableStars: true,
    enableSpotlight: true,
    enableBorderGlow: true,
    enableTilt: true,
    enableMagnetism: true,
    clickEffect: true,
    mobileBreakpoint: 768
  };

  // ---- Selectors for cards to enchant ----
  const CARD_SELECTORS = [
    '.focus-card',
    '.service-card',
    '.portfolio-card',
    '.testimonial-card'
  ];

  let spotlight = null;
  let isMobile = window.innerWidth <= CONFIG.mobileBreakpoint;

  // ---- Utility helpers ----
  function createParticle(x, y) {
    const el = document.createElement('div');
    el.className = 'bento-particle';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    return el;
  }

  function getSpotlightValues(radius) {
    return {
      proximity: radius * 0.5,
      fadeDistance: radius * 0.75
    };
  }

  function updateGlowProps(card, mx, my, glow, radius) {
    const rect = card.getBoundingClientRect();
    const rx = ((mx - rect.left) / rect.width) * 100;
    const ry = ((my - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', rx + '%');
    card.style.setProperty('--glow-y', ry + '%');
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', radius + 'px');
  }

  // ---- Per-card state ----
  function initCardState(card) {
    return {
      el: card,
      isHovered: false,
      particles: [],
      timeouts: [],
      magnetAnim: null,
      memoizedParticles: null,
      initialized: false
    };
  }

  function buildMemoizedParticles(state) {
    if (state.initialized) return;
    const rect = state.el.getBoundingClientRect();
    state.memoizedParticles = Array.from({ length: CONFIG.particleCount }, () =>
      createParticle(Math.random() * rect.width, Math.random() * rect.height)
    );
    state.initialized = true;
  }

  function clearParticles(state) {
    state.timeouts.forEach(clearTimeout);
    state.timeouts = [];
    if (state.magnetAnim) { state.magnetAnim.kill(); state.magnetAnim = null; }

    state.particles.forEach(p => {
      gsap.to(p, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
        onComplete: () => p.parentNode && p.parentNode.removeChild(p)
      });
    });
    state.particles = [];
  }

  function spawnParticles(state) {
    if (!state.isHovered) return;
    buildMemoizedParticles(state);

    state.memoizedParticles.forEach((template, i) => {
      const tid = setTimeout(() => {
        if (!state.isHovered) return;
        const clone = template.cloneNode(true);
        state.el.appendChild(clone);
        state.particles.push(clone);

        gsap.fromTo(clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none', repeat: -1, yoyo: true
        });
        gsap.to(clone, {
          opacity: 0.3, duration: 1.5,
          ease: 'power2.inOut', repeat: -1, yoyo: true
        });
      }, i * 100);
      state.timeouts.push(tid);
    });
  }

  // ---- Attach per-card event listeners ----
  function attachCardEvents(state) {
    const el = state.el;

    el.addEventListener('mouseenter', function () {
      if (isMobile) return;
      state.isHovered = true;

      if (CONFIG.enableStars) spawnParticles(state);

      if (CONFIG.enableTilt) {
        gsap.to(el, {
          rotateX: 5, rotateY: 5, duration: 0.3,
          ease: 'power2.out', transformPerspective: 1000
        });
      }
    });

    el.addEventListener('mouseleave', function () {
      state.isHovered = false;
      clearParticles(state);

      if (CONFIG.enableTilt) {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      }
      if (CONFIG.enableMagnetism) {
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    });

    el.addEventListener('mousemove', function (e) {
      if (isMobile) return;
      if (!CONFIG.enableTilt && !CONFIG.enableMagnetism) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      if (CONFIG.enableTilt) {
        gsap.to(el, {
          rotateX: ((y - cy) / cy) * -8,
          rotateY: ((x - cx) / cx) * 8,
          duration: 0.15, ease: 'power2.out', transformPerspective: 1000
        });
      }

      if (CONFIG.enableMagnetism) {
        state.magnetAnim = gsap.to(el, {
          x: (x - cx) * 0.04,
          y: (y - cy) * 0.04,
          duration: 0.3, ease: 'power2.out'
        });
      }
    });

    if (CONFIG.clickEffect) {
      el.addEventListener('click', function (e) {
        if (isMobile) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const maxD = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height)
        );

        const ripple = document.createElement('div');
        ripple.className = 'bento-ripple';
        ripple.style.width = ripple.style.height = (maxD * 2) + 'px';
        ripple.style.left = (x - maxD) + 'px';
        ripple.style.top = (y - maxD) + 'px';
        ripple.style.background = 'radial-gradient(circle, rgba(' + CONFIG.glowColor + ', 0.35) 0%, rgba(' + CONFIG.glowColor + ', 0.15) 30%, transparent 70%)';
        el.appendChild(ripple);

        gsap.fromTo(ripple,
          { scale: 0, opacity: 1 },
          { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
        );
      });
    }
  }

  // ---- Global spotlight ----
  function initSpotlight(cards) {
    if (!CONFIG.enableSpotlight || isMobile) return;

    spotlight = document.createElement('div');
    spotlight.className = 'bento-spotlight';
    document.body.appendChild(spotlight);

    document.addEventListener('mousemove', function (e) {
      if (!spotlight) return;

      // Check if mouse is within any section that contains our cards
      let insideAny = false;
      for (let i = 0; i < cards.length; i++) {
        const section = cards[i].closest('section') || cards[i].closest('.our-focus');
        if (section) {
          const r = section.getBoundingClientRect();
          if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
            insideAny = true;
            break;
          }
        }
      }

      if (!insideAny) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = getSpotlightValues(CONFIG.spotlightRadius);
      let minDist = Infinity;

      cards.forEach(card => {
        const cr = card.getBoundingClientRect();
        const ccx = cr.left + cr.width / 2;
        const ccy = cr.top + cr.height / 2;
        const dist = Math.max(0,
          Math.hypot(e.clientX - ccx, e.clientY - ccy) - Math.max(cr.width, cr.height) / 2
        );
        minDist = Math.min(minDist, dist);

        let glow = 0;
        if (dist <= proximity) glow = 1;
        else if (dist <= fadeDistance) glow = (fadeDistance - dist) / (fadeDistance - proximity);

        updateGlowProps(card, e.clientX, e.clientY, glow, CONFIG.spotlightRadius);
      });

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });

      let targetOpacity = 0;
      if (minDist <= proximity) targetOpacity = 0.7;
      else if (minDist <= fadeDistance) targetOpacity = ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.7;

      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    });

    document.addEventListener('mouseleave', function () {
      cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    });
  }

  // ---- Init ----
  function init() {
    // Wait for GSAP
    if (typeof gsap === 'undefined') {
      console.warn('MagicBento: GSAP not loaded. Retrying in 200ms...');
      return setTimeout(init, 200);
    }

    const allCards = document.querySelectorAll(CARD_SELECTORS.join(', '));
    if (!allCards.length) return;

    // Add class hooks
    allCards.forEach(card => {
      card.classList.add('magic-bento-target');
      if (CONFIG.enableBorderGlow) card.classList.add('bento-glow');
    });

    // Attach per-card effects
    const states = [];
    allCards.forEach(card => {
      const state = initCardState(card);
      attachCardEvents(state);
      states.push(state);
    });

    // Spotlight
    initSpotlight(Array.from(allCards));

    // Responsive
    window.addEventListener('resize', function () {
      isMobile = window.innerWidth <= CONFIG.mobileBreakpoint;
    });
  }

  // ---- Boot ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
