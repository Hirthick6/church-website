/**
 * CORNERSTONE TAMIL CHURCH COVENTRY — SHARED LIGHTBOX
 * Reusable modal lightbox with keyboard navigation, mobile touch swipe,
 * counter, caption bar, category tag, title, and focus management.
 */

(function () {
  'use strict';

  class ChurchLightbox {
    constructor() {
      this.items = [];
      this.currentIndex = 0;
      this.isOpen = false;
      this.lastFocusedElement = null;
      this.touchStartX = 0;
      this.touchEndX = 0;

      this.initDOM();
      this.bindEvents();
    }

    initDOM() {
      let modal = document.getElementById('church-lightbox-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'church-lightbox-modal';
        modal.className = 'church-lightbox-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Image preview lightbox');
        modal.tabIndex = -1;

        modal.innerHTML = `
          <div class="lightbox-backdrop" data-action="close" aria-label="Close lightbox overlay"></div>
          <div class="lightbox-dialog" role="document">
            <button class="lightbox-close-btn" data-action="close" aria-label="Close image lightbox">&times;</button>
            
            <button class="lightbox-nav-btn lightbox-prev" data-action="prev" aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div class="lightbox-stage">
              <div class="lightbox-media-wrap">
                <img class="lightbox-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Cornerstone Church Photo" loading="eager" />
              </div>
              <div class="lightbox-meta-bar">
                <div class="lightbox-header-meta">
                  <span class="lightbox-category" id="lightbox-category"></span>
                  <span class="lightbox-counter" id="lightbox-counter" aria-live="polite">1 / 1</span>
                </div>
                <h3 class="lightbox-title" id="lightbox-title"></h3>
                <p class="lightbox-caption" id="lightbox-caption"></p>
              </div>
            </div>

            <button class="lightbox-nav-btn lightbox-next" data-action="next" aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        `;

        document.body.appendChild(modal);
      }

      this.modal = modal;
      this.imgEl = modal.querySelector('.lightbox-image');
      this.categoryEl = modal.querySelector('.lightbox-category');
      this.titleEl = modal.querySelector('.lightbox-title');
      this.captionEl = modal.querySelector('.lightbox-caption');
      this.counterEl = modal.querySelector('.lightbox-counter');
      this.dialogEl = modal.querySelector('.lightbox-dialog');
    }

    bindEvents() {
      // Click delegation for close, next, prev, and click outside dialog
      this.modal.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (target) {
          const action = target.getAttribute('data-action');
          if (action === 'close') this.close();
          if (action === 'next') this.next();
          if (action === 'prev') this.prev();
        } else if (e.target === this.modal) {
          // Tap outside
          this.close();
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prev();
        } else if (e.key === 'Tab') {
          this.trapFocus(e);
        }
      });

      // Mobile touch gestures (swipe)
      this.dialogEl.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length === 1) {
          this.touchStartX = e.touches[0].clientX;
        }
      }, { passive: true });

      this.dialogEl.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches.length === 1) {
          this.touchEndX = e.changedTouches[0].clientX;
          this.handleSwipe();
        }
      }, { passive: true });
    }

    handleSwipe() {
      const deltaX = this.touchEndX - this.touchStartX;
      const threshold = 40; // minimum swipe distance in px
      if (deltaX < -threshold) {
        this.next();
      } else if (deltaX > threshold) {
        this.prev();
      }
    }

    open(items, startIndex = 0) {
      if (!items || !items.length) return;
      this.items = items;
      this.currentIndex = Math.max(0, Math.min(startIndex, items.length - 1));
      this.lastFocusedElement = document.activeElement;
      this.isOpen = true;

      this.render();
      this.modal.classList.add('active');
      document.body.classList.add('lightbox-locked');
      this.modal.focus();
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.modal.classList.remove('active');
      document.body.classList.remove('lightbox-locked');

      if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
        this.lastFocusedElement.focus();
      }
    }

    next() {
      if (!this.items.length) return;
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.render();
    }

    prev() {
      if (!this.items.length) return;
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.render();
    }

    render() {
      const item = this.items[this.currentIndex];
      if (!item) return;

      // Animate fade out/in
      this.imgEl.style.opacity = '0';
      setTimeout(() => {
        this.imgEl.src = item.src;
        this.imgEl.alt = item.alt || item.title || 'Cornerstone Church photo';

        // Category
        const category = item.categoryLabel || (item.category ? item.category.toUpperCase() : '');
        if (this.categoryEl) {
          if (category) {
            this.categoryEl.textContent = category;
            this.categoryEl.style.display = 'inline-block';
          } else {
            this.categoryEl.style.display = 'none';
          }
        }

        // Title
        const titleText = item.title || item.alt || '';
        if (this.titleEl) {
          if (titleText && !/^photo\s*\d+$/i.test(titleText.trim())) {
            this.titleEl.textContent = titleText;
            this.titleEl.style.display = 'block';
          } else {
            this.titleEl.style.display = 'none';
          }
        }

        // Caption / Description
        let caption = item.caption || item.description || '';
        if (!caption || /^photo\s*\d+$/i.test(caption.trim())) {
          if (item.alt) {
            caption = item.alt.replace(/\s*-\s*Photo\s*\d+$/i, '').trim();
          } else {
            caption = '';
          }
        }
        if (this.captionEl) {
          if (caption && caption !== titleText) {
            this.captionEl.textContent = caption;
            this.captionEl.style.display = 'block';
          } else {
            this.captionEl.style.display = 'none';
          }
        }

        // Counter
        if (this.counterEl) {
          this.counterEl.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
        }

        if (item.isPoster) {
          this.imgEl.classList.add('is-poster');
        } else {
          this.imgEl.classList.remove('is-poster');
        }

        this.imgEl.style.opacity = '1';
      }, 100);
    }

    trapFocus(e) {
      const focusables = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  // Global singleton instance
  window.ChurchLightbox = new ChurchLightbox();
})();
