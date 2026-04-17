/* ================================================
   THE PADEL ESCAPE — JAVASCRIPT
   ================================================ */

(function () {
  'use strict';

  /* ---- NAVBAR SCROLL ---- */
  const navbar   = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ---- MOBILE MENU ---- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      const spans  = navToggle.querySelectorAll('span');
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        navToggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML  = '✅ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
      btn.style.boxShadow  = '0 6px 24px rgba(76,175,80,0.35)';
      btn.disabled = true;

      /*
        TODO: Connect to a form backend (e.g. Formspree, Netlify Forms, EmailJS).
        Example with Formspree: set action="https://formspree.io/f/YOUR_ID" method="POST"
      */

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.style.boxShadow  = '';
        btn.disabled = false;
        form.reset();
      }, 4500);
    });
  }

  /* ---- SCROLL FADE-IN ANIMATIONS ---- */
  const animTargets = document.querySelectorAll(
    '.step, .service-card, .handle-item, .faq-item, .about-grid, .contact-grid'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children if it's a grid parent
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animTargets.forEach((el, i) => {
      el.classList.add('fade-up');
      el.dataset.delay = (i % 4) * 80; // subtle stagger
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animTargets.forEach(el => el.classList.add('visible'));
  }

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }


})();
