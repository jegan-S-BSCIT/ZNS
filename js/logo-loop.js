/* =============================================
   LOGO LOOP — Vanilla JS Implementation
   Ported from React Bits <LogoLoop /> component
   Smooth requestAnimationFrame velocity loop with deceleration on hover
   ============================================= */

(function () {
  'use strict';

  const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

  function initLogoLoopElement(container, options = {}) {
    if (!container || container.dataset.logoloopInit) return;
    container.dataset.logoloopInit = 'true';

    const speed = options.speed !== undefined ? options.speed : (parseFloat(container.dataset.speed) || 120);
    const direction = options.direction || container.dataset.direction || 'left';
    const logoHeight = options.logoHeight !== undefined ? options.logoHeight : (parseInt(container.dataset.logoHeight, 10) || 32);
    const gap = options.gap !== undefined ? options.gap : (parseInt(container.dataset.gap, 10) || 36);
    const pauseOnHover = options.pauseOnHover !== undefined ? options.pauseOnHover : (container.dataset.pauseOnHover !== 'false');
    const hoverSpeed = options.hoverSpeed !== undefined ? options.hoverSpeed : (pauseOnHover ? 0 : undefined);
    const fadeOut = options.fadeOut !== undefined ? options.fadeOut : (container.dataset.fadeOut !== 'false');
    const fadeOutColor = options.fadeOutColor || container.dataset.fadeOutColor || '#FFFDF9';
    const scaleOnHover = options.scaleOnHover !== undefined ? options.scaleOnHover : (container.dataset.scaleOnHover !== 'false');

    container.classList.add('logoloop');
    if (direction === 'left' || direction === 'right') {
      container.classList.add('logoloop--horizontal');
    }
    if (fadeOut) {
      container.classList.add('logoloop--fade');
    }
    if (scaleOnHover) {
      container.classList.add('logoloop--scale-hover');
    }

    container.style.setProperty('--logoloop-gap', `${gap}px`);
    container.style.setProperty('--logoloop-logoHeight', `${logoHeight}px`);
    container.style.setProperty('--logoloop-fadeColor', fadeOutColor);

    // Build track and sequence list
    let track = container.querySelector('.logoloop__track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'logoloop__track';
      
      const originalList = container.querySelector('.logoloop__list');
      if (originalList) {
        track.appendChild(originalList);
      }
      container.innerHTML = '';
      container.appendChild(track);
    }

    const firstList = track.querySelector('.logoloop__list');
    if (!firstList) return;

    // Ensure initial copy count
    const containerWidth = container.clientWidth || window.innerWidth;
    const seqRect = firstList.getBoundingClientRect();
    const seqWidth = Math.ceil(seqRect.width || (firstList.children.length * (120 + gap)));
    
    const copiesNeeded = Math.max(
      ANIMATION_CONFIG.MIN_COPIES,
      Math.ceil(containerWidth / (seqWidth || 1)) + ANIMATION_CONFIG.COPY_HEADROOM
    );

    // Clone list as many times as needed for seamless loop
    while (track.children.length < copiesNeeded) {
      const clone = firstList.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }

    // Animation physics state
    let isHovered = false;
    let offset = 0;
    let velocity = 0;
    let lastTimestamp = null;
    let rafId = null;

    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === 'left' ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    const targetVelocity = magnitude * directionMultiplier * speedMultiplier;

    function handleMouseEnter() {
      if (hoverSpeed !== undefined) isHovered = true;
    }

    function handleMouseLeave() {
      if (hoverSpeed !== undefined) isHovered = false;
    }

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate(timestamp) {
      if (isReducedMotion) return;

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocity += (target - velocity) * easingFactor;

      const currentSeqWidth = Math.ceil(firstList.getBoundingClientRect().width || seqWidth);

      if (currentSeqWidth > 0) {
        offset = offset + velocity * deltaTime;
        offset = ((offset % currentSeqWidth) + currentSeqWidth) % currentSeqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    if (!isReducedMotion) {
      rafId = requestAnimationFrame(animate);
    }
  }

  // Expose global LogoLoop helper function
  window.LogoLoop = function (target, options) {
    if (typeof target === 'string') {
      document.querySelectorAll(target).forEach(el => initLogoLoopElement(el, options));
    } else if (target instanceof HTMLElement) {
      initLogoLoopElement(target, options);
    }
  };

  function autoInitLogoLoop() {
    document.querySelectorAll('.logoloop, [data-logo-loop]').forEach(el => {
      initLogoLoopElement(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitLogoLoop);
  } else {
    autoInitLogoLoop();
  }
})();
