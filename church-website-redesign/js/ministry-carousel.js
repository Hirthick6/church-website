/**
 * CORNERSTONE TAMIL CHURCH COVENTRY
 * Ministries 3-Second Single-Image Carousel with Arrows, Dots & Lightbox Trigger
 */

(function () {
  'use strict';

  // Photo Registry for "View All Photos" Lightbox
  const ministryPhotosMap = {
    'mens-fellowship': [
      { src: 'assets/images/ministries/mens-fellowship.jpg', alt: 'Cornerstone Church of God Men\'s Fellowship Official Group Photo', caption: 'MEN\'S FELLOWSHIP • Cornerstone Church of God Men\'s Fellowship official gathering at Howard Street Sanctuary.' },
      { src: 'assets/images/ministries/mens-fellowship.jpg', alt: 'Men\'s Fellowship Prayer and Discipleship', caption: 'DISCIPLESHIP & PRAYER • Men gathering in faith, intercession, and spiritual brotherhood.' }
    ],
    'womens-fellowship': [
      { src: 'assets/images/ministries/womens-fellowship-1.jpg', alt: 'Women\'s Fellowship Gathering and Spiritual Retreat', caption: 'WOMEN\'S FELLOWSHIP • Annual sisterhood gathering, retreat, and spiritual fellowship.' },
      { src: 'assets/images/ministries/womens-fellowship-2.jpg', alt: 'Women\'s Fellowship Prayer and Sisterhood', caption: 'PRAYER & FORMATION • Fervent intercession and compassionate support.' },
      { src: 'assets/images/events/events-mothers-day-women.jpg', alt: 'Women\'s Fellowship Annual Celebration', caption: 'CELEBRATION • Mother\'s Day service and sisterhood fellowship.' }
    ],
    'youth-ministry': [
      { src: 'assets/images/ministries/youth-fellowship-1.jpg', alt: 'Youth Fellowship Young Disciples and Leadership', caption: 'YOUTH MINISTRY • Young believers and next-generation disciples standing rooted in Christ.' },
      { src: 'assets/images/ministries/youth-fellowship-2.jpg', alt: 'Youth Contemporary Praise and Fellowship', caption: 'PRAISE & WORSHIP • Spirit-led contemporary adoration led by youth team.' },
      { src: 'assets/images/ministries/youth-fellowship-3.jpg', alt: 'Youth Bible Study and Community Outreach', caption: 'BIBLE STUDY • Student fellowship and campus outreach across Coventry.' }
    ],
    'sunday-school': [
      { src: 'assets/images/ministries/sunday-school.jpg', alt: 'Sunday School Children with Teachers and Certificates', caption: 'SUNDAY SCHOOL • Dedicated teachers and young children celebrating annual awards.' },
      { src: 'assets/images/church/gallery-sunday-congregation.jpg', alt: 'Sunday School Children and Congregational Blessing', caption: 'CONGREGATIONAL BLESSING • Pastors and church blessing the next generation.' }
    ],
    'worship-media': [
      { src: 'assets/images/ministries/worship-media-2.jpg', alt: 'Cornerstone Sound and Media Production Team', caption: 'MEDIA & SOUND • Dedicated sound engineers at the Howard Street audio console.' },
      { src: 'assets/images/ministries/worship-team-1.jpg', alt: 'Worship Team Leading Sunday Adoration', caption: 'WORSHIP ADORATION • Worship leaders guiding the congregation into God\'s presence.' },
      { src: 'assets/images/church/gallery-worship-team.jpg', alt: 'Sanctuary Praise and Worship Ministry', caption: 'CHOIR & HYMNS • Passionate Tamil hymns and contemporary praise.' }
    ],
    'community-outreach': [
      { src: 'assets/images/ministries/outreach-1.jpg', alt: 'Church Outreach Care and Food Distribution', caption: 'COMMUNITY CARE • Distributing essential food care parcels across Coventry.' },
      { src: 'assets/images/ministries/outreach-2.jpg', alt: 'Outreach Volunteers Distributing Parcels', caption: 'VOLUNTEERS IN ACTION • Compassionate service to vulnerable local families.' },
      { src: 'assets/images/ministries/outreach-3.jpg', alt: 'Community Support and Care Bags', caption: 'FOOD SUPPORT • Practical compassion shared with love and prayer.' },
      { src: 'assets/images/ministries/outreach-4.jpg', alt: 'Church Outreach Team Sharing Hope', caption: 'COVENTRY OUTREACH • BBC Radio recognized Christmas street mission.' }
    ],
    'international-missions': [
      { src: 'assets/images/ministries/missions-1.jpg', alt: 'International Missions and Church Building Support', caption: 'GLOBAL MISSIONS • Supporting rural church plants and native pastors overseas.' },
      { src: 'assets/images/ministries/missions-2.jpg', alt: 'Mission Field Humanitarian Support', caption: 'DISASTER RELIEF • Humanitarian aid and emergency food parcels delivered.' },
      { src: 'assets/images/ministries/missions-3.jpg', alt: 'Global Church Building Initiative', caption: 'CHURCH BUILDING • Sponsoring permanent worship sanctuaries internationally.' }
    ],
    'baptism-family': [
      { src: 'assets/images/ministries/child-dedication-3.jpg', alt: 'Child Dedication Pastoral Blessing Service', caption: 'CHILD DEDICATION • Pastor Clint blessing parents and infant at altar.' },
      { src: 'assets/images/ministries/child-dedication-1.jpg', alt: 'Parents and Child Standing in Dedication', caption: 'COVENANT BLESSING • Families committing children to the Lord.' },
      { src: 'assets/images/ministries/child-dedication-2.jpg', alt: 'Congregational Prayer for Church Families', caption: 'CONGREGATIONAL PRAYER • Church elders standing in intercession.' }
    ],
    'stewardship-deacons': [
      { src: 'assets/images/ministries/committee-1.jpg', alt: 'Cornerstone Church Committee, Deacons and Officers', caption: 'DEACONS & COMMITTEE • Church officers and ministry coordinators serving in humility.' },
      { src: 'assets/images/ministries/committee-2.jpg', alt: 'Leadership Stewardship and Board Governance', caption: 'STEWARDSHIP • Faithful logistical, legal, and financial oversight.' },
      { src: 'assets/images/ministries/committee-3.jpg', alt: 'Church Ministry Helpers Team', caption: 'SERVANT HEARTS • Behind-the-scenes preparation and hospitality.' }
    ],
    'english-rugby': [
      { src: 'assets/images/ministries/rugby-fellowship.jpg', alt: 'Rugby Branch Church Congregation and Fellowship', caption: 'RUGBY CHURCH • Congregation gathering for worship at 15 Oliver Street.' },
      { src: 'assets/images/ministries/english-service.jpg', alt: 'Coventry English Worship Service', caption: 'ENGLISH WORSHIP • Sunday 09:00 am English service for multi-ethnic believers.' },
      { src: 'assets/images/church/rugby-church-building.jpg', alt: 'Rugby Church Building Exterior on Oliver Street', caption: 'SANCTUARY EXTERIOR • Cornerstone Church of God Rugby branch building.' }
    ]
  };

  function initMinistryCarousels() {
    const carousels = document.querySelectorAll('.ministry-hero-carousel');
    if (!carousels.length) return;

    carousels.forEach(carousel => {
      const slides = carousel.querySelectorAll('.ministry-carousel-slide');
      if (slides.length <= 1) return; // Single slide doesn't rotate

      const prevBtn = carousel.querySelector('.ministry-carousel-arrow.prev');
      const nextBtn = carousel.querySelector('.ministry-carousel-arrow.next');
      const dotsContainer = carousel.querySelector('.ministry-carousel-dots');
      const dots = dotsContainer ? dotsContainer.querySelectorAll('.ministry-dot') : [];

      let currentIdx = 0;
      let timer = null;
      const intervalMs = 3000;

      function goTo(idx) {
        slides[currentIdx].classList.remove('active');
        if (dots[currentIdx]) dots[currentIdx].classList.remove('active');

        currentIdx = (idx + slides.length) % slides.length;

        slides[currentIdx].classList.add('active');
        if (dots[currentIdx]) dots[currentIdx].classList.add('active');
      }

      function nextSlide() {
        goTo(currentIdx + 1);
      }

      function prevSlide() {
        goTo(currentIdx - 1);
      }

      function startAuto() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, intervalMs);
      }

      function stopAuto() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      function resetAuto() {
        stopAuto();
        startAuto();
      }

      // Prev & Next Arrow Buttons
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          prevSlide();
          resetAuto();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          nextSlide();
          resetAuto();
        });
      }

      // Pagination Dots
      dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goTo(i);
          resetAuto();
        });
      });

      // Pause on Hover
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);

      // Touch Swipe for Mobile
      let touchStartX = 0;
      carousel.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      carousel.addEventListener('touchend', e => {
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (delta < -35) {
          nextSlide();
          resetAuto();
        } else if (delta > 35) {
          prevSlide();
          resetAuto();
        }
      }, { passive: true });

      // Initialize
      slides[0].classList.add('active');
      if (dots[0]) dots[0].classList.add('active');
      startAuto();
    });

    // Attach "View All Photos" – Premium Gallery Handler
    document.querySelectorAll('.btn-ministry-photos').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const ministryId = this.getAttribute('data-ministry-id');
        const ministryTitle = this.getAttribute('data-ministry-title') || ministryId;
        const photos = ministryPhotosMap[ministryId] || [];

        if (photos.length === 0) return;

        const galleryTitle = ministryTitle + ' \u2013 All Photos (' + photos.length + ')';

        if (window.PremiumGallery) {
          window.PremiumGallery.open(galleryTitle, photos, 0);
        } else if (window.ChurchLightbox) {
          // Fallback to old lightbox
          window.ChurchLightbox.open(photos, 0);
        }
      });
    });
  }

  window.initMinistryCarousels = initMinistryCarousels;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMinistryCarousels);
  } else {
    initMinistryCarousels();
  }
})();
