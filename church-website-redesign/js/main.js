/**
 * CORNERSTONE TAMIL CHURCH COVENTRY — REDESIGN JAVASCRIPT
 * Clean, lightweight vanilla JS for sticky navigation, mobile drawer,
 * automated lightbox with keyboard & swipe navigation, category filters, and forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlideshow();
  initLightbox();
  initGalleryFilters();
  initForms();
  initSmoothScroll();
  initFeaturedCarousels();
  initScrollAnimations();
});

/* -------------------------------------------------------------------------
   1. NAVIGATION & MOBILE DRAWER
------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header-nav');
  const toggleBtn = document.querySelector('.menu-toggle, .mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // If clicking a dropdown trigger, don't close mobile menu
        if (link.classList.contains('nav-link-dropdown-toggle')) {
          return;
        }
        toggleBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Dropdown toggle buttons
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    dropdowns.forEach(dd => {
      const toggle = dd.querySelector('.dropdown-toggle-btn');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          dd.classList.toggle('open');
          const isExpanded = dd.classList.contains('open');
          toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
      }
    });

    document.addEventListener('click', (e) => {
      dropdowns.forEach(dd => {
        if (!dd.contains(e.target)) {
          dd.classList.remove('open');
          const toggle = dd.querySelector('.dropdown-toggle-btn');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

/* -------------------------------------------------------------------------
   2. LIGHTBOX MODAL (DYNAMIC INJECTION + KEYBOARD & CLICK NAVIGATION)
------------------------------------------------------------------------- */
let lightboxItems = [];
let currentLightboxIndex = 0;

function ensureLightboxModal() {
  let modal = document.querySelector('.lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close-btn" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-nav-btn lightbox-prev-btn" aria-label="Previous">&lsaquo;</button>
        <button class="lightbox-nav-btn lightbox-next-btn" aria-label="Next">&rsaquo;</button>
        <div class="lightbox-figure">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Cornerstone Church Photo">
          <div class="lightbox-caption"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  return modal;
}

function initLightbox() {
  const modal = ensureLightboxModal();
  const modalImg = modal.querySelector('.lightbox-figure img');
  const captionEl = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close-btn');
  const prevBtn = modal.querySelector('.lightbox-prev-btn');
  const nextBtn = modal.querySelector('.lightbox-next-btn');

  function openLightbox(index) {
    if (!lightboxItems[index]) return;
    currentLightboxIndex = index;
    const item = lightboxItems[index];
    modalImg.src = item.src;
    modalImg.alt = item.alt || 'Cornerstone Church';
    captionEl.textContent = item.caption || item.alt || 'Cornerstone Tamil Church Coventry';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  function showNext() {
    if (lightboxItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
    openLightbox(currentLightboxIndex);
  }

  function showPrev() {
    if (lightboxItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    openLightbox(currentLightboxIndex);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  refreshLightboxTriggers();
}

function refreshLightboxTriggers() {
  const triggerEls = Array.from(document.querySelectorAll('.lightbox-trigger, .gallery-tile, .event-featured-frame, .event-thumb-tile, .gallery-item-wrap img'));
  const uniqueTriggers = [...new Set(triggerEls)];

  lightboxItems = uniqueTriggers.map((el) => {
    const imgEl = el.tagName === 'IMG' ? el : el.querySelector('img');
    const src = el.getAttribute('data-full') || (imgEl ? imgEl.getAttribute('src') || imgEl.src : '') || el.getAttribute('src') || el.src;
    const caption = el.getAttribute('data-caption') || (imgEl ? imgEl.alt : '') || '';
    const alt = (imgEl ? imgEl.alt : '') || caption;

    return {
      el: el,
      src: src,
      alt: alt,
      caption: caption
    };
  }).filter(item => item.src && !item.src.includes('undefined'));

  lightboxItems.forEach((item, index) => {
    item.el.style.cursor = 'pointer';
    item.el.onclick = (e) => {
      e.preventDefault();
      const modal = ensureLightboxModal();
      const modalImg = modal.querySelector('.lightbox-figure img');
      const captionEl = modal.querySelector('.lightbox-caption');
      currentLightboxIndex = index;
      modalImg.src = item.src;
      modalImg.alt = item.alt;
      captionEl.textContent = item.caption;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
  });
}

/* -------------------------------------------------------------------------
   3. GALLERY CATEGORY FILTERING
------------------------------------------------------------------------- */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn, .gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item-wrap[data-category], .gallery-tile[data-category]');

  if (filterBtns.length === 0 || items.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterValue === 'all' || cat === filterValue || cat.includes(filterValue)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });

      refreshLightboxTriggers();
    });
  });
}

