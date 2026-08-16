/* =============================================
   BLUR TEXT — Vanilla JS Implementation
   Ported from React Bits <BlurText /> component
   Staggered word or letter blur reveal on scroll
   ============================================= */

(function () {
  'use strict';

  function applyBlurTextToElement(element, options = {}) {
    if (!element || element.dataset.blurTextInit) return;
    element.dataset.blurTextInit = 'true';

    const delayStep = options.delay !== undefined ? options.delay : (parseInt(element.dataset.delay, 10) || 120); // ms
    const direction = options.direction || element.dataset.direction || 'top';
    const animateBy = options.animateBy || element.dataset.animateBy || 'words';
    const stepDuration = options.stepDuration || parseFloat(element.dataset.stepDuration) || 0.35; // seconds
    const threshold = options.threshold !== undefined ? options.threshold : (parseFloat(element.dataset.threshold) || 0.15);
    const rootMargin = options.rootMargin || element.dataset.rootMargin || '0px';

    element.style.setProperty('--blur-text-duration', `${stepDuration}s`);

    const container = document.createElement('span');
    container.className = 'blur-text-container';
    
    let segmentIndex = 0;

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
            wordSpan.style.transitionDelay = `${segmentIndex * delayStep}ms`;
            wordSpan.textContent = segment;
            parentTarget.appendChild(wordSpan);
            segmentIndex++;
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        if (tagName === 'br') {
          parentTarget.appendChild(document.createElement('br'));
        } else if (node.classList && (node.classList.contains('grow') || node.classList.contains('grow__sparkle'))) {
          const wordSpan = document.createElement('span');
          wordSpan.className = `blur-text-word ${direction === 'bottom' ? 'blur-text-direction-bottom' : ''}`;
          wordSpan.style.transitionDelay = `${segmentIndex * delayStep}ms`;
          const clone = node.cloneNode(true);
          wordSpan.appendChild(clone);
          parentTarget.appendChild(wordSpan);
          segmentIndex++;
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            container.classList.add('animated');
            if (typeof options.onAnimationComplete === 'function') {
              const totalTime = (segmentIndex * delayStep) + (stepDuration * 1000);
              setTimeout(() => {
                options.onAnimationComplete();
              }, totalTime);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
  }

  // Expose global window.BlurText function matching React Bits API
  window.BlurText = function (target, options) {
    if (typeof target === 'string') {
      document.querySelectorAll(target).forEach(el => applyBlurTextToElement(el, options));
    } else if (target instanceof HTMLElement) {
      applyBlurTextToElement(target, options);
    }
  };

  function initBlurText() {
    // 1. Elements explicitly tagged with class="blur-text"
    document.querySelectorAll('.blur-text').forEach(el => {
      applyBlurTextToElement(el);
    });

    // 2. Selectors for page heroes across all 5 pages
    const heroSelectors = [
      { selector: '.hero__heading', delay: 110, direction: 'top' },
      { selector: '.hero__description', delay: 60, direction: 'top' },
      { selector: '.about-hero__heading', delay: 110, direction: 'top' },
      { selector: '.about-hero__sub', delay: 60, direction: 'top' },
      { selector: '.portfolio-hero__heading', delay: 110, direction: 'top' },
      { selector: '.portfolio-hero__sub', delay: 60, direction: 'top' },
      { selector: '.pricing-hero__heading', delay: 110, direction: 'top' },
      { selector: '.pricing-hero__sub', delay: 60, direction: 'top' },
      { selector: '.services-hero__heading', delay: 110, direction: 'top' },
      { selector: '.services-hero__sub', delay: 60, direction: 'top' }
    ];

    heroSelectors.forEach(item => {
      document.querySelectorAll(item.selector).forEach(el => {
        applyBlurTextToElement(el, { delay: item.delay, direction: item.direction });
      });
    });

    // 3. Section labels, section headings, and titles across all 5 pages
    const sectionSelectors = [
      '.section-label',
      '.section-heading',
      '.what-we-do__subtitle',
      '.working-process__subtitle',
      '.testimonials__subtitle',
      '.featured-case__title',
      '.services-detail__title',
      '.cta-footer__heading',
      '.cta-footer__text'
    ];

    sectionSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        applyBlurTextToElement(el, { delay: 90, direction: 'top' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlurText);
  } else {
    initBlurText();
  }
})();

