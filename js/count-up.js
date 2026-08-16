/* =============================================
   COUNT UP — Vanilla JS Implementation
   Ported from React Bits <CountUp /> component
   IntersectionObserver scroll-trigger + RAF smooth spring/cubic count animation
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const countUpElements = document.querySelectorAll('.count-up-text, [data-count-to]');

  if (!countUpElements.length) return;

  const formatNumber = (num, maxDecimals, separator, prefix = '', suffix = '') => {
    const hasDecimals = maxDecimals > 0;
    const options = {
      useGrouping: !!separator,
      minimumFractionDigits: hasDecimals ? maxDecimals : 0,
      maximumFractionDigits: hasDecimals ? maxDecimals : 0
    };

    let formatted = Intl.NumberFormat('en-US', options).format(num);
    if (separator && separator !== ',') {
      formatted = formatted.replace(/,/g, separator);
    }
    return `${prefix}${formatted}${suffix}`;
  };

  const getDecimalPlaces = num => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals, 10) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const animateCountUp = (el) => {
    if (el.dataset.countAnimated === 'true') return;
    el.dataset.countAnimated = 'true';

    const to = parseFloat(el.getAttribute('data-to') || el.getAttribute('data-count-to') || '0');
    const from = parseFloat(el.getAttribute('data-from') || '0');
    const direction = el.getAttribute('data-direction') || 'up';
    const delay = parseFloat(el.getAttribute('data-delay') || '0');
    const duration = parseFloat(el.getAttribute('data-duration') || '2');
    const separator = el.getAttribute('data-separator') !== null ? el.getAttribute('data-separator') : (el.hasAttribute('data-use-separator') ? ',' : '');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';

    const startVal = direction === 'down' ? to : from;
    const targetVal = direction === 'down' ? from : to;
    const maxDecimals = Math.max(getDecimalPlaces(startVal), getDecimalPlaces(targetVal));

    if (isReducedMotion) {
      el.textContent = formatNumber(targetVal, maxDecimals, separator, prefix, suffix);
      return;
    }

    // Set initial text
    el.textContent = formatNumber(startVal, maxDecimals, separator, prefix, suffix);

    setTimeout(() => {
      const startTime = performance.now();
      const durationMs = duration * 1000;

      // Spring-like overshoot / smooth out cubic easing
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const easedProgress = easeOutCubic(progress);

        const currentVal = startVal + (targetVal - startVal) * easedProgress;
        el.textContent = formatNumber(currentVal, maxDecimals, separator, prefix, suffix);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = formatNumber(targetVal, maxDecimals, separator, prefix, suffix);
        }
      };

      requestAnimationFrame(step);
    }, delay * 1000);
  };

  // IntersectionObserver for scroll trigger
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px' }
  );

  countUpElements.forEach((el) => observer.observe(el));
});
