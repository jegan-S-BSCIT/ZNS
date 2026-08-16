/* =============================================
   ZEN NOVA SOLUTIONS — Reactive Motion & Interaction Script
   Sticky Navbar, Scroll Reveals, Process Progress,
   Testimonial Auto-Rotator, FAQ Accordion, Magnetic Buttons
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =============================================
  // 1. STICKY NAVBAR SHRINK & SCROLL DETECT
  // =============================================
  const navbar = document.querySelector('.navbar');
  
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ----- Mobile Hamburger Menu -----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // ----- Smooth Scroll for Anchor Links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar?.offsetHeight || 56;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: y, behavior: isReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  // ----- Navbar Active Link Highlight on Scroll -----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.navbar__links a');

  function highlightNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active-link');
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id || a.getAttribute('href') === id + '.html') {
            a.classList.add('active-link');
            a.style.color = '#FF7300';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // =============================================
  // 2. INTERSECTION OBSERVER STAGGERED SCROLL REVEALS
  // =============================================
  if (!isReducedMotion) {
    const revealGroups = [
      { selector: '.focus-card', stagger: 90, distance: '24px' },
      { selector: '.service-card', stagger: 100, distance: '28px' },
      { selector: '.portfolio-card', stagger: 110, distance: '28px' },
      { selector: '.process-step', stagger: 120, distance: '20px' },
      { selector: '.testimonial-card', stagger: 100, distance: '24px' },
      { selector: '.faq-item', stagger: 70, distance: '16px' }
    ];

    revealGroups.forEach(group => {
      const elements = document.querySelectorAll(group.selector);
      if (!elements.length) return;

      const groupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(elements).indexOf(entry.target);
            const delay = (index % 4) * group.stagger;
            
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay);

            groupObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = `translateY(${group.distance})`;
        el.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`;
        groupObserver.observe(el);
      });
    });
  }

  // =============================================
  // 3. WORKING PROCESS PROGRESS LINE ANIMATION
  // =============================================
  const processTimeline = document.querySelector('.process-timeline');
  if (processTimeline) {
    let progressBar = processTimeline.querySelector('.process-timeline__progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'process-timeline__progress';
      processTimeline.appendChild(progressBar);
    }

    function updateProcessLine() {
      const rect = processTimeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const total = windowHeight + rect.height;
        const current = windowHeight - rect.top;
        const progress = Math.min(Math.max(current / total, 0), 1);
        progressBar.style.width = `${progress * 100}%`;
      }
    }

    window.addEventListener('scroll', updateProcessLine, { passive: true });
    updateProcessLine();
  }

  // =============================================
  // 4. TESTIMONIALS AUTO-ROTATOR (PAUSABLE ON HOVER)
  // =============================================
  const testimonialsSection = document.querySelector('.testimonials');
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  if (testimonialsSection && testimonialCards.length > 1 && !isReducedMotion) {
    let activeTestimonialIndex = 0;
    let testimonialTimer = null;

    function rotateTestimonials() {
      testimonialCards.forEach((card, idx) => {
        if (idx === activeTestimonialIndex) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(-4px) scale(1.02)';
          card.style.borderColor = 'var(--color-primary)';
        } else {
          card.style.opacity = '0.7';
          card.style.transform = 'translateY(0) scale(1)';
          card.style.borderColor = 'var(--color-border-light)';
        }
      });

      activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonialCards.length;
    }

    function startTestimonialTimer() {
      if (!testimonialTimer) {
        testimonialTimer = setInterval(rotateTestimonials, 4000);
      }
    }

    function stopTestimonialTimer() {
      if (testimonialTimer) {
        clearInterval(testimonialTimer);
        testimonialTimer = null;
      }
    }

    testimonialsSection.addEventListener('mouseenter', stopTestimonialTimer);
    testimonialsSection.addEventListener('mouseleave', startTestimonialTimer);
    
    rotateTestimonials();
    startTestimonialTimer();
  }

  // =============================================
  // 5. FAQ ACCORDION TRANSITION
  // =============================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-item__question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // =============================================
  // 6. MAGNETIC CTA BUTTON EFFECT
  // =============================================
  if (window.matchMedia('(hover: hover)').matches && !isReducedMotion) {
    const magneticBtns = document.querySelectorAll('.btn-cta-primary, .hero__cta, .btn-cta-secondary, .navbar__contact');

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const distanceX = e.clientX - btnCenterX;
        const distanceY = e.clientY - btnCenterY;

        const moveX = distanceX * 0.22;
        const moveY = distanceY * 0.22;

        btn.style.transform = `translate3d(${moveX}px, ${moveY - 3}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
});
