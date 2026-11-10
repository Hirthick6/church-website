/**
 * CORNERSTONE TAMIL CHURCH COVENTRY — STATIC FRAME CROSS-FADE ROTATOR
 * 
 * Features:
 * - Fixed 16:10 frame that never jumps or shifts layout
 * - Smooth 0.8s cross-fade transition between images
 * - 3.0s auto-advance interval with 0.5s staggered start per row
 * - Pause on hover or touch
 * - Accessible dots pagination below frame
 * - On-hover navigation arrows
 * - Full image visibility with object-fit: contain and soft blurred backdrop
 * - Integrated with window.ChurchLightbox
 * - Respects prefers-reduced-motion
 */

(function () {
  'use strict';

  class ZigzagFrameRotator {
    constructor(wrapperEl, options = {}) {
      if (!wrapperEl) return;
      this.wrapper = wrapperEl;
      this.frame = wrapperEl.querySelector('.zigzag-frame');
      if (!this.frame) return;

      this.slides = Array.from(this.frame.querySelectorAll('.zigzag-slide'));
      this.dots = Array.from(this.wrapper.querySelectorAll('.zigzag-dot'));
      this.prevBtn = this.frame.querySelector('.zigzag-frame-arrow.prev');
      this.nextBtn = this.frame.querySelector('.zigzag-frame-arrow.next');
      this.enlargeBadge = this.frame.querySelector('.zigzag-enlarge-badge');

      this.currentIndex = 0;
      this.total = this.slides.length;
      this.intervalMs = options.intervalMs || 3000;
      this.staggerMs = options.staggerMs || 0;
      this.photos = options.photos || []; // Optional array of photo objects for lightbox

      this.timer = null;
      this.isPaused = false;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Extract photo objects from DOM if not explicitly passed
      if (!this.photos.length) {
        this.photos = this.slides.map(slide => {
          const img = slide.querySelector('.zigzag-slide-img');
          return {
            src: img ? img.getAttribute('src') : '',
            alt: img ? img.getAttribute('alt') : '',
            title: img ? img.getAttribute('alt') : '',
            caption: img ? img.getAttribute('alt') : ''
          };
        });
      }

      this.init();
    }

    init() {
      if (this.total <= 1) {
        if (this.dots.length) this.dots.forEach(d => d.style.display = 'none');
        if (this.prevBtn) this.prevBtn.style.display = 'none';
        if (this.nextBtn) this.nextBtn.style.display = 'none';
      }

      // Arrows click
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.prev();
          this.resetTimer();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.next();
          this.resetTimer();
        });
      }

      // Dots click
      this.dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          this.goTo(idx);
          this.resetTimer();
        });
      });

      // Hover / Touch pause & resume with touch swipe support
      this.frame.addEventListener('mouseenter', () => this.pause());
      this.frame.addEventListener('mouseleave', () => this.resume());

      let touchStartX = 0;
      let touchStartY = 0;
      this.frame.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
        this.pause();
      }, { passive: true });

      this.frame.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          // Swipe detection: swipe horizontal by at least 40px
          if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
              this.next();
            } else {
              this.prev();
            }
          }
        }
        this.resume();
      }, { passive: true });

      // Click to open lightbox
      this.frame.addEventListener('click', (e) => {
        // Do not trigger lightbox if arrow was clicked
        if (e.target.closest('.zigzag-frame-arrow')) return;
        this.openLightbox(this.currentIndex);
      });

      // Start auto-rotation with stagger delay
      if (this.total > 1 && !this.reducedMotion) {
        const initialDelay = this.intervalMs + this.staggerMs;
        this.startTimer(initialDelay);
      }
    }

    startTimer(delay) {
      this.stopTimer();
      this.timer = setTimeout(() => {
        if (!this.isPaused) {
          this.next();
        }
        // Subsequent intervals run at normal intervalMs
        this.startTimer(this.intervalMs);
      }, delay);
    }

    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    resetTimer() {
      if (!this.reducedMotion && this.total > 1) {
        this.startTimer(this.intervalMs);
      }
    }

    pause() {
      this.isPaused = true;
      this.stopTimer();
    }

    resume() {
      this.isPaused = false;
      this.resetTimer();
    }

    goTo(targetIndex) {
      if (targetIndex === this.currentIndex || targetIndex < 0 || targetIndex >= this.total) return;

      const prevSlide = this.slides[this.currentIndex];
      const nextSlide = this.slides[targetIndex];

      if (prevSlide) prevSlide.classList.remove('is-active');
      if (nextSlide) {
        nextSlide.classList.add('is-active');
        // Ensure lazy loaded image in next slide loads
        const img = nextSlide.querySelector('img');
        if (img && img.loading === 'lazy') {
          img.loading = 'eager';
        }
      }

      // Update dots
      if (this.dots.length) {
        this.dots.forEach((dot, i) => {
          const isActive = i === targetIndex;
          dot.classList.toggle('is-active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      this.currentIndex = targetIndex;
    }

    next() {
      const nextIndex = (this.currentIndex + 1) % this.total;
      this.goTo(nextIndex);
    }

    prev() {
      const prevIndex = (this.currentIndex - 1 + this.total) % this.total;
      this.goTo(prevIndex);
    }

    openLightbox(startIndex) {
      if (window.ChurchLightbox && this.photos && this.photos.length) {
        window.ChurchLightbox.open(this.photos, startIndex);
      }
    }

    destroy() {
      this.stopTimer();
    }
  }

  // Export to window
  window.ZigzagFrameRotator = ZigzagFrameRotator;
})();

