/**
 * CORNERSTONE TAMIL CHURCH COVENTRY — EVENTS DATA REPOSITORY
 * Source of truth mapped directly from the original live website:
 * https://www.cornerstonetamilchurch.co.uk/events
 *
 * Structure per event:
 * - id: unique slug
 * - title: exact event title from old website
 * - date: event date
 * - venue: location/venue
 * - badge: tag / badge
 * - categories: array of category keys for filter chips
 * - description: official event description / text
 * - photosFirst: boolean (true if photos appear before video on old page)
 * - videoSectionTitle: optional custom sub-heading for video section
 * - videos: array of { id, title, desc }
 * - photos: array of { src, caption, alt, isPoster }
 */

(function () {
  'use strict';

  const EVENTS_DATA = [
    // -------------------------------------------------------------------------
    // 1. CHRISTMAS 2025
    // -------------------------------------------------------------------------
    {
      id: 'christmas-2025',
      title: 'Christmas 2025',
      date: '25 December 2025',
      venue: 'Howard Street Sanctuary, Coventry',
      badge: 'Christmas Service',
      categories: ['christmas'],
      description: 'Christmas Service and Holy Communion, Thursday 25 December, 10:30 AM, followed by Fellowship & Christmas Lunch. Pastor Clint Pradeepan: 074 29194 746. Howard St, Coventry CV1 4GE.',
      photosFirst: true,
      videos: [],
      photos: [
        {
          src: 'assets/images/events/christmas-2025/01.jpg',
          caption: 'Christmas Service & Holy Communion',
          alt: 'Christmas 2025 - Christmas Service and Holy Communion, Thursday 25 December, 10:30 AM, followed by Fellowship & Christmas Lunch',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2025/02.jpg',
          caption: 'Fellowship & Christmas Gathering',
          alt: 'Christmas 2025 - Celebration and fellowship gathering slide 2',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2025/03.jpg',
          caption: 'Thanksgiving Celebration Service',
          alt: 'Christmas 2025 - Celebration and thanksgiving service slide 3',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2025/04.jpg',
          caption: 'Watchnight & New Year Praise',
          alt: 'Christmas 2025 - Watchnight and New Year praise gathering slide 4',
          isPoster: false
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 2. CHRISTMAS 2025 BBC RADIO LIVE (COVENTRY CATHEDRAL)
    // -------------------------------------------------------------------------
    {
      id: 'christmas-2025-bbc-live',
      title: 'Christmas 2025 BBC radio Live',
      date: 'December 2025',
      venue: 'Coventry Cathedral, Priory Street, Coventry',
      badge: 'BBC Radio Broadcast',
      categories: ['christmas', 'outreach'],
      description: 'A historic celebration as Cornerstone Tamil Church Coventry joined the BBC Radio Live Christmas broadcast at the iconic Coventry Cathedral, sharing praises in Tamil and English with tens of thousands of listeners across the United Kingdom.',
      photosFirst: true,
      videoSectionTitle: '2025 Christmas BBC radio Live at Coventry cathedral',
      videos: [
        {
          id: 'N-a95qeS89g',
          title: 'Vaarthaiyaagi Maamsamaagi BBC Radio Coventry Tamil Church',
          desc: 'Cornerstone Tamil Church choir performing "Vaarthaiyaagi Maamsamaagi" during the BBC Radio Live Christmas broadcast at Coventry Cathedral.'
        },
        {
          id: '6g5vJvy91bo',
          title: 'Paavamillai Saabamillai BBBC Radio Welcome Coventry Tamil Church participation',
          desc: 'Bilingual praise presentation "Paavamillai Saabamillai" broadcast live by BBC Radio from Coventry Cathedral.'
        }
      ],
      photos: [
        {
          src: 'assets/images/events/christmas-2025-bbc-live/01.jpg',
          caption: 'BBC Live',
          alt: 'Christmas 2025 BBC radio Live - BBC Live Christmas at Coventry Cathedral tree and banner',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2025-bbc-live/02.jpg',
          caption: 'Coventry cathedral',
          alt: 'Christmas 2025 BBC radio Live - Coventry cathedral congregation and delegation',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2025-bbc-live/03.jpg',
          caption: 'Cathedral Group Photo 1',
          alt: 'Christmas 2025 BBC radio Live - Cathedral group photo 1',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2025-bbc-live/04.jpg',
          caption: 'Cathedral Group Photo 2',
          alt: 'Christmas 2025 BBC radio Live - Cathedral group photo 2',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2025-bbc-live/05.jpg',
          caption: 'Cathedral Group Photo 3',
          alt: 'Christmas 2025 BBC radio Live - Cathedral group photo 3',
          isPoster: false
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 3. 2024 CHRISTMAS CAROL SERVICE - 22 DEC 2024
    // -------------------------------------------------------------------------
    {
      id: 'christmas-2024-service',
      title: '2024 Christmas Carol service - 22 Dec 2024',
      date: '22 December 2024',
      venue: 'Howard Street Sanctuary, Coventry',
      badge: 'Carol Service',
      categories: ['christmas'],
      description: 'Our annual Christmas carol service held on 22nd December 2024 featuring joyful choir cantatas, traditional carols, and youth praise dance.',
      photosFirst: true,
      videos: [
        {
          id: '6pm-0toL2es',
          title: '2024 Christmas Carols Santa dance Special performance',
          desc: 'Children and youth festive carol presentation during the 2024 Christmas Carol service on 22 December 2024.'
        },
        {
          id: '_E1W_-Xm_1U',
          title: 'TeenGirls Christmas tamil dance',
          desc: 'Teen girls performing a choreographic Tamil worship dance celebrating Christmas 2024.'
        }
      ],
      photos: [
        {
          src: 'assets/images/events/christmas-2024-carol-service/01.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 1',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/02.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 2',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/03.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 3',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/04.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 4',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/05.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 5',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/06.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 6',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/07.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 7',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/08.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 8',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/09.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 9',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/10.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 10',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/11.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 11',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/12.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 12',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/13.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 13',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-carol-service/14.jpg',
          caption: '',
          alt: '2024 Christmas Carol service - 22 Dec 2024 - Photo 14',
          isPoster: false
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 4. 2024 CHRISTMAS CAROL AT CROYDON LONDON
    // -------------------------------------------------------------------------
    {
      id: 'christmas-2024-croydon',
      title: '2024 Christmas Carol at Croydon London',
      date: 'December 2024',
      venue: 'Croydon, London & Howard Street Sanctuary',
      badge: 'Sister Church Fellowship',
      categories: ['christmas', 'fellowship'],
      description: 'Combined Christmas carol fellowship uniting our Coventry congregation with visiting brothers and sisters from Croydon, London, followed by a communal fellowship feast.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/christmas-2024-croydon/01.jpg',
          caption: 'GROUP PHOTO',
          alt: '2024 Christmas Carol at Croydon London - GROUP PHOTO',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-croydon/02.jpg',
          caption: 'SINGING',
          alt: '2024 Christmas Carol at Croydon London - SINGING',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2024-croydon/03.jpg',
          caption: 'CASUAL CLICK',
          alt: '2024 Christmas Carol at Croydon London - CASUAL CLICK',
          isPoster: false
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 5. 2024 MOTHER'S DAY
    // -------------------------------------------------------------------------
    {
      id: 'mothersday-2024',
      title: '2024 Mothers day',
      date: 'March 2024',
      venue: 'Cornerstone Church, Coventry',
      badge: "Mother's Day",
      categories: ['mothers-day'],
      description: 'Honouring and celebrating the mothers and women of Cornerstone Tamil Church Coventry with songs, scripture readings, and pastoral blessings.',
      videos: [
        {
          id: 'xEX3ahVyVU0',
          title: 'MothersDay 2024 Cornerstone tamil church',
          desc: "Annual Mother's Day celebration honouring the godly mothers of our congregation with choral anthems, prayers, and blessings."
        }
      ],
      photos: []
    },

    // -------------------------------------------------------------------------
    // 6. 2023 CHRISTMAS CAROL SERVICE
    // -------------------------------------------------------------------------
    {
      id: 'christmas-2023-carol-service',
      title: '2023 Christmas Carol Service',
      date: 'December 2023',
      venue: 'Howard Street Sanctuary, Coventry',
      badge: 'Carol Service',
      categories: ['christmas'],
      description: 'Annual Christmas carol service celebrating the birth of Jesus Christ with joyful choir worship, scripture readings, and congregation carols.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/christmas-2023-carol-service/01.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 1',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/02.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 2',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/03.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 3',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/04.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 4',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/05.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 5',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/06.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 6',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/07.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 7',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/08.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 8',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/09.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 9',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/10.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 10',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/11.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 11',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/12.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 12',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/13.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 13',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/14.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 14',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/15.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 15',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/16.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 16',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/17.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 17',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2023-carol-service/18.jpg',
          caption: '',
          alt: '2023 Christmas Carol Service - Photo 18',
          isPoster: false
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 7. 2023 CHRISTMAS CHARITY TO INDIAN MINISTRY FROM OUR CHURCH MEMBERS
    // -------------------------------------------------------------------------
    {
      id: 'christmas-2023-charity',
      title: '2023 Christmas Charity to Indian ministry from our church members',
      date: 'December 2023',
      venue: 'Outreach Mission, India & Howard Street Sanctuary',
      badge: 'Charity & Missions',
      categories: ['christmas', 'outreach'],
      description: 'Our congregation’s charitable mission support to Indian ministry, providing offerings to care homes, orphanages, and rural village ministries.',
      videos: [
        {
          id: 'tz_VI_oy6a4',
          title: '2023 Cornerstone Coventry Tamil Church Christmas Offering and Support to Ministries',
          desc: 'Documenting our congregation’s mission charity offerings delivered to care homes, orphanages, and tribal ministries in India.'
        }
      ],
      photos: []
    },

    // -------------------------------------------------------------------------
    // 8. 2023 PALM SUNDAY , GOOD FRIDAY AND EASTER
    // -------------------------------------------------------------------------
    {
      id: 'easter-2023',
      title: '2023 PALM SUNDAY , GOOD FRIDAY AND EASTER',
      date: 'April 2023',
      venue: 'Howard Street Sanctuary, Coventry',
      badge: 'Holy Week Celebration',
      categories: ['easter'],
      description: 'Remembering the sacrifice and celebrating the glorious resurrection of our Lord Jesus Christ across Palm Sunday, Good Friday communion, and Resurrection Sunday celebration.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/easter-2023/01.jpg',
          caption: 'PALM SUNDAY',
          alt: '2023 PALM SUNDAY , GOOD FRIDAY AND EASTER - PALM SUNDAY',
          isPoster: true
        },
        {
          src: 'assets/images/events/easter-2023/02.jpg',
          caption: 'GOOD FRIDAY',
          alt: '2023 PALM SUNDAY , GOOD FRIDAY AND EASTER - GOOD FRIDAY (7th April 2023)',
          isPoster: true
        },
        {
          src: 'assets/images/events/easter-2023/03.jpg',
          caption: 'EASTER SUNDAY',
          alt: '2023 PALM SUNDAY , GOOD FRIDAY AND EASTER - EASTER SUNDAY',
          isPoster: true
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 9. MOTHER'S DAY 2023
    // -------------------------------------------------------------------------
    {
      id: 'mothersday-2023',
      title: "Mother's Day 2023",
      date: 'March 2023',
      venue: 'Howard Street Sanctuary, Coventry',
      badge: "Mother's Day",
      categories: ['mothers-day'],
      description: 'A heartfelt day of gratitude featuring special songs by our mothers, Scripture reading, and preaching honoring the godly women who anchor our families.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/mothers-day-2023/01.jpg',
          caption: 'Mothers Day March 2023',
          alt: "Mother's Day 2023 - Mothers Day March 2023",
          isPoster: false
        },
        {
          src: 'assets/images/events/mothers-day-2023/02.jpg',
          caption: 'Mothers Day 2023',
          alt: "Mother's Day 2023 - Mothers Day 2023",
          isPoster: false
        },
        {
          src: 'assets/images/events/mothers-day-2023/03.jpg',
          caption: 'Song by our Moms of Cornerstone',
          alt: "Mother's Day 2023 - Song by our Moms of Cornerstone",
          isPoster: false
        },
        {
          src: 'assets/images/events/mothers-day-2023/04.jpg',
          caption: 'Bible Reading',
          alt: "Mother's Day 2023 - Bible Reading",
          isPoster: false
        },
        {
          src: 'assets/images/events/mothers-day-2023/05.jpg',
          caption: 'Message',
          alt: "Mother's Day 2023 - Message",
          isPoster: false
        },
        {
          src: 'assets/images/events/mothers-day-2023/06.jpg',
          caption: 'All our Women March 2023',
          alt: "Mother's Day 2023 - All our Women March 2023",
          isPoster: false
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 10. CHRISTMAS 2022 AND NEW YEAR 2023
    // -------------------------------------------------------------------------
    {
      id: 'christmas-2022',
      title: 'Christmas 2022 and New year 2023',
      date: '31 Dec 2022 to 1 Jan 2023',
      venue: 'Howard Street Sanctuary, Coventry',
      badge: 'Watchnight & New Year',
      categories: ['christmas', 'fellowship'],
      description: 'Celebrating the birth of Jesus Christ and welcoming the new year together with our church family in prayer, carol singing, and midnight altar intercession, followed by church hall Christmas fellowship lunch.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/01.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 1',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/02.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 2',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/03.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 3',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/04.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 4',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/05.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 5',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/06.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 6',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/07.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 7',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/08.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 8',
          isPoster: false
        },
        {
          src: 'assets/images/events/christmas-2022-new-year-2023/09.jpg',
          caption: '',
          alt: 'Christmas 2022 and New year 2023 - Photo 9',
          isPoster: false
        }
      ]
    }
  ];

  // Category filter definitions for Events timeline
  const FILTER_CONFIG = [
    { key: 'all', label: 'All Celebrations' },
    { key: 'christmas', label: 'Christmas & Carols' },
    { key: 'easter', label: 'Easter & Holy Week' },
    { key: 'mothers-day', label: "Mother's Day" },
    { key: 'outreach', label: 'Outreach & Missions' },
    { key: 'fellowship', label: 'Community Fellowship' }
  ];

  // Expose globally
  window.CHURCH_EVENTS_DATA = {
    events: EVENTS_DATA,
    filters: FILTER_CONFIG
  };

})();
