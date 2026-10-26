// English copy. Plain words, short sentences, grade 5-8.
// Placeholders filled by build.mjs from src/config.json:
//   {price} {bump} {pages} {buyers} {refunds} {product} {bumpName}
// Inline HTML is allowed. <em> renders as the Playfair italic emphasis word.
// Scientific claims: only the approved formulations (see docs/COPY.md). Do not add new ones
// without a reference in `why.refs`.

export default {
  lang: 'en',
  htmlLang: 'en',
  base: '/',
  bridge: '/go/blueprint/',
  product: 'The Aesthetic Physique Blueprint',
  bumpName: 'The Testosterone Blueprint',
  author: 'Aesthetic Engineer',
  mockup: { src: 'assets/carousel/mockup-en.webp', src720: 'assets/carousel/mockup-en-720.webp', alt: 'The Aesthetic Physique Blueprint, PDF guide cover' },
  insideMockup: { src: 'assets/aesthetic-blueprint-mockup.webp', width: 640, height: 858, alt: 'The Aesthetic Physique Blueprint, PDF guide cover' },

  meta: {
    title: 'Fix Skinny-Fat in the Right Order | The Aesthetic Physique Blueprint',
    description: 'Lean out to a base first, then build muscle without getting fat again. The phase system for skinny-fat guys, with your first 30 days mapped out. {price}.',
    ogTitle: 'The Aesthetic Physique Blueprint',
    ogDescription: 'Fix skinny-fat in the right order: lean out first, then build without getting fat again. {price}.',
    ogImage: 'https://aesthetic-engineer.com/assets/og-image.jpeg?v=2',
    ogLocale: 'en_US',
    ogLocaleAlt: 'es_LA',
    canonical: 'https://aesthetic-engineer.com/',
  },

  cta: 'Get The Blueprint',
  ctaNote: '{price} · one-time · instant PDF',
  skip: 'Skip to content',

  sticky: { note: 'Instant PDF · One-time {price}' },

  langSwitch: { label: 'Language' },

  carousel: {
    label: 'Product preview',
    prev: 'Previous slide',
    next: 'Next slide',
    goTo: 'Go to slide',
    of: 'of',
    author: {
      label: 'The author, first to run the system',
      before: 'Before',
      after: 'After',
      altBefore: 'The author before the system: soft, about 30% body fat',
      altAfter: 'The author after fixing the order: lean, with visible abs',
    },
    objection: {
      big: 'No dirty bulk.<br />No starving.',
      sub: 'Lose the soft layer first. Then build muscle without getting fat again.',
    },
    types: {
      title: 'Built for where <em>you are.</em>',
      rows: [
        ['Skinny-fat', 'Lose the belly. Keep the muscle.'],
        ['Skinny', 'Add size without the dirty-bulk fat.'],
        ['Stuck', 'Know what to change when progress stalls.'],
      ],
    },
    compare: {
      title: 'The system vs. <em>random advice</em>',
      left: 'Random advice',
      right: 'The Blueprint',
      rows: [
        ['Guess where to start', 'A decision tree tells you'],
        ['"Eat big" or "eat clean"', 'Calorie targets for your phase'],
        ['Sets that stop early', 'Hard sets, close to failure'],
        ['Trust the mirror', 'A weekly tracker'],
        ['Switch on a feeling', 'Clear rules to switch'],
      ],
    },
    guarantee: {
      title: 'Try it for <em>7 days.</em>',
      body: 'Read it. Run it. If it\'s not for you, email me and get every cent back.',
      badge: 'Day refund',
    },
  },

  proof: '{buyers}+ already have the system · {refunds}&nbsp;refunds',

  hero: {
    badge: 'Science-backed · Natural · No fluff',
    h1: 'Fix skinny-fat in the <em>right order</em>, with your first 30 days mapped out.',
    sub: 'Lean out to a base first, then build muscle without getting fat again. Without another dirty bulk, endless cardio, or a diet you quit in week two.',
    benefits: [
      'Know whether to cut or build first. No more guessing.',
      'Lose the soft belly without shrinking your arms and chest.',
      'Build wider shoulders and bigger arms without the fat coming back.',
      'Grow with a few truly hard sets, even on a busy week.',
    ],
  },

  offer: {
    includes: '{pages}-page guide · 30-day plan · 2 free tools',
    oneTime: 'one-time',
    trust: ['Instant PDF', '7-day money-back guarantee', 'Secure checkout by Hotmart'],
    bump: 'Optional at checkout: {bumpName}, +{bump}.',
    popular: 'Most popular',
    tierCta: 'Choose',
    miniFaq: [
      ['Skinny or skinny-fat: will it work for me?', 'Yes. The decision tree tells you which phase to start in, based on your body fat and training age. You don\'t have to guess.'],
      ['Do I need supplements or TRT?', 'No. It\'s built for natural lifters. A basic gym and normal food are enough.'],
      ['How do I get it?', 'Right after checkout. The PDF and both Google Sheets, on your phone or laptop.'],
    ],
  },

  trap: {
    eyebrow: 'The trap',
    h2: 'You don\'t have bad genetics. <em>You have a bad map.</em>',
    lead: 'Most guys stuck between bulk and cut fall into the same trap. It\'s not effort. It\'s the order.',
    mechanism: [
      'Cut without a base, and you end up <span class="text-cream font-semibold">smaller.</span>',
      'Bulk without a base, and you end up <span class="text-cream font-semibold">softer.</span>',
    ],
    cards: [
      ['The "just bulk" trap', 'You ate everything to get big. You got softer, not bigger.'],
      ['The endless cut', 'You dieted for months and lost size, not the belly. Now you\'re scared to eat.'],
      ['Sets that stop too early', 'Lots of sets, but few of them hard. Growth goes up as sets get closer to failure.'],
      ['Advice that fights itself', 'Every video says the opposite of the last one. So you start to think it\'s genetics.'],
    ],
    close: 'Fix the order, and the same effort <em>starts to show.</em>',
  },

  story: {
    eyebrow: 'My story',
    h2: 'I wasted 4 years getting this wrong <em>so you don\'t have to.</em>',
    paragraphs: [
      'I started at <span class="text-cream font-semibold">51 kg</span>. Skinny, and invisible in a T-shirt. So I did what the internet said: I <span class="text-cream">dirty bulked</span>.',
      'It went wrong. I got to about <span class="text-cream font-semibold">30% body fat</span>, lost all my definition, and got <span class="text-cream">gyno</span>. I didn\'t look muscular. I looked soft.',
      'So I stopped guessing and read the research: how muscle is built, why getting lean first matters so much, and what makes a set count.',
    ],
    strong: 'I fixed the order. I got lean first, then built. I\'m proud of the change, and I\'m still working on it. This guide is that system, minus the four years I wasted.',
    caption: 'The author, first to run the system.',
    prevBefore: 'Previous before photo', nextBefore: 'Next before photo', goBefore: 'Go to before photo',
    prevAfter: 'Previous after photo', nextAfter: 'Next after photo', goAfter: 'Go to after photo',
    altBefore: 'The author before, photo', altAfter: 'The author after, photo',
  },

  how: {
    eyebrow: 'How it works',
    h2: 'Three phases, <em>in the right order.</em>',
    lead: 'You don\'t bulk forever or cut forever. You run the phase your body needs now, then the next one.',
    phases: [
      ['Phase 1', 'Lean out to a base', 'Drop the soft layer and keep your muscle, so what you build next actually shows.'],
      ['Phase 2', 'Build without getting fat', 'A small surplus and hard sets. You add muscle without the fat creeping back.'],
      ['Phase 3', 'Switch without losing ground', 'Clear signs for when to keep building and when to trim. You keep what you gained.'],
    ],
    tree: {
      title: 'Not sure where you start? <em>The guide tells you.</em>',
      body: 'The decision tree looks at two things, your body fat and your training age, and places you in a phase with a day-one plan.',
      inputs: ['Your body fat', 'Your training age'],
      output: 'Your starting phase + your day-one plan',
    },
  },

  why: {
    eyebrow: 'Why it works',
    h2: 'Built on research, <em>not bro-science.</em>',
    lead: 'Every rule in the guide has a reason under it. Here are the big ones, in plain words.',
    cards: [
      { title: 'Hard sets <em>grow you</em>', body: 'Hypertrophy (muscle growth) increases as sets are taken closer to failure. So the guide makes every set count.', ref: 1 },
      { title: 'Short on time? <em>Still works.</em>', body: 'More weekly sets still tend to build more muscle. But when time is short, a handful of truly hard sets per muscle works well.', ref: 2 },
      { title: 'Train the <em>stretch</em>', body: 'Training at long muscle lengths (the stretched part of the rep) likely produces slightly more growth. The exercises are picked with that in mind.', ref: 3 },
      { title: 'Protein, <em>made simple</em>', body: '30-40 g of protein per meal is a practical minimum. There\'s no rigid ceiling.', ref: 4 },
      { title: 'Lean is <em>the base</em>', body: 'Higher body fat is linked to lower testosterone. That\'s one more reason the plan gets you lean first.', ref: 5 },
      { title: 'Sleep is <em>part of training</em>', body: 'One week of short sleep can lower testosterone by 10-15%. Recovery is in the plan, not an extra.', ref: 6 },
      { title: 'A <em>natural</em> target', body: 'An FFMI (muscle for your height) of 22-23 at 10-12% body fat is an athletic, natural target. Natural lifters rarely go past about 25. That\'s the look this plan aims for. No TRT needed.', ref: 7 },
      { title: 'Shoulders make <em>the shape</em>', body: 'Wide shoulders and a narrow waist are what read as "built" in a shirt. The plan trains side delts often for that reason.', ref: null },
    ],
    refsTitle: 'References',
    refsNote: 'The studies behind the claims on this page.',
    refShort: ['Robinson et al., 2024', 'Schoenfeld et al., 2017', 'Wolf et al., 2023', 'Trommelen et al., 2023', 'Corona et al., 2013', 'Leproult & Van Cauter, 2011', 'Kouri et al., 1995', 'Kerksick et al., 2017'],
  },

  inside: {
    h2: 'What\'s <em>inside.</em>',
    lead: '8 chapters. Each one removes a reason you\'ve been stuck.',
    mockupNote: '{pages} pages. Zero fluff.',
    mockupNoteStrong: 'A complete system, not a tip list.',
    chapters: [
      ['Train for the mirror', 'Train the muscles that build the V-taper: wide shoulders, a wide back, a narrow waist.'],
      ['Eat to build', 'The short list of foods that do the work. Carbs go around training, where they help fuel performance.'],
      ['Cut correctly', 'Lose fat and show definition while you keep the muscle you built.'],
      ['Lean bulk without the fat', 'The surplus math that builds muscle and keeps you lean. The opposite of a dirty bulk.'],
      ['Switch phases', 'When to build, when to cut, and how to switch without losing progress.'],
      ['Pull the hormone levers', 'The natural habits that keep your testosterone healthy: body fat, sleep, food and training.'],
      ['Recover, or none of it counts', 'Sleep, stress and how you space hard sessions. This is where training turns into muscle.'],
      ['The full system and your first 30 days', 'Every piece in one plan, plus the decision tree, daily templates and a weekly checklist.'],
    ],
    giftsLabel: 'Plus two free tools with your copy',
    sheet: 'Google Sheet',
    gifts: [
      ['The Metabolic Calorie Calculator', 'Ends "I don\'t know how many calories to eat." Enter your stats and get your maintenance, cut and build targets in seconds.'],
      ['The Physique Change Tracker', 'Ends "I don\'t know if it\'s working." Log your weight and measurements. It shows your 7-day average and a body-fat estimate, week by week.'],
    ],
  },

  results: {
    eyebrow: 'Results',
    h2: 'Results, <em>shared with permission.</em>',
    lead: 'Real people, real photos.',
    authorLabel: 'The author, first to run the system',
    customerResult: 'Customer result',
    readMore: 'Read his full story',
    translated: 'Translated from Spanish',
    disclaimer: 'Individual results vary and depend on consistency and starting point.',
    guaranteeLine: 'Backed by a 7-day money-back guarantee',
    before: 'Before', after: 'After',
    photoPending: 'Photo coming soon',
  },

  fit: {
    h2: 'Is this <em>for you?</em>',
    yesTitle: 'This is for you if…',
    yes: [
      'You look skinny in a shirt and soft without it.',
      'You\'re stuck between bulk and cut, scared of getting fat or getting smaller.',
      'You want the why, not just "trust me, bro."',
      'You want an aesthetic body, naturally. No TRT, no pile of supplements.',
    ],
    noTitle: 'This is not for you if…',
    no: [
      'You want a magic pill or an overnight fix.',
      'You won\'t change anything you do now.',
      'You\'d rather collect random tips than follow a system.',
      'You want a steroid or TRT protocol.',
    ],
  },

  value: {
    h2: 'What\'s it worth to <em>stop wasting years?</em>',
    lead: 'What most guys spend on this problem instead:',
    rows: [
      { label: 'A coach sending you a generic plan', money: 200, suffix: '+/mo' },
      { label: 'A bloated online course', money: 97, suffix: '+' },
      { label: 'One more failed dirty bulk', text: 'months you don\'t get back' },
      { label: 'Four years of trial and error', text: 'what it cost me' },
    ],
    close: 'The whole system costs {price}. <span class="text-muted">Less than one takeaway meal.</span>',
  },

  addon: {
    badge: 'Optional add-on, at checkout',
    h2: 'And the hormone side, <em>in full.</em>',
    paragraphs: [
      'Chapter 6 of the Blueprint covers the biggest natural hormone levers, then stops. The full picture needs its own book.',
      '{bumpName} is that book. 22 chapters. Free testosterone and SHBG, and how to read your lab results. DHT, the androgen few people explain. Food, fats, the liver, the gut, sunlight and sleep. Everyday chemicals at home. Which blood work to ask for. And the short list of supplements with real evidence behind them.',
    ],
    strong: 'It shows up as an optional add-on when you check out. One click, {bump}. It is not included in the {price}.',
    bullets: [
      '22 chapters, hormone by hormone',
      'What to test, and how to read the results',
      'The few supplements with real evidence, and what I left out',
      'An honest look at TRT',
    ],
  },

  final: {
    h2: 'Another year stuck, <em>or the plan that ends it.</em>',
    outcomes: [
      'Know your starting phase on day one',
      'Lose the soft layer and keep your muscle',
      'Build without the fat coming back',
      'Follow a plan for your first 30 days',
    ],
    youGet: 'Everything you get',
    stack: [
      'The Aesthetic Physique Blueprint ({pages} pages)',
      'Your first 30 days, written out',
      'The Metabolic Calorie Calculator (free tool)',
      'The Physique Change Tracker (free tool)',
    ],
    today: 'Today, one time',
    risk: '{price} is a small bet next to another year with no change.',
    guaranteeTitle: '7-day money-back guarantee',
    guaranteeBadge: 'Day refund',
    guaranteeBody: 'Read it and run it for <span class="text-cream font-semibold">7 full days</span>. If it doesn\'t give you a clear plan you can follow, email me and get every cent back. <span class="text-cream font-semibold">No questions asked.</span>',
    guaranteeSmall: 'All you risk is staying where you are.',
    bumpNote: '{bumpName} is offered at checkout for {bump} more, if you want it.',
  },

  faq: {
    h2: 'Questions, <em>answered.</em>',
    items: [
      ['Am I skinny-fat or just skinny?', 'The decision tree answers that. It uses your body fat and training age to tell you whether to lean out first or start building.'],
      ['Will this work for me?', 'If you\'re natural and you apply it, the system gives you a clear plan for your body. Results vary with consistency and starting point, which is why there\'s a 7-day guarantee.'],
      ['I\'m a total beginner. Is this too advanced?', 'No. Beginners gain the most, because they skip years of mistakes. It starts with the basics and gives you a day-one plan.'],
      ['I\'ve trained for years and stalled. Will I learn anything?', 'Probably. Long stalls usually come from a few gaps: sets that stop too early, the wrong phase, or no way to track progress. The guide helps you find and fix them.'],
      ['I\'m cutting and nothing changes. Should I keep going?', 'The guide gives you clear signs for when to keep cutting, when to stop, and when to switch to building. No more spinning your wheels.'],
      ['How much time do I need?', 'Less than you think, if your sets are truly hard. When time is short, a handful of hard sets per muscle works well. More weekly sets still tend to build more, so the guide shows you both options.'],
      ['Do I need a fancy gym or supplements?', 'No. A basic gym with dumbbells and a few machines is enough. No TRT, no expensive supplements.'],
      ['Is this just bro-science?', 'No. Each rule links back to research, and the main studies are listed on this page. It\'s written in plain words you can act on.'],
      ['How do I get it after I buy?', 'Right away. After checkout you get the PDF and both Google Sheets, on your phone, tablet or laptop.'],
      ['Is {bumpName} included?', 'No. It\'s an optional {bump} add-on at checkout. The {price} covers the Blueprint, the 30-day plan and both tools.'],
      ['What if it\'s not for me?', 'You have a 7-day money-back guarantee. Email me within 7 days and I\'ll refund every cent. No questions asked.'],
    ],
    closing: 'Ready to fix the order?',
  },

  footer: {
    by: 'by the Aesthetic Engineer',
    privacy: 'Privacy Policy', terms: 'Terms', contact: 'Contact',
    privacyHref: '/privacy.html', termsHref: '/terms.html',
    disclaimer: 'Individual results vary and depend on consistency and starting point. This guide is for education. It is not medical advice. Talk to a doctor before you start any training or nutrition program.',
    rights: 'The Aesthetic Physique Blueprint. All rights reserved.',
  },
};
