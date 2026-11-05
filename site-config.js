// ─────────────────────────────────────────────────────────────────────────────
// site-config.js — everything specific to hollypoppins.com
// Data only. This repo is a theme of GroveMinder: the pages, site-core.js (the
// logic that reads this file) and the PHP come from gizmo2222/groveminder at
// the version pinned in .github/workflows/deploy.yml.
// ─────────────────────────────────────────────────────────────────────────────

const SITE_CONFIG = {

    // ── Firebase ──────────────────────────────────────────────────────────────
    // The PHP endpoints read projectId (and siteName below) from this file, so
    // keep those two values in double quotes.
    firebase: {
        apiKey:            "AIzaSyB5izE8G_gXRRW-RRt54bT6eyqxaxP-14U",
        authDomain:        "holly-poppins.firebaseapp.com",
        projectId:         "holly-poppins",
        storageBucket:     "holly-poppins.firebasestorage.app",
        messagingSenderId: "642721769952",
        appId:             "1:642721769952:web:602735a6e48903612e2385"
    },

    // ── Identity ──────────────────────────────────────────────────────────────
    siteName: "Holly Poppins",
    navEmoji: "☂",                              // shown in nav + footer + favicon
    tagline:  "Perfectly Imperfect and That's OK",
    heroDesc: "Trusted, caring, and dependable — available for nannying, pet sitting, and more. Let's find a time that works perfectly for your family.",

    // Image shown in the hero instead of navEmoji. The deploy uploads it.
    heroImage: "umbrella.png",

    // ── Theme ─────────────────────────────────────────────────────────────────
    // GroveMinder's "coastal" preset is Holly's palette exactly: navy #1B2A4A,
    // gold #D4AF37, cream #FAF6ED. Add a key to `colors` only to move one colour
    // away from the preset (primary, primaryLight, primaryDark, accent,
    // accentLight, bg).
    theme: "coastal",
    colors: {},

    // Holly's colours are fixed: the admin panel has no Appearance picker and
    // the theme above always wins. Remove this line to show the picker.
    themePicker: false,

    // ── Copy ──────────────────────────────────────────────────────────────────
    // Holly's wording. Anything left out uses GroveMinder's neutral default.
    copy: {
        navBook:                "Book Me",
        navAsk:                 "Ask Holly",
        testimonialsEmpty:      "Kind words from the families I care for will be shared here soon.",
        notesPlaceholder:       "Ages of children, special needs, expected duration, etc.",
        roleExample:            "Nanny Client · 2 years",
        ratesIntro:             "Rates vary depending on the service, the number of children, hours, and any special requirements. I prefer to discuss pricing personally so I can give you an accurate, fair quote tailored to your situation.",
        rateDetailsPlaceholder: "Number of children, typical hours per week, any special considerations...",
        rateNotesExample:       "+$10 for 2+ kids",
    },

    // ── Default content ───────────────────────────────────────────────────────
    // Shown before the admin has saved anything to Firestore.

    defaultServices: [
        { id: 'nanny',      icon: '👶', name: 'Nanny & Childcare',       desc: 'Attentive, nurturing care for children of all ages — meals, activities, homework help, and bedtime routines.', active: true, rate: { base: '', min: '', notes: '', public: false } },
        { id: 'petsitting', icon: '🐾', name: 'Pet Sitting',             desc: "Loving, attentive care for your pets while you're away — feeding, walks, playtime, and plenty of cuddles.",    active: true, rate: { base: '', min: '', notes: '', public: false } },
        { id: 'activities', icon: '🎨', name: 'Activities & Enrichment', desc: 'Creative play, arts & crafts, outdoor adventures, and age-appropriate educational experiences.',                active: true, rate: { base: '', min: '', notes: '', public: false } },
        { id: 'household',  icon: '🏠', name: 'Household Support',       desc: 'Light tidying, meal prep, school pickups, and errands to keep the family day running smoothly.',                 active: true, rate: { base: '', min: '', notes: '', public: false } },
        { id: 'tutoring',   icon: '📚', name: 'Tutoring',                desc: 'Patient, encouraging academic support across subjects — homework help, test prep, and building study skills.',   active: true, rate: { base: '', min: '', notes: '', public: false } },
    ],

    // Real testimonials are approved in the admin panel. Leave this empty: the
    // public page holds the space with a short note until the first one is published.
    defaultTestimonials: [],

    defaultFaq: [
        { q: 'What ages do you work with?',              a: 'I work with children from infants through high school age. I also offer pet sitting for dogs, cats, and other small animals, and have experience with a wide range of personalities and needs.' },
        { q: 'What are your typical hours?',             a: "My availability varies week to week — the calendar on this page always reflects my current open dates. I'm generally available mornings and afternoons, with some evenings. Weekend availability is limited but possible." },
        { q: 'Do you do overnights or travel nannying?', a: 'Yes, on a case-by-case basis. Please include details in your booking request or reach out directly so we can discuss arrangements and rates.' },
        { q: 'Are you CPR / First Aid certified?',       a: "Yes — I hold current CPR and First Aid certification. Safety is always the top priority, and I'm happy to share documentation upon request." },
        { q: 'How does payment work?',                   a: 'Payment is accepted via Venmo or Cash App, typically at the end of each session. Recurring clients may arrange weekly invoicing. See the Pay section below for links.' },
        { q: 'How do I cancel or reschedule?',           a: "Life happens! Please give at least 24 hours notice when possible. Just reply to your confirmation email or use the Ask a Question form to reach me." },
    ],
};
