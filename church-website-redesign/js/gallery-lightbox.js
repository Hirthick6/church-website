/**
 * CORNERSTONE TAMIL CHURCH COVENTRY
 * Premium Split-View Gallery Lightbox
 * Provides a premium gallery modal with large main image + thumbnail strip.
 * API: window.PremiumGallery.open(title, photos, startIndex)
 * photos: [{src, alt, caption}]
 */

(function () {
  'use strict';

  /* ─── Build Modal HTML once ─── */
  const MODAL_ID = 'premium-gallery-modal';

  function buildModal() {
    if (document.getElementById(MODAL_ID)) return;

    const el = document.createElement('div');
    el.id = MODAL_ID;
    el.className = 'pgallery-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Photo Gallery');
    el.innerHTML = `
      <div class="pgallery-backdrop" aria-hidden="true"></div>
      <div class="pgallery-dialog">
        <div class="pgallery-header">
          <h2 class="pgallery-title" id="pgallery-label">Gallery</h2>
          <button class="pgallery-close" aria-label="Close gallery">&times;</button>
        </div>
        <div class="pgallery-body">
          <div class="pgallery-main" role="img" aria-live="polite">
            <div class="pgallery-main-wrap">
              <img class="pgallery-main-img" src="" alt="" draggable="false">
              <button class="pgallery-nav pgallery-prev" aria-label="Previous photo">&#8249;</button>
              <button class="pgallery-nav pgallery-next" aria-label="Next photo">&#8250;</button>
              <div class="pgallery-counter" aria-live="polite">1 of 1</div>
            </div>
          </div>
          <div class="pgallery-thumbs" role="listbox" aria-label="Photo thumbnails"></div>
        </div>
      </div>
    `;
    document.body.appendChild(el);
  }

  /* ─── PremiumGallery class ─── */
  class PremiumGallery {
    constructor() {
      this._photos = [];
      this._currentIdx = 0;
      this._modal = null;
      this._mainImg = null;
      this._counter = null;
      this._thumbsEl = null;
      this._titleEl = null;
      this._closeBtn = null;
      this._prevBtn = null;
      this._nextBtn = null;
      this._touchStartX = 0;
      this._touchStartY = 0;
      this._bound = {};
      this._initialized = false;
    }

    _init() {
      if (this._initialized) return;
      buildModal();

      this._modal    = document.getElementById(MODAL_ID);
      this._mainImg  = this._modal.querySelector('.pgallery-main-img');
      this._counter  = this._modal.querySelector('.pgallery-counter');
      this._thumbsEl = this._modal.querySelector('.pgallery-thumbs');
      this._titleEl  = this._modal.querySelector('.pgallery-title');
      this._closeBtn = this._modal.querySelector('.pgallery-close');
      this._prevBtn  = this._modal.querySelector('.pgallery-prev');
      this._nextBtn  = this._modal.querySelector('.pgallery-next');
      const backdrop = this._modal.querySelector('.pgallery-backdrop');

      /* Event bindings (stored so we can remove if needed) */
      this._bound.close   = () => this.close();
      this._bound.prev    = () => this._navigate(-1);
      this._bound.next    = () => this._navigate(1);
      this._bound.keydown = (e) => this._handleKey(e);
      this._bound.tsStart = (e) => this._touchStart(e);
      this._bound.tsEnd   = (e) => this._touchEnd(e);

      this._closeBtn.addEventListener('click', this._bound.close);
      backdrop.addEventListener('click', this._bound.close);
      this._prevBtn.addEventListener('click', this._bound.prev);
      this._nextBtn.addEventListener('click', this._bound.next);

      /* Stop propagation inside dialog so backdrop click doesn't fire */
      this._modal.querySelector('.pgallery-dialog').addEventListener('click', (e) => e.stopPropagation());

      /* Touch swipe on main image */
      const mainWrap = this._modal.querySelector('.pgallery-main-wrap');
      mainWrap.addEventListener('touchstart', this._bound.tsStart, { passive: true });
      mainWrap.addEventListener('touchend',   this._bound.tsEnd,   { passive: true });

      this._initialized = true;
    }

    /* ── Public API ── */

    open(title, photos, startIndex = 0) {
      this._init();

      if (!photos || photos.length === 0) return;

      this._photos = photos;
      this._currentIdx = Math.max(0, Math.min(startIndex, photos.length - 1));

      /* Set title */
      this._titleEl.textContent = title || 'Gallery';
      this._modal.setAttribute('aria-labelledby', 'pgallery-label');

      /* Build thumbnails */
      this._buildThumbs();

      /* Show modal */
      this._modal.classList.add('active');
      document.body.classList.add('pgallery-locked');

      /* Render current photo */
      this._showPhoto(this._currentIdx);

      /* Keyboard navigation */
      document.addEventListener('keydown', this._bound.keydown);

      /* Focus close button for a11y */
      setTimeout(() => this._closeBtn.focus(), 50);
    }

    close() {
      if (!this._modal) return;
      this._modal.classList.remove('active');
      document.body.classList.remove('pgallery-locked');
      document.removeEventListener('keydown', this._bound.keydown);

      /* Briefly unload main image to free memory */
      setTimeout(() => {
        if (!this._modal.classList.contains('active')) {
          this._mainImg.src = '';
          this._thumbsEl.innerHTML = '';
        }
      }, 350);
    }

    /* ── Private helpers ── */

    _buildThumbs() {
      this._thumbsEl.innerHTML = '';
      this._photos.forEach((photo, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'pgallery-thumb';
        thumb.setAttribute('role', 'option');
        thumb.setAttribute('aria-selected', idx === this._currentIdx ? 'true' : 'false');
        thumb.setAttribute('tabindex', '0');
        thumb.setAttribute('aria-label', `Photo ${idx + 1}: ${photo.alt || ''}`);

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt || `Photo ${idx + 1}`;
        img.loading = 'lazy';
        img.draggable = false;

        thumb.appendChild(img);
        thumb.addEventListener('click', () => this._showPhoto(idx));
        thumb.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._showPhoto(idx);
          }
        });

        this._thumbsEl.appendChild(thumb);
      });
    }

    _showPhoto(idx) {
      idx = (idx + this._photos.length) % this._photos.length;
      this._currentIdx = idx;

      const photo = this._photos[idx];

      /* Fade transition */
      this._mainImg.style.opacity = '0';
      this._mainImg.onload = () => {
        this._mainImg.style.opacity = '1';
      };
      this._mainImg.src = photo.src;
      this._mainImg.alt = photo.alt || '';

      /* Counter */
      this._counter.textContent = `${idx + 1} of ${this._photos.length}`;

      /* Thumb highlight */
      const thumbs = this._thumbsEl.querySelectorAll('.pgallery-thumb');
      thumbs.forEach((t, i) => {
        const isActive = i === idx;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      /* Scroll active thumb into view */
      if (thumbs[idx]) {
        thumbs[idx].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      }

      /* Show/hide nav arrows */
      const single = this._photos.length <= 1;
      this._prevBtn.style.display = single ? 'none' : '';
      this._nextBtn.style.display = single ? 'none' : '';
    }

    _navigate(dir) {
      this._showPhoto(this._currentIdx + dir);
    }

    _handleKey(e) {
      if (!this._modal.classList.contains('active')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); this._navigate(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); this._navigate(-1); }
      else if (e.key === 'Escape') this.close();
    }

    _touchStart(e) {
      this._touchStartX = e.touches[0].clientX;
      this._touchStartY = e.touches[0].clientY;
    }

    _touchEnd(e) {
      const dx = e.changedTouches[0].clientX - this._touchStartX;
      const dy = e.changedTouches[0].clientY - this._touchStartY;
      /* Only swipe horizontally if horizontal movement dominates */
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        this._navigate(dx < 0 ? 1 : -1);
      }
    }
  }

  /* ── Singleton ── */
  window.PremiumGallery = new PremiumGallery();

})();
