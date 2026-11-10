/**
 * CORNERSTONE TAMIL CHURCH COVENTRY — REUSABLE RESPONSIVE SLIDER
 *
 * Capabilities:
 * - Smooth continuous eased transition (0.7s cubic-bezier(0.4, 0, 0.2, 1))
 * - Auto-advances every 1.5 seconds (1500ms) from left to right
 * - Seamless infinite loop using cloned boundary slides (no speedy rewinds or jumps)
 * - Smooth Back (right-to-left) and Next (left-to-right) sliding
 * - Multi-row simultaneous display with synchronized movement (e.g. 2 rows of 7, 3 rows of 6)
 * - Pause on hover and touch, resuming cleanly afterwards
 * - Fixed card dimensions and object-fit: cover for zero layout shift
 * - Dedicated portrait mode support (e.g. Christmas 2025)
 * - Play/Pause button toggle, dots, and photo counter badge
 * - Accessible keyboard navigation (ArrowLeft / ArrowRight) & ARIA landmarks
 * - Shared Lightbox integration (opens all photos from event starting at clicked photo)
 */

(function () {
  'use strict';

  class ChurchSlider {
    /**
     * @param {HTMLElement|string} container - Container element or selector
     * @param {Object} options - Configuration options
     */
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.options = Object.assign({
        items: [],                          // Array of photo objects { src, alt, caption, title, isPoster }
        rows: 1,                            // 1 (single row), 2 (e.g. 2 rows of 7), 3 (e.g. 3 rows of 6)
        itemsPerView: { desktop: 3, tablet: 2, mobile: 1 },
        gap: 16,                            // Spacing between slides in px
        rowGap: 16,                         // Spacing between rows in px
        autoAdvanceMs: 3000,                // 3 seconds auto-advance interval as requested
        transitionDurationMs: 900,          // 0.9s smooth eased transition (0.8-1s range)
        transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth ease-in-out curve
        aspectRatio: null,                  // e.g. '3/4' for portrait, '4/3' for landscape
        fixedHeight: '300px',               // Fixed height so layout never shifts
        isPortrait: false,                  // Uniform portrait cards (for Christmas 2025)
        showDots: true,
        showArrows: true,
        showCounter: true,
        showPlayPause: true,
        categoryLabel: '',
        onSlideClick: null
      }, options);

      this.items = this.options.items || [];
      this.rows = Math.max(1, parseInt(this.options.rows, 10) || 1);
      this.currentIndex = 0;
      this.timer = null;
      this.isPausedByUser = false;
      this.isHovered = false;
      this.isTouchActive = false;
      this.isAnimating = false;
      this.touchStartX = 0;
      this.touchEndX = 0;

      // Split items into row arrays
      this.splitItemsIntoRows();

      // Check user preference for reduced motion
      this.reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Minimum items needed per row to justify infinite sliding
      this.itemsInRow = this.rowItems[0] ? this.rowItems[0].length : 0;
      this.itemsPerView = this.getItemsPerView();
      this.cloneCount = Math.max(4, this.itemsPerView + 2);

      this.initDOM();
      this.updateViewCount();
      this.bindEvents();
      this.goTo(0, false);

      if (!this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
        this.startAutoPlay();
      }
    }

    /**
     * Splits total items into evenly distributed rows.
     * E.g. 14 items across 2 rows -> [ [0..6], [7..13] ]
     * E.g. 18 items across 3 rows -> [ [0..5], [6..11], [12..17] ]
     */
    splitItemsIntoRows() {
      this.rowItems = [];
      if (this.rows <= 1 || this.items.length <= 1) {
        this.rowItems.push(this.items.slice());
        return;
      }

      const perRow = Math.ceil(this.items.length / this.rows);
      for (let r = 0; r < this.rows; r++) {
        const start = r * perRow;
        const end = Math.min(start + perRow, this.items.length);
        if (start < this.items.length) {
          this.rowItems.push(this.items.slice(start, end));
        }
      }
    }

    getItemsPerView() {
      const width = window.innerWidth;
      const ipv = this.options.itemsPerView;
      if (typeof ipv === 'number') return ipv;

      if (width < 640) {
        return ipv.mobile || 1;
      } else if (width < 1024) {
        return ipv.tablet || 2;
      } else {
        return ipv.desktop || 3;
      }
    }

    shouldSlide() {
      // Loop and auto-advance supported whenever there is more than 1 item
      return this.itemsInRow > 1 || this.items.length > 1;
    }

    updateViewCount() {
      this.itemsPerView = this.getItemsPerView();
      this.cloneCount = Math.max(4, this.itemsPerView + 2);
      this.updateSlideWidths();
      this.renderDots();
      this.updateCounter();
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    initDOM() {
      this.container.innerHTML = '';
      this.container.classList.add('church-slider-component');
      this.container.setAttribute('tabindex', '0');
      this.container.setAttribute('role', 'region');
      this.container.setAttribute('aria-roledescription', 'carousel');
      this.container.setAttribute('aria-label', this.options.categoryLabel ? `${this.options.categoryLabel} photo slider` : 'Photo carousel');

      // Top control header (Counter badge & Play/Pause button)
      if (this.options.showPlayPause || this.options.showCounter) {
        const controlsHeader = document.createElement('div');
        controlsHeader.className = 'slider-top-controls';

        if (this.options.showCounter) {
          this.counterEl = document.createElement('span');
          this.counterEl.className = 'slider-counter-badge';
          this.counterEl.setAttribute('aria-live', 'polite');
          controlsHeader.appendChild(this.counterEl);
        }

        if (this.options.showPlayPause && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
          this.pauseBtn = document.createElement('button');
          this.pauseBtn.type = 'button';
          this.pauseBtn.className = 'slider-pause-btn';
          this.pauseBtn.setAttribute('aria-label', this.reducedMotion ? 'Play auto-advance' : 'Pause auto-advance');
          this.pauseBtn.innerHTML = `
            <svg class="icon-pause" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            <svg class="icon-play" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span class="pause-btn-text">${this.reducedMotion ? 'Play' : 'Pause'}</span>
          `;
          controlsHeader.appendChild(this.pauseBtn);
        }

        this.container.appendChild(controlsHeader);
      }

      // Slider Stage
      const stage = document.createElement('div');
      stage.className = 'slider-stage';

      // Prev Arrow
      if (this.options.showArrows) {
        this.prevBtn = document.createElement('button');
        this.prevBtn.type = 'button';
        this.prevBtn.className = 'slider-arrow slider-prev-btn';
        this.prevBtn.setAttribute('aria-label', 'Previous slide');
        this.prevBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        `;
        stage.appendChild(this.prevBtn);
      }

      // Main Viewport
      this.viewport = document.createElement('div');
      this.viewport.className = 'slider-viewport';
      if (this.rows > 1) {
        this.viewport.classList.add('slider-viewport-multi-row');
      }

      // Container for stacked rows
      const rowsWrapper = document.createElement('div');
      rowsWrapper.className = 'slider-rows-wrapper';
      rowsWrapper.style.display = 'flex';
      rowsWrapper.style.flexDirection = 'column';
      rowsWrapper.style.gap = `${this.options.rowGap}px`;
      rowsWrapper.style.width = '100%';

      this.tracks = [];

      // Build each row track
      this.rowItems.forEach((itemsInThisRow, rowIndex) => {
        const rowTrackContainer = document.createElement('div');
        rowTrackContainer.className = 'slider-row-container';
        rowTrackContainer.style.overflow = 'hidden';
        rowTrackContainer.style.width = '100%';
        rowTrackContainer.style.position = 'relative';

        const track = document.createElement('div');
        track.className = 'slider-track';
        track.setAttribute('data-row-index', rowIndex);

        const M = itemsInThisRow.length;
        const K = this.cloneCount;

        // 1. Prepended Clones (Buffer from end of this row)
        for (let i = 0; i < K; i++) {
          const itemIdx = (M - K + i) % M;
          const safeIdx = (itemIdx + M) % M;
          const item = itemsInThisRow[safeIdx];
          const globalIdx = this.findGlobalIndex(item);
          track.appendChild(this.createSlideElement(item, safeIdx, globalIdx, true));
        }

        // 2. Real Slides
        itemsInThisRow.forEach((item, safeIdx) => {
          const globalIdx = this.findGlobalIndex(item);
          track.appendChild(this.createSlideElement(item, safeIdx, globalIdx, false));
        });

        // 3. Appended Clones (Buffer from start of this row)
        for (let i = 0; i < K; i++) {
          const safeIdx = i % M;
          const item = itemsInThisRow[safeIdx];
          const globalIdx = this.findGlobalIndex(item);
          track.appendChild(this.createSlideElement(item, safeIdx, globalIdx, true));
        }

        rowTrackContainer.appendChild(track);
        rowsWrapper.appendChild(rowTrackContainer);
        this.tracks.push(track);
      });

      this.viewport.appendChild(rowsWrapper);
      stage.appendChild(this.viewport);

      // Next Arrow
      if (this.options.showArrows) {
        this.nextBtn = document.createElement('button');
        this.nextBtn.type = 'button';
        this.nextBtn.className = 'slider-arrow slider-next-btn';
        this.nextBtn.setAttribute('aria-label', 'Next slide');
        this.nextBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        stage.appendChild(this.nextBtn);
      }

      this.container.appendChild(stage);

      // Dots container
      if (this.options.showDots) {
        this.dotsWrap = document.createElement('div');
        this.dotsWrap.className = 'slider-dots-wrap';
        this.container.appendChild(this.dotsWrap);
      }
    }

    findGlobalIndex(item) {
      const idx = this.items.indexOf(item);
      return idx >= 0 ? idx : 0;
    }

    createSlideElement(item, localIdx, globalIdx, isClone = false) {
      const slide = document.createElement('div');
      slide.className = 'slider-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-hidden', isClone ? 'true' : 'false');
      slide.setAttribute('data-global-index', globalIdx);

      // Card wrapper with fixed dimensions
      const card = document.createElement('div');
      card.className = 'slider-card';
      if (this.options.isPortrait) card.classList.add('is-portrait-card');
      if (this.options.isSquare) card.classList.add('is-square-card');
      if (item.isPoster || this.options.isSquare || this.options.isContain) {
        card.classList.add('is-poster-card');
      }
      if (this.rows === 2) card.classList.add('is-multi-row-2');
      if (this.rows >= 3) card.classList.add('is-multi-row-3');

      // Fixed height style (only when not portrait and not square)
      if (this.options.fixedHeight && !this.options.isPortrait && !this.options.isSquare) {
        card.style.height = this.options.fixedHeight;
      }

      // Media Box
      const mediaBox = document.createElement('div');
      mediaBox.className = 'slider-media-box';
      if (this.options.isPortrait) {
        mediaBox.classList.add('is-portrait-media');

        // Softly blurred background to fill leftover space for wide or square images
        const blurBg = document.createElement('div');
        blurBg.className = 'slider-img-blur-bg';
        blurBg.style.backgroundImage = `url("${item.src}")`;
        mediaBox.appendChild(blurBg);
      } else if (this.options.isSquare) {
        mediaBox.classList.add('is-square-media');
      }

      // Image: object-fit: contain for portrait or square/contain mode (full image, uncropped), object-fit: cover for standard multi-row
      const img = document.createElement('img');
      img.src = item.src;
      img.loading = 'eager';
      img.decoding = 'async';
      img.className = 'slider-img';
      if (this.options.isPortrait || this.options.isSquare || item.isPoster || this.options.isContain) {
        img.classList.add('is-contain');
      }
      if (item.isPoster || this.options.isSquare) {
        img.classList.add('is-poster-img');
      }

      // Zoom hint icon
      const zoomHint = document.createElement('div');
      zoomHint.className = 'slider-card-zoom-hint';
      zoomHint.setAttribute('aria-hidden', 'true');
      zoomHint.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `;

      mediaBox.appendChild(img);
      mediaBox.appendChild(zoomHint);

      // Visible caption bar directly below the photo
      // User rule: Never show "Photo N". Show only event title or clean custom caption.
      let displayCaption = '';
      if (item.caption && typeof item.caption === 'string' && item.caption.trim()) {
        const trimmed = item.caption.trim();
        if (!/^photo\s*\d+$/i.test(trimmed)) {
          displayCaption = trimmed;
        }
      }
      if (!displayCaption && this.options.categoryLabel) {
        displayCaption = this.options.categoryLabel;
      }
      img.alt = item.alt || displayCaption || 'Cornerstone Church Photo';

      const captionBar = document.createElement('div');
      captionBar.className = 'slider-caption-bar';

      captionBar.innerHTML = `
        <p class="slider-caption-text" title="${this.escapeHtml(displayCaption)}">${this.escapeHtml(displayCaption)}</p>
      `;

      card.appendChild(mediaBox);
      card.appendChild(captionBar);

      // Click opens shared lightbox with all photos from this event
      card.addEventListener('click', () => {
        if (typeof this.options.onSlideClick === 'function') {
          this.options.onSlideClick(item, globalIdx, this.items);
        } else if (window.ChurchLightbox) {
          window.ChurchLightbox.open(this.items, globalIdx);
        }
      });

      card.tabIndex = 0;
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });

      slide.appendChild(card);
      return slide;
    }

    updateSlideWidths() {
      const gap = this.options.gap;
      const ipv = this.itemsPerView;

      this.tracks.forEach(track => {
        const slides = track.querySelectorAll('.slider-slide');
        slides.forEach(slide => {
          slide.style.flex = `0 0 calc((100% - ${gap * (ipv - 1)}px) / ${ipv})`;
          slide.style.marginRight = `${gap}px`;
          slide.style.boxSizing = 'border-box';
        });
      });
    }

    renderDots() {
      if (!this.dotsWrap) return;
      this.dotsWrap.innerHTML = '';

      if (this.itemsInRow <= this.itemsPerView) {
        this.dotsWrap.style.display = 'none';
        return;
      }
      this.dotsWrap.style.display = 'flex';

      for (let i = 0; i < this.itemsInRow; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `slider-dot ${i === this.currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          this.goTo(i);
        });
        this.dotsWrap.appendChild(dot);
      }
    }

    updateDots() {
      if (!this.dotsWrap) return;
      const dots = this.dotsWrap.querySelectorAll('.slider-dot');
      if (!dots.length) return;

      const normIndex = ((this.currentIndex % this.itemsInRow) + this.itemsInRow) % this.itemsInRow;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === normIndex);
      });
    }

    updateCounter() {
      if (!this.counterEl) return;
      const normIndex = ((this.currentIndex % this.itemsInRow) + this.itemsInRow) % this.itemsInRow;

      if (this.rows > 1) {
        this.counterEl.innerHTML = `<span>${this.items.length} Photos</span> &bull; <span>${this.rows} Rows</span>`;
      } else {
        this.counterEl.textContent = `${normIndex + 1} / ${this.itemsInRow}`;
      }
    }

    bindEvents() {
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.prev();
          if (!this.isPausedByUser && !this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
            this.startAutoPlay();
          }
        });
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.next();
          if (!this.isPausedByUser && !this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
            this.startAutoPlay();
          }
        });
      }

      if (this.pauseBtn) {
        this.pauseBtn.addEventListener('click', () => {
          this.isPausedByUser = !this.isPausedByUser;
          const pauseIcon = this.pauseBtn.querySelector('.icon-pause');
          const playIcon = this.pauseBtn.querySelector('.icon-play');
          const textSpan = this.pauseBtn.querySelector('.pause-btn-text');

          if (this.isPausedByUser) {
            this.stopAutoPlay();
            if (pauseIcon) pauseIcon.style.display = 'none';
            if (playIcon) playIcon.style.display = 'inline-block';
            if (textSpan) textSpan.textContent = 'Play';
            this.pauseBtn.setAttribute('aria-label', 'Resume auto-advance');
          } else {
            this.startAutoPlay();
            if (pauseIcon) pauseIcon.style.display = 'inline-block';
            if (playIcon) playIcon.style.display = 'none';
            if (textSpan) textSpan.textContent = 'Pause';
            this.pauseBtn.setAttribute('aria-label', 'Pause auto-advance');
          }
        });
      }

      // Keyboard Controls
      this._handleKeydown = (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
          if (!this.isPausedByUser && !this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
            this.startAutoPlay();
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prev();
          if (!this.isPausedByUser && !this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
            this.startAutoPlay();
          }
        }
      };
      this.container.addEventListener('keydown', this._handleKeydown);

      // Pause on Hover
      this.container.addEventListener('mouseenter', () => {
        this.isHovered = true;
        this.stopAutoPlay();
      });
      this.container.addEventListener('mouseleave', () => {
        this.isHovered = false;
        if (!this.isPausedByUser && !this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
          this.startAutoPlay();
        }
      });

      // Pause on Focus
      this.container.addEventListener('focusin', () => {
        this.stopAutoPlay();
      });
      this.container.addEventListener('focusout', () => {
        if (!this.isPausedByUser && !this.isHovered && !this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
          this.startAutoPlay();
        }
      });

      // Pause & Swipe on Touch
      this.viewport.addEventListener('touchstart', (e) => {
        this.isTouchActive = true;
        this.stopAutoPlay();
        if (e.touches && e.touches.length === 1) {
          this.touchStartX = e.touches[0].clientX;
        }
      }, { passive: true });

      this.viewport.addEventListener('touchend', (e) => {
        this.isTouchActive = false;
        if (e.changedTouches && e.changedTouches.length === 1) {
          this.touchEndX = e.changedTouches[0].clientX;
          const deltaX = this.touchEndX - this.touchStartX;
          if (deltaX < -40) {
            this.next();
          } else if (deltaX > 40) {
            this.prev();
          }
        }
        if (!this.isPausedByUser && !this.isHovered && !this.reducedMotion && this.options.autoAdvanceMs > 0 && this.shouldSlide()) {
          this.startAutoPlay();
        }
      }, { passive: true });

      // Window resize debounce with cleanup handle
      this._handleResize = () => {
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(() => {
          this.updateViewCount();
          this.goTo(this.currentIndex, false);
        }, 120);
      };
      window.addEventListener('resize', this._handleResize);
    }

    startAutoPlay() {
      if (this.timer) clearInterval(this.timer);
      if (this.isPausedByUser || this.reducedMotion || this.options.autoAdvanceMs <= 0) return;
      if (!this.shouldSlide()) return;

      this.timer = setInterval(() => {
        this.next();
      }, this.options.autoAdvanceMs);
    }

    stopAutoPlay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    /**
     * Advance smoothly forward from left to right.
     */
    next() {
      if (this.isAnimating) return;
      this.goTo(this.currentIndex + 1, true);
    }

    /**
     * Move smoothly backward from right to left.
     */
    prev() {
      if (this.isAnimating) return;
      this.goTo(this.currentIndex - 1, true);
    }

    /**
     * Move track smoothly to target logical index.
     * Supports seamless circular looping via clone buffers.
     */
    goTo(targetIndex, animate = true) {
      if (!this.items.length || !this.tracks.length) return;

      const M = this.itemsInRow;
      const K = this.cloneCount;
      const ipv = this.itemsPerView;
      const gap = this.options.gap;
      const duration = this.options.transitionDurationMs;
      const easing = this.options.transitionEasing;

      this.currentIndex = targetIndex;
      const physicalIndex = K + targetIndex;

      // Calculate exact subpixel shift: (physicalIndex * (100% + gap)) / ipv
      const transformValue = `translateX(calc(-${(physicalIndex * 100) / ipv}% - ${(physicalIndex * gap) / ipv}px))`;

      if (animate && !this.reducedMotion) {
        this.isAnimating = true;

        this.tracks.forEach(track => {
          track.style.transition = `transform ${duration}ms ${easing}`;
          track.style.transform = transformValue;
        });

        // Handle loop wrap-around cleanly on transition end
        setTimeout(() => {
          try {
            if (this.currentIndex >= M) {
              // Reached or passed end clone -> silent snap to real start
              this.currentIndex = ((this.currentIndex % M) + M) % M;
              const resetPhysical = K + this.currentIndex;
              this.tracks.forEach(track => {
                track.style.transition = 'none';
                track.style.transform = `translateX(calc(-${(resetPhysical * 100) / ipv}% - ${(resetPhysical * gap) / ipv}px))`;
                track.offsetHeight; // trigger reflow
              });
            } else if (this.currentIndex < 0) {
              // Reached prepended clone -> silent snap to real end
              this.currentIndex = ((this.currentIndex % M) + M) % M;
              const resetPhysical = K + this.currentIndex;
              this.tracks.forEach(track => {
                track.style.transition = 'none';
                track.style.transform = `translateX(calc(-${(resetPhysical * 100) / ipv}% - ${(resetPhysical * gap) / ipv}px))`;
                track.offsetHeight; // trigger reflow
              });
            }
          } finally {
            this.isAnimating = false;
          }
        }, duration + 20);

      } else {
        // Instant positioning (on mount or resize)
        this.tracks.forEach(track => {
          track.style.transition = 'none';
          track.style.transform = transformValue;
        });
        this.isAnimating = false;
      }

      this.updateDots();
      this.updateCounter();
    }

    destroy() {
      this.stopAutoPlay();
      if (this._handleResize) {
        window.removeEventListener('resize', this._handleResize);
        clearTimeout(this._resizeTimeout);
      }
      if (this.container) {
        this.container.innerHTML = '';
      }
    }
  }

  // Export globally
  window.ChurchSlider = ChurchSlider;
})();
