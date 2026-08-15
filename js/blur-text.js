/* =============================================
   BLUR TEXT — Vanilla JS Implementation
   Ported from React Bits <BlurText /> component
   Staggered word blur reveal on scroll
   ============================================= */

(function () {
  'use strict';

  function applyBlurTextToElement(element, options = {}) {
    if (!element || element.dataset.blurTextInit) return;
    element.dataset.blurTextInit = 'true';

    const delayStep = options.delay || 120; // ms
    const direction = options.direction || 'top';
    const animateBy = options.animateBy || 'words';

    // Parse child nodes so we don't break nested spans (e.g., <span class="grow">grow</span>)
    const container = document.createElement('span');
    container.className = 'blur-text-container';
    
    let wordIndex = 0;

    function processNode(node, parentTarget) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text) return;

        const segments = animateBy === 'words' ? text.split(/(\s+)/) : text.split('');

        segments.forEach(segment => {
          if (!segment) return;
          if (/^\s+$/.test(segment)) {
            parentTarget.appendChild(document.createTextNode(segment));
          } else {
            const wordSpan = document.createElement('span');
            wordSpan.className = `blur-text-word ${direction === 'bottom' ? 'blur-text-direction-bottom' : ''}`;
            wordSpan.style.transitionDelay = `${wordIndex * delayStep}ms`;
            wordSpan.textContent = segment;
            parentTarget.appendChild(wordSpan);
            wordIndex++;
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.classList && node.classList.contains('grow')) {
          const wordSpan = document.createElement('span');
          wordSpan.className = `blur-text-word ${direction === 'bottom' ? 'blur-text-direction-bottom' : ''}`;
          wordSpan.style.transitionDelay = `${wordIndex * delayStep}ms`;
          const clone = node.cloneNode(true);
          wordSpan.appendChild(clone);
          parentTarget.appendChild(wordSpan);
          wordIndex++;
        } else {
          const clone = node.cloneNode(false);
          Array.from(node.childNodes).forEach(child => processNode(child, clone));
          parentTarget.appendChild(clone);
        }
      }
    }

    Array.from(element.childNodes).forEach(child => processNode(child, container));

    element.innerHTML = '';
    element.appendChild(container);

    // IntersectionObserver to trigger animation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            container.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );

    observer.observe(element);
  }

  function initBlurText() {
    // 1. Hero Heading
    const heroHeading = document.querySelector('.hero__heading');
    if (heroHeading) {
      applyBlurTextToElement(heroHeading, { delay: 110, direction: 'top' });
    }

    // 2. Hero Description
    const heroDesc = document.querySelector('.hero__description');
    if (heroDesc) {
      applyBlurTextToElement(heroDesc, { delay: 60, direction: 'top' });
    }

    // 3. Main Section Headings & Subtitles across the site
    const headingsToAnimate = [
      { selector: '.our-focus .section-label', delay: 150 },
      { selector: '.our-focus .section-heading', delay: 100 },
      { selector: '.what-we-do .section-label', delay: 150 },
      { selector: '.what-we-do__subtitle', delay: 90 },
      { selector: '.working-process .section-label', delay: 150 },
      { selector: '.working-process__subtitle', delay: 110 },
      { selector: '.portfolio__header h2', delay: 110 },
      { selector: '.testimonials .section-label', delay: 150 },
      { selector: '.testimonials__subtitle', delay: 100 },
      { selector: '.faq__header h2', delay: 110 },
      { selector: '.cta-footer__heading', delay: 110 },
      { selector: '.cta-footer__text', delay: 70 }
    ];

    headingsToAnimate.forEach(item => {
      const el = document.querySelector(item.selector);
      if (el) {
        applyBlurTextToElement(el, { delay: item.delay, direction: 'top' });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlurText);
  } else {
    initBlurText();
  }
})();
