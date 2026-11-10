# Cornerstone Tamil Church Coventry — Complete Modern Redesign

A premium, modern, elegant website rebuilt for **Cornerstone Church of God, Coventry** (established 2001) and its first branch **Rugby Tamil Cornerstone Church of God** (established 16 March 2025).

The visual design language is inspired by the clean, modern digital aesthetic of the **GenZova Software Solutions** website (crisp white navigation bar, royal blue action buttons, deep navy hero sections, spacious rounded cards with subtle drop shadows, light blue section backgrounds, elegant serif typography) adapted specifically for a reverent, authentic Christian Church website.

---

## 🎨 Visual Design Language & Color System

| Role | Tone | Hex Code | Visual Application |
|---|---|---|---|
| **Primary Blue** | Royal Blue | `#2455D6` | Primary action buttons, active navigation pills, card highlights |
| **Deep Navy** | Deep Navy | `#0D1B45` | Homepage & subpage heroes, announcement banners, footer |
| **Secondary Blue** | Electric Accent | `#3567E8` | Button hover states, interactive focus rings, subtle gradients |
| **Pure White** | Pure White | `#FFFFFF` | Sticky navigation bar, card bodies, clean backgrounds |
| **Light Blue** | Soft Tint | `#EFF5FF` | Alternating section backgrounds, icon circle badges, subtle fills |
| **Soft Blue** | Ice Blue | `#DCE8FF` | Secondary borders, pill badges, subtle active states |
| **Main Text** | Charcoal | `#252B3A` | Primary body headings, high-contrast readable text |
| **Secondary Text** | Slate Grey | `#68738A` | Subtitles, descriptions, captions, scripture citations |
| **Border Tone** | Subtle Grey | `#E2E8F0` | Card borders, dividers, subtle separators |

---

## 📁 Project Architecture

```
church-website-redesign/
│
├── index.html           # Homepage (Fixed hero text, auto-slideshow img1-img4, authentic building exterior)
├── about.html           # About Us (Story & origins, 3-column Meaning of Cornerstone, statement of faith)
├── services.html        # Services & Timings (English 10:30 AM, Tamil 11:30 AM, Rugby 4:00 PM)
├── events.html          # Events Archive (Chronological timeline, 6 embedded YouTube videos, 35 photos)
├── gallery.html         # Photo Gallery (Alternating Zigzag layout, 6 automated sliders, 41 photos in total)
├── rugby.html           # Rugby Branch (Full recovered content: 3 pillars, poster, 5 programmes, contacts)
├── contact.html         # Contact & Visit Planner (Interactive form, directions, phone numbers, map)
│
├── assets/
│   ├── images/
│   │   ├── hero/        # Authentic building photos (img1.png, img2.png, img3.png, img4.png)
│   │   ├── church/      # Coventry sanctuary and congregation photos
│   │   ├── events/      # Authentic event photographs (BBC Live, Carols, Easter, Mother's Day)
│   │   ├── worship/     # Altar and worship team photos
│   │   ├── gallery/     # Complete gallery image vault
│   │   └── rugby/       # Rugby building, official poster, logo, and fellowship photos
│   └── icons/           # Clean SVG iconography (address, email, phone)
│
├── data/
│   ├── events.json      # Structured database of verified events, dates, and locations
│   ├── gallery.json     # 41 unique verified authentic photographs mapped to categories
│   ├── rugby.json       # Complete recovered branch history, 3 pillars, programmes, leadership
│   └── videos.json      # 6 authentic YouTube videos mapped to Christmas 2025 BBC Live, Carols, Mother's Day
│
├── css/
│   └── style.css        # Complete unified styling: responsive grid, zigzag rows, video cards, carousels
│
├── js/
│   └── main.js          # Sticky nav, mobile drawer, hero slider, carousels, lightbox modal, form validation
│
└── README.md
```

---

## 🌟 Key Features & Implementation Highlights

### 1. Gallery Page (`gallery.html`) — Alternating Zigzag Layout
- **Visual Structure (Reference Screenshot 6):**
  - **Section 01 (Odd):** Sunday Worship & Sanctuary (Photo LEFT, Text RIGHT)
  - **Section 02 (Even):** Church Roots & Heritage on Howard Street (Text LEFT, Photo RIGHT)
  - **Section 03 (Odd):** Church Celebrations & Mother's Day (Photo LEFT, Text RIGHT)
  - **Section 04 (Even):** Christmas Carol Services & Croydon Fellowship (Text LEFT, Photo RIGHT)
  - **Section 05 (Odd):** BBC Radio Live at Coventry Cathedral & Mission Charity (Photo LEFT, Text RIGHT)
  - **Section 06 (Even):** Rugby Branch Expansion & Community Fellowship (Text LEFT, Photo RIGHT)
