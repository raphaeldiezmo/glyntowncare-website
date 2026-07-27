// ============================================
// Glyntown Care - Main JavaScript
// Performance optimized with modern APIs
// ============================================

(function() {
  'use strict';

  // === Check for reduced motion preference ===
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === DOM Cache ===
  const header = document.querySelector('header');
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // === Navbar Toggle ===
  if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      burgerMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !burgerMenu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === Scroll Events (passive for performance) ===
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Hide/show header
    if (header) {
      if (currentScrollY > 100) {
        header.classList.add('scrolled');
        if (currentScrollY > lastScrollY) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
      } else {
        header.classList.remove('scrolled', 'hidden');
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // === Intersection Observer for Scroll Reveals ===
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed', 'appear');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, ' +
      '.fade-in, .appear-with-on-scroll-animation, ' +
      '.slider, .from-left, .from-right, .bottom-to-top'
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion, just reveal everything immediately
    document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, ' +
      '.fade-in, .appear-with-on-scroll-animation, ' +
      '.slider, .from-left, .from-right, .bottom-to-top'
    ).forEach(el => {
      el.classList.add('revealed', 'appear');
    });
  }

  // === Lazy loading for images ===
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for older browsers
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          lazyObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      lazyObserver.observe(img);
    });
  }

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === Responsive font scaling ===
  function setFontScale() {
    const width = window.innerWidth;
    if (width < 480) {
      document.documentElement.style.setProperty('--text-5xl', '2.25rem');
    } else if (width < 768) {
      document.documentElement.style.setProperty('--text-5xl', '2.75rem');
    } else {
      document.documentElement.style.removeProperty('--text-5xl');
    }
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setFontScale, 100);
  }, { passive: true });

  setFontScale();

  // === Carousel functionality (if carousel exists) ===
  const carousel = document.getElementById('ser');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const items = track?.children;
    if (track && items && items.length > 0) {
      const total = items.length;
      let index = 0;
      let interval;

      // Auto-play videos in current slide
      function playCurrentVideo(i) {
        const current = items[i];
        if (current.tagName === 'VIDEO') {
          items.forEach(item => {
            if (item.tagName === 'VIDEO') item.pause();
          });
          current.play().catch(() => {});
        }
      }

      function showSlide(i) {
        track.style.transform = `translateX(-${i * 100}%)`;
        playCurrentVideo(i);
      }

      function startCarousel() {
        interval = setInterval(() => {
          index = (index + 1) % total;
          showSlide(index);
        }, 4000);
      }

      function stopCarousel() {
        clearInterval(interval);
      }

      showSlide(index);
      startCarousel();

      carousel.addEventListener('mouseenter', stopCarousel);
      carousel.addEventListener('mouseleave', startCarousel);
    }
  }
})();

