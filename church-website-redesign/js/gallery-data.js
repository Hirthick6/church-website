/**
 * CORNERSTONE TAMIL CHURCH COVENTRY — PHOTOGRAPHY & EVENTS DATA REPOSITORY
 * Centralized data store for gallery photos, event narratives, videos, and categories.
 * Single source of truth for gallery.html and index.html.
 */

(function () {
  'use strict';

  // 1. ALL AUTHENTIC GALLERY PHOTOGRAPHS (37 unique photos across 8 verified categories)
  const GALLERY_PHOTOS = [
    // SUNDAY WORSHIP (3 Photos)
    {
      "id": "sunday-worship-1",
      "src": "assets/images/events/christmas-2022-new-year-2023/06.jpg",
      "alt": "Sunday Worship Service at Howard Street Sanctuary",
      "title": "Sunday Worship Service at Howard Street Sanctuary",
      "caption": "Sanctuary worship service with congregation seated in rows listening to preaching from the pulpit in front of the illuminated cross",
      "category": "sunday-worship",
      "categoryLabel": "Sunday Worship",
      "isPoster": false,
      "homeRow": "building"
    },
    {
      "id": "sunday-worship-2",
      "src": "assets/images/church/gallery-praise-and-worship.jpg",
      "alt": "Youth & Believers Praise and Worship",
      "title": "Youth & Believers Praise and Worship",
      "caption": "Young believers and choir members united in praise during worship service",
      "category": "sunday-worship",
      "categoryLabel": "Sunday Worship",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "sunday-worship-3",
      "src": "assets/images/events/events-2022-worship-service.jpg",
      "alt": "Praise Team Leading Congregational Worship",
      "title": "Praise Team Leading Congregational Worship",
      "caption": "Praise and worship team leading the congregation in songs of reverence and adoration in the sanctuary",
      "category": "sunday-worship",
      "categoryLabel": "Sunday Worship",
      "isPoster": false,
      "homeRow": null
    },

    // CHURCH FAMILY & FELLOWSHIP (7 Photos)
    {
      "id": "fellowship-1",
      "src": "assets/images/church/gallery-sunday-congregation.jpg",
      "alt": "Church Family Anniversary Celebration",
      "title": "Church Family Anniversary Celebration",
      "caption": "Church family, congregation, elders, and children gathered around the celebration cake on stage with Pastor Clint",
      "category": "fellowship",
      "categoryLabel": "Church Family & Fellowship",
      "isPoster": false,
      "homeRow": "family"
    },
    {
      "id": "fellowship-2",
      "src": "assets/images/church/gallery-service-worship.jpg",
      "alt": "Women’s Fellowship in Traditional Attire",
      "title": "Women’s Fellowship in Traditional Attire",
      "caption": "Women’s fellowship group photo of over 25 church sisters and mothers in colourful traditional sarees",
      "category": "fellowship",
      "categoryLabel": "Church Family & Fellowship",
      "isPoster": false,
      "homeRow": "family"
    },
    {
      "id": "fellowship-3",
      "src": "assets/images/church/gallery-worship-team.jpg",
      "alt": "Men’s Fellowship Gathering",
      "title": "Men’s Fellowship Gathering",
      "caption": "Men’s fellowship group photo of over 25 brothers and leaders gathered together on stage",
      "category": "fellowship",
      "categoryLabel": "Church Family & Fellowship",
      "isPoster": false,
      "homeRow": "mens"
    },
    {
      "id": "fellowship-4",
      "src": "assets/images/events/christmas-2022-new-year-2023/05.jpg",
      "alt": "Church Family Shared Fellowship Meal",
      "title": "Church Family Shared Fellowship Meal",
      "caption": "Church dining hall fellowship meal with congregation members, families, and youth dining together",
      "category": "fellowship",
      "categoryLabel": "Church Family & Fellowship",
      "isPoster": false,
      "homeRow": "family"
    },
    {
      "id": "fellowship-5",
      "src": "assets/images/events/christmas-2022-new-year-2023/09.jpg",
      "alt": "Pastoral Blessing and Honor",
      "title": "Pastoral Blessing and Honor",
      "caption": "Pastoral leaders and visiting elders presenting gifts and floral blessing to church brother on stage",
      "category": "fellowship",
      "categoryLabel": "Church Family & Fellowship",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "fellowship-6",
      "src": "assets/images/hero/img1.jpg",
      "alt": "Howard Street Church Building Exterior",
      "title": "Howard Street Church Building Exterior",
      "caption": "Howard Street Church building exterior corner view with white cross facade",
      "category": "fellowship",
      "categoryLabel": "Church Family & Fellowship",
      "isPoster": false,
      "homeRow": "building"
    },
    {
      "id": "fellowship-7",
      "src": "assets/images/img2.jpg",
      "alt": "Howard Street Church Main Entrance Facade",
      "title": "Howard Street Church Main Entrance Facade",
      "caption": "Howard Street Church building main entrance doors and illuminated cross facade with lawn",
      "category": "fellowship",
      "categoryLabel": "Church Family & Fellowship",
      "isPoster": false,
      "homeRow": "building"
    },

    // CHRISTMAS (10 Photos)
    {
      "id": "christmas-1",
      "src": "assets/images/events/christmas-2024-carol-service/01.jpg",
      "alt": "2024 Christmas Carol Service Choir",
      "title": "2024 Christmas Carol Service Choir",
      "caption": "Choir and vocalists in festive green and gold attire leading congregational carols on stage",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": "christmas"
    },
    {
      "id": "christmas-2",
      "src": "assets/images/events/christmas-2024-carol-service/03.jpg",
      "alt": "Children & Youth Nativity Play",
      "title": "Children & Youth Nativity Play",
      "caption": "Children and youth performing nativity scene on stage with castle backdrop",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "christmas-3",
      "src": "assets/images/events/christmas-2023-carol-service/08.jpg",
      "alt": "Women's Carol Choir in Festive Sarees",
      "title": "Women's Carol Choir in Festive Sarees",
      "caption": "Women’s choir singing praises into microphones on stage during Christmas carol service",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "christmas-4",
      "src": "assets/images/events/events-2022-christmas-gathering.jpg",
      "alt": "Men's Fellowship Christmas Carol Praise",
      "title": "Men's Fellowship Christmas Carol Praise",
      "caption": "Brothers and leaders in festive red attire singing carols seated with traditional instruments",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "christmas-5",
      "src": "assets/images/events/christmas-2023-carol-service/02.jpg",
      "alt": "Classical Indian Christian Praise Dance",
      "title": "Classical Indian Christian Praise Dance",
      "caption": "Classical Indian Christian praise dance performance on decorated stage celebrating Christ's birth",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "christmas-6",
      "src": "assets/images/events/christmas-2023-carol-service/04.jpg",
      "alt": "Children & Youth Christmas Choir",
      "title": "Children & Youth Christmas Choir",
      "caption": "Children and youth choir in red Christmas sweaters singing joyous carols into microphones",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "christmas-7",
      "src": "assets/images/events/christmas-2024-croydon/02.jpg",
      "alt": "Croydon London Christmas Carol Choir",
      "title": "Croydon London Christmas Carol Choir",
      "caption": "Cornerstone Tamil Church choir singing festive carols on stage at Croydon London Fellowship",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "christmas-8",
      "src": "assets/images/events/christmas-2022-new-year-2023/01.jpg",
      "alt": "Women’s Carol Choir by Christmas Tree",
      "title": "Women’s Carol Choir by Christmas Tree",
      "caption": "Women’s choir in festive sarees singing O Come All Ye Faithful by the illuminated Christmas tree",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "christmas-9",
      "src": "assets/images/events/christmas-2022-new-year-2023/07.jpg",
      "alt": "Illuminated Sanctuary Stage & Altar",
      "title": "Illuminated Sanctuary Stage & Altar",
      "caption": "Howard Street sanctuary stage decorated with illuminated Christmas trees, lanterns, and cross",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": "christmas"
    },
    {
      "id": "christmas-10",
      "src": "assets/images/events/christmas-2025-bbc-live/02.jpg",
      "alt": "Coventry Cathedral Nave Congregation Assembly",
      "title": "Coventry Cathedral Nave Congregation Assembly",
      "caption": "Cornerstone choir and congregation gathered inside the historic Coventry Cathedral nave",
      "category": "christmas",
      "categoryLabel": "Christmas",
      "isPoster": false,
      "homeRow": "bbc"
    },

    // MOTHER'S DAY (6 Photos)
    {
      "id": "mothers-day-1",
      "src": "assets/images/events/mothers-day-2023/06.jpg",
      "alt": "All Women of Cornerstone Church",
      "title": "All Women of Cornerstone Church",
      "caption": "All mothers and women of Cornerstone church gathered on stage holding roses",
      "category": "mothers-day",
      "categoryLabel": "Mother's Day",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "mothers-day-2",
      "src": "assets/images/events/mothers-day-2023/02.jpg",
      "alt": "Women Worship Leaders Leading Prayers",
      "title": "Women Worship Leaders Leading Prayers",
      "caption": "Women worship leaders leading Sunday prayers at the pulpit in front of the cross",
      "category": "mothers-day",
      "categoryLabel": "Mother's Day",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "mothers-day-3",
      "src": "assets/images/events/mothers-day-2023/03.jpg",
      "alt": "Song by Mothers of Cornerstone",
      "title": "Song by Mothers of Cornerstone",
      "caption": "Mothers and young boy singing special praise anthem on stage during Mother’s Day service",
      "category": "mothers-day",
      "categoryLabel": "Mother's Day",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "mothers-day-4",
      "src": "assets/images/events/mothers-day-2023/04.jpg",
      "alt": "Mother's Day Bible Reading",
      "title": "Mother's Day Bible Reading",
      "caption": "Senior mother of the church reading scripture at the glass pulpit during Mother’s Day service",
      "category": "mothers-day",
      "categoryLabel": "Mother's Day",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "mothers-day-5",
      "src": "assets/images/events/mothers-day-2023/05.jpg",
      "alt": "Mother's Day Sermon Message",
      "title": "Mother's Day Sermon Message",
      "caption": "Church mother in traditional blue saree and lace veil delivering sermon message",
      "category": "mothers-day",
      "categoryLabel": "Mother's Day",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "mothers-day-6",
      "src": "assets/images/events/mothers-day-2023/01.jpg",
      "alt": "Mother’s Day Celebration Service Poster",
      "title": "Mother’s Day Celebration Service Poster",
      "caption": "Mother’s Day celebration service poster with pink floral bouquet and scripture announcement",
      "category": "mothers-day",
      "categoryLabel": "Mother's Day",
      "isPoster": true,
      "homeRow": null
    },

    // EASTER & PALM SUNDAY (3 Photos)
    {
      "id": "easter-1",
      "src": "assets/images/events/easter-2023/01.jpg",
      "alt": "Palm Sunday Service Poster",
      "title": "Palm Sunday Service Poster",
      "caption": "Palm Sunday service poster with palm branches proclaiming Hosanna to the Son of David",
      "category": "easter",
      "categoryLabel": "Easter & Palm Sunday",
      "isPoster": true,
      "homeRow": null
    },
    {
      "id": "easter-2",
      "src": "assets/images/events/easter-2023/02.jpg",
      "alt": "Good Friday Solemn Service Poster",
      "title": "Good Friday Solemn Service Poster",
      "caption": "Good Friday solemn communion service poster with Calvary cross silhouette",
      "category": "easter",
      "categoryLabel": "Easter & Palm Sunday",
      "isPoster": true,
      "homeRow": null
    },
    {
      "id": "easter-3",
      "src": "assets/images/events/easter-2023/03.jpg",
      "alt": "Easter Sunday Resurrection Celebration Poster",
      "title": "Easter Sunday Resurrection Celebration Poster",
      "caption": "Easter Sunday resurrection worship celebration announcement poster",
      "category": "easter",
      "categoryLabel": "Easter & Palm Sunday",
      "isPoster": true,
      "homeRow": null
    },

    // THANKSGIVING (2 Photos)
    {
      "id": "thanksgiving-1",
      "src": "assets/images/events/christmas-2025/03.jpg",
      "alt": "Thanksgiving Celebration Service Poster",
      "title": "Thanksgiving Celebration Service Poster",
      "caption": "Thanksgiving celebration service poster with Luke 17:15, praying hands, and white doves",
      "category": "thanksgiving",
      "categoryLabel": "Thanksgiving",
      "isPoster": true,
      "homeRow": null
    },
    {
      "id": "thanksgiving-2",
      "src": "assets/images/events/christmas-2025/04.jpg",
      "alt": "Watchnight & New Year Praise Poster",
      "title": "Watchnight & New Year Praise Poster",
      "caption": "Watchnight prayer service announcement poster with countdown clock and fireworks",
      "category": "thanksgiving",
      "categoryLabel": "Thanksgiving",
      "isPoster": true,
      "homeRow": null
    },

    // RUGBY CHURCH (7 Photos)
    {
      "id": "rugby-1",
      "src": "assets/images/church/rugby-church-building.jpg",
      "alt": "Rugby Branch Sanctuary Building Exterior",
      "title": "Rugby Branch Sanctuary Building Exterior",
      "caption": "Rugby branch sanctuary building exterior on Oliver Street with cross and notice board",
      "category": "rugby",
      "categoryLabel": "Rugby Church",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "rugby-2",
      "src": "assets/images/rugby/rugby-gallery-1-preaching.jpg",
      "alt": "Pastor Clint Preaching at Rugby Branch",
      "title": "Pastor Clint Preaching at Rugby Branch",
      "caption": "Pastor Clint preaching from the pulpit at the Rugby branch with bilingual Scripture projection",
      "category": "rugby",
      "categoryLabel": "Rugby Church",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "rugby-3",
      "src": "assets/images/rugby/rugby-gallery-2-prayer.jpg",
      "alt": "Prayer and Intercession at Rugby Branch",
      "title": "Prayer and Intercession at Rugby Branch",
      "caption": "Congregational intercessory prayer and supplication at the Rugby sanctuary pulpit",
      "category": "rugby",
      "categoryLabel": "Rugby Church",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "rugby-4",
      "src": "assets/images/rugby/rugby-gallery-3-worship.jpg",
      "alt": "Worship Service & Prayer Requests in Rugby",
      "title": "Worship Service & Prayer Requests in Rugby",
      "caption": "Worship leader ministering before the pulpit and prayer requests altar during Sunday gathering in Rugby",
      "category": "rugby",
      "categoryLabel": "Rugby Church",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "rugby-5",
      "src": "assets/images/rugby/rugby-gallery-4-worship.jpg",
      "alt": "Worship Team Musical Adoration in Rugby",
      "title": "Worship Team Musical Adoration in Rugby",
      "caption": "Keyboardist and worship team leading musical adoration during Rugby branch Sunday service",
      "category": "rugby",
      "categoryLabel": "Rugby Church",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "rugby-6",
      "src": "assets/images/rugby/rugby-gallery-5-worship.jpg",
      "alt": "Worship Praise at Rugby Branch",
      "title": "Worship Praise at Rugby Branch",
      "caption": "Worship team leading praise and adoration during Sunday service at Rugby branch",
      "category": "rugby",
      "categoryLabel": "Rugby Church",
      "isPoster": false,
      "homeRow": null
    },
    {
      "id": "rugby-7",
      "src": "assets/images/rugby/rugby-gallery-6-fasting-prayer.jpg",
      "alt": "Fasting Prayer Meeting at Rugby Branch",
      "title": "Fasting Prayer Meeting at Rugby Branch",
      "caption": "Believers gathered in fervent prayer and intercession during fasting prayer meeting at Rugby branch",
      "category": "rugby",
      "categoryLabel": "Rugby Church",
      "isPoster": false,
      "homeRow": null
    },

    // OUTREACH & MISSIONS (1 Photo)
    {
      "id": "outreach-1",
      "src": "assets/images/events/christmas-2022-new-year-2023/04.jpg",
      "alt": "City Square Gospel Evangelism Outreach",
      "title": "City Square Gospel Evangelism Outreach",
      "caption": "Church members holding gospel banners in Coventry city square during street evangelism outreach",
      "category": "outreach",
      "categoryLabel": "Outreach & Missions",
      "isPoster": false,
      "homeRow": null
    }
  ];

  // 2. GALLERY CATEGORIES CONFIGURATION (Synchronized counts)
  const GALLERY_CATEGORIES = [
    {
      "key": "sunday-worship",
      "label": "Sunday Worship",
      "count": 3,
      "tagline": "Gathered in reverence, lifting holy hands in bilingual Tamil & English worship.",
      "description": "Congregation worshipping together, praise and worship team, scripture preaching, pastoral prayer, and sanctuary communion."
    },
    {
      "key": "fellowship",
      "label": "Church Family & Fellowship",
      "count": 7,
      "tagline": "United as one family in Christ, walking together in love and mutual support.",
      "description": "Celebrating church anniversaries, celebratory communal dinners, Sunday School presentations, and gatherings uniting believers across every generation."
    },
    {
      "key": "christmas",
      "label": "Christmas",
      "count": 10,
      "tagline": "Celebrating the Light of the World with carols, nativity plays, and festive joy.",
      "description": "Annual Christmas carol services, nativity plays, BBC Radio CWR live broadcast at Coventry Cathedral, Croydon London fellowship, and candlelight services."
    },
    {
      "key": "mothers-day",
      "label": "Mother's Day",
      "count": 6,
      "tagline": "Honouring godly mothers with love, gratitude, and heartfelt blessings.",
      "description": "Special Mother’s Day Sunday services celebrating the vital role of mothers in the home and church with prayers, flowers, and worship."
    },
    {
      "key": "easter",
      "label": "Easter & Palm Sunday",
      "count": 3,
      "tagline": "Commemorating the cross and rejoicing in Christ’s glorious resurrection victory.",
      "description": "Solemn Good Friday communion remembrances and joyous Easter Sunday celebrations proclaiming the living Savior."
    },
    {
      "key": "thanksgiving",
      "label": "Thanksgiving",
      "count": 2,
      "tagline": "Recounting God’s faithfulness, giving thanks for answered prayers and abundant grace.",
      "description": "Annual milestone services where the congregation testifies to God’s goodness and provides harvest offerings in joyful thanksgiving."
    },
    {
      "key": "rugby",
      "label": "Rugby Church",
      "count": 7,
      "tagline": "Authentic moments of preaching, prayer, and worship from our Sunday services and fasting meetings in Rugby.",
      "description": "Sunday worship services, prayer meetings, fasting prayer gatherings, and community outreach for our branch congregation meeting in Rugby. Click any photo to enlarge."
    },
    {
      "key": "outreach",
      "label": "Outreach & Missions",
      "count": 1,
      "tagline": "Reaching beyond our walls to serve the needy and proclaim the Gospel of Christ.",
      "description": "City square gospel evangelism outreach, charitable support to care homes and orphanages, and international mission partnerships."
    }
  ];

  // 3. COMPLETE EVENTS DATA REPOSITORY
  const EVENTS_DATA = [
    {
      id: 'xmas-2025',
      categories: ['christmas', 'outreach'],
      date: 'December 2025',
      location: 'Coventry Cathedral, Priory Street, Coventry',
      badge: 'Milestone Broadcast',
      title: 'Christmas 2025 BBC Radio Live at Coventry Cathedral',
      description: 'Cornerstone Tamil Church Coventry achieved a historic milestone by participating in the live BBC Radio Christmas broadcast at the world-renowned Coventry Cathedral. Believers gathered beneath the cathedral’s iconic tapestry and soaring architecture to sing traditional carols and Tamil hymns, sharing the message of Christ’s nativity with tens of thousands of listeners across the United Kingdom.',
      videos: [
        {
          id: 'N-a95qeS89g',
          title: 'Vaarthaiyaagi Maamsamaagi — BBC Radio Live at Coventry Cathedral',
          desc: 'Cornerstone Tamil Church choir performing “Vaarthaiyaagi Maamsamaagi” during the live BBC Radio Christmas broadcast.',
          isUnavailable: false
        },
        {
          id: '6g5vJvy91bo',
          title: 'Paavamillai Saabamillai — BBC Radio Welcome Coventry',
          desc: 'Bilingual Tamil and English praise presentation “Paavamillai Saabamillai” broadcast live by BBC Radio CWR from Coventry Cathedral.',
          isUnavailable: false
        }
      ],
      photos: [
        {
          src: 'assets/images/events/google_img_20_cbd8bbc2.jpg',
          alt: 'BBC Radio CWR Christmas Live Broadcast banner at Coventry Cathedral',
          caption: 'BBC Radio CWR Christmas Live Broadcast banner at Coventry Cathedral.',
          isPoster: true
        },
        {
          src: 'assets/images/events/google_img_21_b7ce9682.jpg',
          alt: 'Cathedral choir in vibrant green attire leading Christmas praises',
          caption: 'Cathedral choir in vibrant green attire leading Christmas praises.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_22_836958bf.jpg',
          alt: 'Worship and celebration on the iconic Coventry Cathedral stage',
          caption: 'Worship and celebration on the iconic Coventry Cathedral stage.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_23_45bb2332.jpg',
          alt: 'Cornerstone church choir and pastoral team following the BBC broadcast',
          caption: 'Cornerstone church choir and pastoral team following the BBC broadcast.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_19_acae5050.jpg',
          alt: 'Choir and congregation gathering inside Coventry Cathedral nave',
          caption: 'Choir and congregation gathering inside Coventry Cathedral nave.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_24_81bf81c5.jpg',
          alt: 'Cathedral nave filled with praise during live broadcast service',
          caption: 'Cathedral nave filled with praise during live broadcast service.',
          isPoster: false
        }
      ]
    },

    {
      id: 'xmas-2024',
      categories: ['christmas', 'fellowship'],
      date: '22 December 2024',
      location: 'Howard Street Sanctuary & Croydon, London',
      badge: 'Choral Fellowship',
      title: '2024 Christmas Carol with Croydon London Fellowship',
      description: 'On Sunday, 22nd December 2024, our annual Christmas Carol celebration brought together families from Coventry, Warwickshire, and our visiting brothers and sisters from Croydon, London. The evening featured uplifting choir cantatas, traditional Tamil carols, youth choreography, Scripture recitations, and a generous communal fellowship feast.',
      videos: [
        {
          id: '6pm-0toL2es',
          title: '2024 Christmas Carols Santa Song & Special Presentation',
          desc: 'Children and youth festive carol presentation during the 2024 Christmas Carol service on 22 December 2024.',
          isUnavailable: false
        },
        {
          id: '_E1W_-Xm_1U',
          title: 'Teen Girls Christmas Tamil Praise Dance',
          desc: 'Teen girls performing a choreographic Tamil worship dance celebrating the birth of Christ during Christmas 2024.',
          isUnavailable: true // Detected unavailable on YouTube embed; renders clean fallback button card
        }
      ],
      photos: [
        {
          src: 'assets/images/events/google_img_27_c8eb2ae1.jpg',
          alt: 'Joint festive carol celebration banner with Croydon, London fellowship',
          caption: 'Joint festive carol celebration banner with Croydon, London fellowship.',
          isPoster: true
        },
        {
          src: 'assets/images/events/google_img_28_68413521.jpg',
          alt: 'Combined choirs leading Tamil and English Christmas carols on stage',
          caption: 'Combined choirs leading Tamil and English Christmas carols on stage.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_29_8eb2f340.jpg',
          alt: 'Christmas fellowship feast uniting Coventry and London church families',
          caption: 'Christmas fellowship feast uniting Coventry and London church families.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_32_a07dc561.jpg',
          alt: 'Sanctuary congregation celebration during 2024 Christmas service',
          caption: 'Sanctuary congregation celebration during 2024 Christmas service.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_26_09b37237.jpg',
          alt: 'Youth and children staging the nativity story proclaiming Christ’s birth',
          caption: 'Youth and children staging the nativity story proclaiming Christ’s birth.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_31_6176d6fc.jpg',
          alt: 'Cornerstone choir ensemble singing praises of peace and joy',
          caption: 'Cornerstone choir ensemble singing praises of peace and joy.',
          isPoster: false
        }
      ]
    },

    {
      id: 'mothers-day',
      categories: ['mothers-day'],
      date: 'March 2024 & March 2023',
      location: 'Cornerstone Church, Coventry',
      badge: 'Honouring Faith',
      title: "Mother's Day Celebrations & Women of God",
      description: 'Every year in March, Cornerstone Tamil Church honours, prays for, and celebrates the self-sacrificing mothers and women of our congregation. Featuring special choral presentations by our mothers, Scripture readings from Proverbs 31, and pastoral blessings with floral gifts from Pastor Clint Pratheepan.',
      videos: [
        {
          id: 'xEX3ahVyVU0',
          title: "Mother's Day 2024 Celebration — Cornerstone Tamil Church",
          desc: "Annual Mother's Day service honouring the godly mothers of our congregation with choral anthems, prayers, and blessings.",
          isUnavailable: false
        }
      ],
      photos: [
        {
          src: 'assets/images/events/google_img_46_2f14b61c.jpg',
          alt: 'Cornerstone Mothers Choir performing special praise songs',
          caption: 'Cornerstone Mothers Choir performing special praise songs.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_41_5f263edb.jpg',
          alt: 'Special stage decoration honouring mothers at Cornerstone Church',
          caption: 'Special stage decoration honouring mothers at Cornerstone Church.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_42_63fca021.jpg',
          alt: 'Scripture reading from Proverbs 31 dedicating honor to mothers',
          caption: 'Scripture reading from Proverbs 31 dedicating honor to mothers.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_43_0bdd8a31.jpg',
          alt: 'Pastoral recognition and prayer for mothers and grandmothers',
          caption: 'Pastoral recognition and prayer for mothers and grandmothers.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_44_c96a0fcd.jpg',
          alt: 'Women of Cornerstone Church united in faith and fellowship',
          caption: 'Women of Cornerstone Church united in faith and fellowship.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_45_a2574317.jpg',
          alt: 'Sunday School children choral presentation singing for their mothers',
          caption: 'Sunday School children choral presentation singing for their mothers.',
          isPoster: false
        }
      ]
    },

    {
      id: 'charity-2023',
      categories: ['outreach', 'christmas'],
      date: 'December 2023',
      location: 'Outreach Mission, India & Coventry',
      badge: 'Global Mission',
      title: 'Christmas Charity & Mission Outreach to India',
      description: 'True Christian love extends far beyond four walls. During our 2023 Christmas Carol celebration, Cornerstone Church members raised sacrificial financial offerings to support underprivileged children, orphanages, and rural pioneer ministries in India, providing essential educational kits, warm clothes, and food provisions.',
      videos: [
        {
          id: 'tz_VI_oy6a4',
          title: '2023 Christmas Offering and Support to Ministries in India',
          desc: 'Documenting our congregation’s mission charity offerings delivered to care homes, orphanages, and tribal ministries in India.',
          isUnavailable: false
        }
      ],
      photos: [
        {
          src: 'assets/images/events/google_img_55_cc03e1a2.jpg',
          alt: 'Displaying mission charity offerings delivered to India care homes',
          caption: 'Displaying mission charity offerings delivered to India care homes.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_54_6361a172.jpg',
          alt: '2023 Christmas Carol Service congregation in joyful praise',
          caption: '2023 Christmas Carol Service congregation in joyful praise.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_52_a0ab0d48.jpg',
          alt: 'Mission partners and relief distribution documentation in India',
          caption: 'Mission partners and relief distribution documentation in India.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_57_c0ac020b.jpg',
          alt: 'Cornerstone congregation supporting pioneer gospel workers abroad',
          caption: 'Cornerstone congregation supporting pioneer gospel workers abroad.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_99_63473241.jpg',
          alt: 'Candlelight service singing Silent Night in Tamil and English',
          caption: 'Candlelight service singing Silent Night in Tamil and English.',
          isPoster: false
        }
      ]
    },

    {
      id: 'easter-2023',
      categories: ['easter'],
      date: 'April 2023',
      location: 'Howard Street Sanctuary, Coventry',
      badge: 'Holy Week Triumph',
      title: 'Palm Sunday, Good Friday & Easter Resurrection Celebration',
      description: 'Remembering the supreme sacrifice and celebrating the glorious resurrection of our Lord Jesus Christ across Holy Week. From the joyous Hosanna palm processions to solemn Good Friday Holy Communion and triumphant Resurrection Sunday praise, our church family worshipped our living Savior.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/google_img_37_cd94d45e.jpg',
          alt: 'Church family rejoicing on Easter Sunday at Howard Street',
          caption: 'Church family rejoicing on Easter Sunday at Howard Street.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_34_011661ed.jpg',
          alt: 'The Lord’s Table prepared for Good Friday holy communion',
          caption: 'The Lord’s Table prepared for Good Friday holy communion.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_35_c8659580.jpg',
          alt: 'Sanctuary altar adorned for Easter Sunday resurrection celebration',
          caption: 'Sanctuary altar adorned for Easter Sunday resurrection celebration.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_36_a6d65c53.jpg',
          alt: 'Choral anthem and musical presentation on Resurrection Sunday',
          caption: 'Choral anthem and musical presentation on Resurrection Sunday.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_38_3f833c92.jpg',
          alt: 'Post-service fellowship and refreshments on Easter Sunday',
          caption: 'Post-service fellowship and refreshments on Easter Sunday.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_40_20fe5675.jpg',
          alt: 'Full congregation praising God during Easter resurrection service',
          caption: 'Full congregation praising God during Easter resurrection service.',
          isPoster: false
        },
        {
          src: 'assets/images/events/events-2023-palm-sunday.jpg',
          alt: 'Palm Sunday Hosanna service commemorative flyer',
          caption: 'Palm Sunday Hosanna service commemorative flyer.',
          isPoster: true
        }
      ]
    },

    {
      id: 'xmas-2022',
      categories: ['christmas', 'thanksgiving'],
      date: '31 Dec 2022 – 1 Jan 2023',
      location: 'Howard Street Sanctuary, Coventry',
      badge: 'Watchnight & Hope',
      title: 'Christmas 2022 & New Year Watchnight Service',
      description: 'A festive season marked by rich carol presentations in Tamil and English, joyful family gatherings, and our traditional New Year Watchnight service where believers stepped into 2023 on their knees in thanksgiving, receiving Scripture promises and praying for God’s blessing across our families.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/google_img_70_3f1403a8.jpg',
          alt: 'Watchnight Service midnight altar prayer dedicating the new year',
          caption: 'Watchnight Service midnight altar prayer dedicating the new year.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_67_963d4f62.jpg',
          alt: 'Congregation singing Christmas carols of thanksgiving and hope',
          caption: 'Congregation singing Christmas carols of thanksgiving and hope.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_73_d8d3d364.jpg',
          alt: 'Church family gathering at the start of the new year in fellowship',
          caption: 'Church family gathering at the start of the new year in fellowship.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_62_2efb93bb.jpg',
          alt: 'Cornerstone Tamil Church Coventry celebration photograph',
          caption: 'Cornerstone Tamil Church Coventry celebration photograph.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_66_ab352e6c.jpg',
          alt: 'Congregation sharing testimonies of praise at the threshold of the new year',
          caption: 'Congregation sharing testimonies of praise at the threshold of the new year.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_49_9beb3293.jpg',
          alt: 'United prayer and dedication at the dawn of the new year',
          caption: 'United prayer and dedication at the dawn of the new year.',
          isPoster: false
        }
      ]
    },

    {
      id: 'rugby-plant-2025',
      categories: ['rugby'],
      date: '16 March 2025',
      location: '15 Oliver Street, Rugby CV21 2ET',
      badge: 'First Branch Plant',
      title: 'Cornerstone Rugby Branch Church Inauguration & Worship',
      description: 'Planted on 16 March 2025 as the first branch of Cornerstone Coventry (Est. 2001), our Rugby congregation gathers every Sunday at 4:00 PM for bilingual Tamil worship, prayer, children’s ministry, and community fellowship across Warwickshire.',
      videos: [],
      photos: [
        {
          src: 'assets/images/rugby/rugby-church-building.jpg',
          alt: 'Rugby branch worship hall at 15 Oliver Street',
          caption: 'Rugby branch worship hall at 15 Oliver Street, Rugby CV21 2ET.',
          isPoster: false
        },
        {
          src: 'assets/images/rugby/rugby-fellowship-1.jpg',
          alt: 'Believers gathering for inaugural Sunday worship service',
          caption: 'Believers gathering for inaugural Sunday worship service.',
          isPoster: false
        },
        {
          src: 'assets/images/rugby/rugby-fellowship-2.jpg',
          alt: 'Fellowship and prayer community in Rugby',
          caption: 'Fellowship and prayer community in Rugby.',
          isPoster: false
        },
        {
          src: 'assets/images/rugby/rugby-sunday-service-poster.jpg',
          alt: 'Rugby Sunday Tamil worship service flyer',
          caption: 'Rugby Sunday Tamil worship service flyer.',
          isPoster: true
        }
      ]
    },

    {
      id: 'thanksgiving-annual',
      categories: ['thanksgiving'],
      date: 'Annual Milestone',
      location: 'Howard Street Sanctuary, Coventry',
      badge: 'Grateful Praise',
      title: 'Annual Church Thanksgiving & Praise Celebration',
      description: 'Gathering as a united congregation with grateful hearts to recount the Lord’s faithfulness, celebrate answers to prayer, and dedicate our lives and families afresh for His kingdom.',
      videos: [],
      photos: [
        {
          src: 'assets/images/events/event_orig_1.jpg',
          alt: 'Annual Thanksgiving Service official commemorative poster',
          caption: 'Annual Thanksgiving Service official commemorative poster.',
          isPoster: true
        },
        {
          src: 'assets/images/events/google_img_70_3f1403a8.jpg',
          alt: 'Altar of thanksgiving and midnight prayer of dedication',
          caption: 'Altar of thanksgiving and midnight prayer of dedication.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_66_ab352e6c.jpg',
          alt: 'Testimonies of the Lord’s goodness across two decades of ministry',
          caption: 'Testimonies of the Lord’s goodness across two decades of ministry.',
          isPoster: false
        },
        {
          src: 'assets/images/events/google_img_49_9beb3293.jpg',
          alt: 'Praise and thanksgiving chorus honoring the Lord Jesus Christ',
          caption: 'Praise and thanksgiving chorus honoring the Lord Jesus Christ.',
          isPoster: false
        }
      ]
    }
  ];

  // 4. EVENT FILTER CHIPS CONFIGURATION
  const EVENT_FILTERS = [
    { key: 'all', label: 'All Events' },
    { key: 'christmas', label: 'Christmas' },
    { key: 'mothers-day', label: "Mother's Day" },
    { key: 'easter', label: 'Easter' },
    { key: 'thanksgiving', label: 'Thanksgiving' },
    { key: 'rugby', label: 'Rugby' },
    { key: 'outreach', label: 'Outreach' }
  ];

  // Expose to window as the single source of truth
  window.CHURCH_DATA = {
    photos: GALLERY_PHOTOS,
    categories: GALLERY_CATEGORIES,
    events: EVENTS_DATA,
    eventFilters: EVENT_FILTERS
  };
})();
