/* ============================================================
   CORNERSTONE TAMIL CHURCH COVENTRY — main.js
   Full functionality: Mobile Navigation, Lightbox, Forms & Scroll
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLightbox();
  initForms();
  initQuickNav();
  initSmoothScroll();
});

/* ---- 1. Navbar & Mobile Menu ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.style.background = '#0d0d0d';
        navbar.style.boxShadow = '0 3px 14px rgba(0,0,0,0.4)';
      } else {
        navbar.style.background = '#111111';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
      }
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ---- 2. Lightbox Gallery ---- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  if (!lightbox || !lbImg) return;

  const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lbImg.src = galleryItems[index].src;
    lbImg.alt = galleryItems[index].alt || 'Cornerstone Tamil Church Photo';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lbImg.src = galleryItems[currentIndex].src;
    lbImg.alt = galleryItems[currentIndex].alt || 'Cornerstone Tamil Church Photo';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lbImg.src = galleryItems[currentIndex].src;
    lbImg.alt = galleryItems[currentIndex].alt || 'Cornerstone Tamil Church Photo';
  }

  galleryItems.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
}

/* ---- 3. Interactive Forms ---- */
function initForms() {
  // Coventry Register Form
  const registerForm = document.getElementById('registerForm');
  const formSuccess = document.getElementById('formSuccess');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = registerForm.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '#d5d5d5';
        if (!field.value.trim()) {
          field.style.borderColor = '#ff0000';
          valid = false;
        }
      });

      if (!valid) return;

      registerForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    });
  }

  // Rugby Quick Form
  const rugbyForm = document.getElementById('rugbyForm');
  const rugbyFormSuccess = document.getElementById('rugbyFormSuccess');

  if (rugbyForm) {
    rugbyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('rugbyEmail');
      const message = document.getElementById('rugbyMessage');

      if (!email.value.trim() || !message.value.trim()) return;

      rugbyForm.style.display = 'none';
      if (rugbyFormSuccess) rugbyFormSuccess.style.display = 'block';
    });
  }
}

/* ---- 4. Events Quick Nav Highlight on Scroll ---- */
function initQuickNav() {
  const quickNav = document.querySelector('.events-quick-nav');
  if (!quickNav) return;

  const pills = quickNav.querySelectorAll('.events-nav-pill');
  const sections = document.querySelectorAll('.event-block[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) {
        currentId = sec.getAttribute('id');
      }
    });

    pills.forEach(pill => {
      pill.classList.remove('active');
      if (pill.getAttribute('href') === '#' + currentId) {
        pill.classList.add('active');
      }
    });
  });
}

/* ---- 5. Smooth Scroll for in-page anchors ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = 64;
        const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: topPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