/* -------------------------------------------------------------------------
   4. FORM VALIDATION & INTERACTIVE SUBMISSION
------------------------------------------------------------------------- */
function initForms() {
  const forms = document.querySelectorAll('form.church-form, form.church-ajax-form, form#contact-page-form, form#rugby-inquiry-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        input.style.borderColor = '';
        if (!input.value.trim()) {
          input.style.borderColor = '#DC2626';
          isValid = false;
        }
      });

      if (!isValid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        const feedbackId = form.id === 'rugby-inquiry-form' ? 'rugby-form-feedback' :
                           form.id === 'contact-page-form' ? 'contact-page-feedback' : null;
        let feedbackEl = feedbackId ? document.getElementById(feedbackId) : form.querySelector('.form-feedback');

        if (!feedbackEl) {
          feedbackEl = document.createElement('div');
          feedbackEl.className = 'form-feedback';
          form.appendChild(feedbackEl);
        }

        feedbackEl.style.display = 'block';
        feedbackEl.style.background = '#E8F5E9';
        feedbackEl.style.color = '#2E7D32';
        feedbackEl.style.border = '1px solid #A5D6A7';
        feedbackEl.style.padding = '14px';
        feedbackEl.style.borderRadius = '6px';
        feedbackEl.style.marginTop = '16px';
        feedbackEl.style.fontSize = '0.92rem';
        feedbackEl.innerHTML = `
          <strong>Praise the Lord! Your message has been received.</strong><br>
          Pastor Clint Pratheepan and our church leadership team will reach out to you shortly. God bless you!
        `;

        form.reset();
      }, 600);
    });
  });
}

/* -------------------------------------------------------------------------
   5. SMOOTH SCROLLING FOR INTERNAL LINKS, HASH NAVIGATION & SCROLLSPY
------------------------------------------------------------------------- */
function getHeaderOffset() {
  const header = document.querySelector('.header-nav');
  if (!header) return 72;
  const h = header.getBoundingClientRect().height;
  return h > 0 ? h : 72;
}

function scrollToElement(targetEl, smooth = true) {
  if (!targetEl) return;
  const headerOffset = getHeaderOffset();
  const elementPosition = targetEl.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: smooth ? 'smooth' : 'auto'
  });
}