- **Automatic Crossfade Slideshow:**
  - For categories with multiple photographs, an automated carousel crossfades images smoothly every 4 seconds.
  - The heading, category badge, and descriptive text remain permanently fixed.
  - Controls include previous/next arrows, dot indicators, hover/keyboard pause, and touch swipe.
  - Clicking any image opens the high-resolution lightbox modal.
- **Complete Photo Archive:**
  - Filterable category grid displaying all 41 unique authentic photographs with zero duplicates and zero church logos.

### 2. Events Page (`events.html`) — Embedded YouTube Videos & Chronological Timeline
- **6 Authenticated YouTube Video Embeds:**
  1. `N-a95qeS89g`: *Vaarthaiyaagi Maamsamaagi — BBC Radio Live at Coventry Cathedral*
  2. `6g5vJvy91bo`: *Paavamillai Saabamillai — BBC Radio Welcome Coventry*
  3. `6pm-0toL2es`: *2024 Christmas Carols Santa Song & Special Presentation*
  4. `_E1W_-Xm_1U`: *Teen Girls Christmas Tamil Praise Dance*
  5. `xEX3ahVyVU0`: *Mother's Day 2024 Celebration — Cornerstone Tamil Church*
  6. `tz_VI_oy6a4`: *2023 Christmas Offering and Support to Ministries in India*
- **Responsive 16:9 Video Cards:**
  - Embedded YouTube player with channel attribution, year badge, title, description, and external watch link.
- **35 Verified Photographs:**
  - Authentic photo gallery attached to each event section with full lightbox support.

### 3. Rugby Church Page (`rugby.html`) — Complete Content Recovery
- **Recovered 3 Pillars (Reference Screenshot 5 & `scraped/pages/rugby-standalone.html`):**
  - **About Us:** Planted 16 March 2025 as the first branch of Cornerstone Coventry (Est. 2001). Biblical meaning of the cornerstone (*Ephesians 2:20*).
  - **Our Vision & Mission:** Building a Christ-centred church. Great Commission (*Matthew 28:19*) & *"Not by might nor by power, but by My Spirit"* (*Zechariah 4:6*).
  - **Our Commitment:** Sharing the Gospel, teaching biblical truth, and serving Rugby (*1 Corinthians 3:11, Colossians 3:14*).
- **Official Sunday Tamil Service Poster:**
  - Authentic poster (`rugby-sunday-service-poster.jpg`) displayed with interactive lightbox zoom.
- **5 Weekly & Monthly Programmes:**
  - Sunday Tamil Service (Sundays 4:00 PM – 6:00 PM, 15 Oliver Street)
  - Sunday School & Children's Ministry (Sundays 4:30 PM)
  - Midweek Bible Teaching (Wednesdays 7:00 PM)
  - Intercessory Prayer & Healing (Fridays 7:30 PM)
  - Monthly Fasting & Fellowship (1st Saturday 10:00 AM)
- **Leadership Profiles:**
  - Senior Pastor: **Pastor Clint Pratheepan** (`07429 194746`)
  - Branch Coordinator: **Bro. Sanjeev Vivek** (`+44 7447 913889`)
- **Verified Addresses:**
  - Worship Hall: **15 Oliver Street, Rugby CV21 2ET**
  - Church Office: **52 Oliver Street, Rugby CV21 3EU**
  - Direct Email: `rugbycornerstonechurchofgod@gmail.com`

### 4. Homepage & About Us Precision Refinements
- **Authentic Building Exterior:**
  - Replaced the previous dancing photo on "Rooted in Christ, Serving Coventry Since 2001" with `img1.png` and `img2.png` (authentic exterior of our Howard Street church building).
- **Hero Image Slideshow:**
  - Cycles cleanly between `img1.png`, `img2.png`, `img3.png`, and `img4.png` every 5 seconds while retaining fixed hero text.
- **Meaning of Cornerstone Layout:**
  - Refined into an editorial 3-column layout with SVG icons, scripture badges (`Isaiah 28:16`, `Ephesians 2:20`, `Colossians 3:14`), and clean GenZova styling.

---

## 🔒 Source Integrity Guarantee
- The original source project `church-website/` has been preserved 100% untouched.
- All redesigned pages and assets exist strictly inside `church-website-redesign/`.