function initSmoothScroll() {
  const eventPills = document.querySelectorAll('.events-pill');
  const toggleBtn = document.querySelector('.menu-toggle, .mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Intercept all links targeting sections on the current page
  document.querySelectorAll('a').forEach(anchor => {
    const rawHref = anchor.getAttribute('href');
    if (!rawHref) return;

    let isSamePageAnchor = false;
    let targetSelector = '';

    if (rawHref.startsWith('#')) {
      if (rawHref !== '#' && rawHref.length > 1) {
        isSamePageAnchor = true;
        targetSelector = rawHref;
      }
    } else if (rawHref.includes('#')) {
      try {
        const url = new URL(anchor.href, window.location.href);
        const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
        const targetPath = url.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
        if (targetPath === currentPath && url.hash && url.hash.length > 1) {
          isSamePageAnchor = true;
          targetSelector = url.hash;
        }
      } catch (_) {}
    }

    if (isSamePageAnchor) {
      anchor.addEventListener('click', function(e) {
        let targetEl = null;
        try {
          targetEl = document.querySelector(targetSelector);
        } catch (_) {}

        if (targetEl) {
          e.preventDefault();

          // Close mobile menu if open
          if (toggleBtn && navMenu && navMenu.classList.contains('open')) {
            toggleBtn.classList.remove('open');
            navMenu.classList.remove('open');
          }

          scrollToElement(targetEl, true);

          if (history.pushState) {
            history.pushState(null, '', targetSelector);
          }

          // Active states for event pills
          if (this.classList.contains('events-pill')) {
            eventPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
          }

          // Active states for nav links
          if (this.classList.contains('nav-link')) {
            document.querySelectorAll('.header-nav .nav-menu .nav-link').forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');
          }
        }
      });
    }
  });

  // Handle initial page load with hash (e.g. coming from another page like rugby.html#about)
  function handleInitialHash() {
    if (window.location.hash && window.location.hash.length > 1) {
      try {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
          setTimeout(() => {
            scrollToElement(hashTarget, false);
          }, 60);

          // Once all images and stylesheets are fully loaded, correct any layout shift
          window.addEventListener('load', () => {
            setTimeout(() => {
              scrollToElement(hashTarget, true);
            }, 150);
          }, { once: true });
        }
      } catch (_) {}
    }
  }
  handleInitialHash();

  window.addEventListener('hashchange', () => {
    if (window.location.hash && window.location.hash.length > 1) {
      try {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
          scrollToElement(hashTarget, true);
        }
      } catch (_) {}
    }
  });

  // Scrollspy for events pills
  if (eventPills.length > 0) {
    const eventBlocks = document.querySelectorAll('.event-block');
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.pageYOffset + 160;
      eventBlocks.forEach(block => {
        if (block.offsetTop <= scrollPos) {
          currentSectionId = block.getAttribute('id');
        }
      });
      if (currentSectionId) {
        eventPills.forEach(pill => {
          if (pill.getAttribute('href') === '#' + currentSectionId) {
            pill.classList.add('active');
          } else {
            pill.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  // Scrollspy for Rugby microsite section links
  const rugbyNavLinks = document.querySelectorAll('.header-nav .nav-menu a[href^="#"]');
  const rugbySectionIds = ['welcome', 'about', 'leadership', 'schedule', 'gallery', 'contact'];
  const rugbySections = rugbySectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (rugbyNavLinks.length > 0 && rugbySections.length > 0) {
    window.addEventListener('scroll', () => {
      const headerOffset = getHeaderOffset();
      const scrollPos = window.pageYOffset + headerOffset + 40;
      let activeId = '';
      rugbySections.forEach(sec => {
        if (sec.offsetTop <= scrollPos) {
          activeId = sec.getAttribute('id');
        }
      });
      if (activeId) {
        rugbyNavLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + activeId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }
}

/* -------------------------------------------------------------------------
   6. AUTOMATIC HERO BACKGROUND SLIDESHOW (img1 -> img2 -> img3 -> img4)
   - 5 seconds display per slide
   - Smooth 1.3s crossfade
   - Preloads all 4 images
   - Handles tab visibility to prevent timer queueing
------------------------------------------------------------------------- */
function initHeroSlideshow() {
  const slideshow = document.querySelector('.hero-slideshow');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.hero-slide'));
  if (slides.length <= 1) return;

  // Preload all 4 images to guarantee instant, seamless display without lag
  const slideImages = [
    'assets/images/hero/img1.jpg',
    'assets/images/hero/img2.jpg',
    'assets/images/hero/img3.jpg',
    'assets/images/hero/img4.jpg'
  ];
  slideImages.forEach(src => {
    const preloader = new Image();
    preloader.src = src;
  });

  let currentIndex = 0;
  const slideDuration = 5000; // 5000ms = exactly 5 seconds
  let timerId = null;

  function advanceSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  function startSlideshow() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(advanceSlide, slideDuration);
  }

  function pauseSlideshow() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  // Start continuous loop
  startSlideshow();

  // Pause when the tab is hidden so intervals don't stack up, resume when tab is active
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseSlideshow();
    } else {
      startSlideshow();
    }
  });
}

/* -------------------------------------------------------------------------
   7. FEATURED AUTOMATIC CAROUSEL SYSTEM (Gallery & Events)
   - Supports any .featured-carousel-wrap
   - Prev/Next controls, pagination indicators
   - Pause on hover, focus, and background tab
   - Touch swiping on mobile
   - Respects prefers-reduced-motion
------------------------------------------------------------------------- */
function initFeaturedCarousels() {
  const carousels = document.querySelectorAll('.featured-carousel-wrap');
  if (carousels.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  carousels.forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');
    const duration = parseInt(carousel.getAttribute('data-autoplay-ms'), 10) || 5000;

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let timerId = null;
    let isPaused = false;

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      if (prefersReducedMotion || isPaused) return;
      stopAutoplay();
      timerId = setInterval(nextSlide, duration);
    }

    function stopAutoplay() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        startAutoplay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
        startAutoplay();
      });
    });

    // Pause on hover or focus
    carousel.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoplay();
    });

    carousel.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoplay();
    });

    carousel.addEventListener('focusin', () => {
      isPaused = true;
      stopAutoplay();
    });

    carousel.addEventListener('focusout', () => {
      isPaused = false;
      startAutoplay();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else if (!isPaused) {
        startAutoplay();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoplay();
      }
    }, { passive: true });

    // Handle tab visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else if (!isPaused) {
        startAutoplay();
      }
    });

    startAutoplay();
  });
}

/* -------------------------------------------------------------------------
   8. SCROLL ANIMATIONS (FADE-IN OBSERVER)
------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-scroll');
  if (!elements.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-visible'));
  }
}
