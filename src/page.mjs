// The landing page template. One layout for both languages: the copy comes from
// src/copy/<lang>.mjs, the offer from src/config.json, the evidence from src/content/evidence.
// build.mjs calls render() and writes index.html, es/index.html, ig.html and fb.html.
//
// Section order follows Mark's template and the belief each section installs:
//   1 hero (carousel, proof, headline, offer)   2 trap (belief 1)       3 story (1, 5)
//   4 how it works (2)    5 why it works (3, 4)    6 what's inside    7 results
//   8 for / not for (5)   9 cost of not doing it   10 add-on (4)      11 final offer (6)
//   12 FAQ + footer

import fs from 'node:fs';

const CSS = fs.readFileSync(new URL('./styles/page.css', import.meta.url), 'utf8');
const JS = fs.readFileSync(new URL('./scripts/page.js', import.meta.url), 'utf8');

const UTM = 'utm_source=landing&utm_medium=web&utm_campaign=blueprint';

export function render({ c, config, evidence, refs, critical = '/*@critical*/' }) {
  const asset = (p) => '/' + p.replace(/^\//, '');
  const href = (content, extra = '') => `${c.bridge}?${UTM}&utm_content=${content}${extra}`;
  const cta = (content, cls, label = c.cta, extra = '') =>
    `<a href="${href(content, extra)}" class="${cls} cta-glow">${label}</a>`;
  const BTN = 'inline-block bg-cream text-ink font-extrabold rounded-xl px-7 py-4 text-lg';
  const BTN_BLOCK = 'block w-full text-center bg-cream text-ink font-extrabold rounded-xl px-6 py-4 text-lg';
  const rule = (center = false) => `<span class="rule rule-accent${center ? ' mx-auto' : ''}" aria-hidden="true"></span>`;
  const eyebrow = (t, center = false) =>
    `<p class="text-xs font-semibold tracking-widest uppercase text-muted mb-3${center ? ' text-center' : ''}">${t}</p>`;
  const h2 = (html, extra = '') =>
    `<h2 class="reveal font-display text-[2.1rem] sm:text-5xl leading-[1.08] text-cream${extra}">${html}</h2>`;
  const check = `<svg class="w-5 h-5 shrink-0 mt-0.5 text-cream" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const cross = `<svg class="w-4 h-4 shrink-0 mt-0.5 text-muted" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

  const customers = evidence.filter((e) => e.type === 'customer');
  const author = evidence.find((e) => e.type === 'author');
  const featured = customers.find((e) => e.featured);
  const authorIn = config.authorPhotos.placement === 'results' ? 'results' : 'story';
  const tiersOn = config.tiers.enabled;

  // ---------------------------------------------------------------- quote helper
  const quoteOf = (e) => {
    const q = e.quote || {};
    if (!q.text) return '';
    if (q.lang === c.lang || !q.translation || !q.translation[c.lang]) {
      return `<blockquote class="text-cream/90">"${q.text}"</blockquote>`;
    }
    return `<blockquote class="text-cream/90">"${q.translation[c.lang]}"</blockquote>
            <p class="mt-1 text-xs text-muted">${c.results.translated}</p>`;
  };

  // ---------------------------------------------------------------- urgency (off by default)
  const urgency = () => {
    const u = config.urgency;
    if (!u.enabled) return '';
    const d = new Date(u.endsAt);
    const date = d.toLocaleDateString(c.lang === 'es' ? 'es-CO' : 'en-US', { month: 'long', day: 'numeric' });
    return `<p class="mt-3 text-sm text-cream text-center" data-ends="${u.endsAt}">${u.text[c.lang].replace('{date}', date)}</p>`;
  };

  // ---------------------------------------------------------------- tiers (off by default)
  const tiers = (where) => {
    const cards = config.tiers.items.map((t) => {
      const feats = t.features[c.lang].map((f) => `<li class="flex gap-2">${check}<span>${f}</span></li>`).join('');
      const compare = t.compareAt ? `<span class="text-muted line-through text-lg mr-2">${config.price.symbol}${t.compareAt}</span>` : '';
      const pop = t.popular
        ? `<p class="absolute -top-3 left-1/2 -translate-x-1/2 bg-cream text-ink text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1">${c.offer.popular}</p>`
        : '';
      const cls = t.popular ? 'border-cream/60' : 'border-line';
      return `<div class="relative bg-card border ${cls} rounded-2xl p-5 flex flex-col">
          ${pop}
          <p class="font-display text-2xl text-cream">${t.name[c.lang]}</p>
          <p class="mt-2">${compare}<span class="font-display text-4xl text-cream">${config.price.symbol}${t.price}</span></p>
          <ul class="mt-4 space-y-2 text-sm text-muted flex-1">${feats}</ul>
          ${cta(`${where}-tier-${t.id}`, `mt-5 ${t.popular ? 'bg-cream text-ink' : 'bg-cream/10 text-cream border border-line'} block text-center font-extrabold rounded-xl px-5 py-3`, `${c.offer.tierCta}: ${t.name[c.lang]}`, `&off=${encodeURIComponent(t.hotmartOffer)}`)}
        </div>`;
    }).join('');
    return `<div class="grid gap-5 sm:grid-cols-3 sm:items-stretch pt-3">${cards}</div>`;
  };

  // Responsive attributes for a photo that ships several widths. The author slide shows each
  // photo in a tall frame (about 0.40 wide-to-high) that is half the carousel wide.
  const AUTHOR_SIZES = '(min-width: 1024px) 245px, (min-width: 448px) 205px, calc(50vw - 34px)';
  const srcsetOf = (ph, sizes) => ph.srcset
    ? ` srcset="${ph.srcset.map(([p, w]) => `${asset(p)} ${w}w`).join(', ')}" sizes="${sizes}"`
    : '';

  // ---------------------------------------------------------------- carousel
  const slides = [];
  const SIZES = '(min-width: 1024px) 540px, (min-width: 480px) 448px, calc(100vw - 32px)';
  slides.push(`<img src="${asset(c.mockup.src)}" srcset="${asset(c.mockup.src720)} 720w, ${asset(c.mockup.src)} 1080w" sizes="${SIZES}" alt="${c.mockup.alt}" width="1080" height="1350"
        fetchpriority="high" decoding="async" class="absolute inset-0 w-full h-full object-cover" />`);

  if (author) {
    const b = (author.carouselPhotos || {}).before || author.photos.before[0];
    const a = (author.carouselPhotos || {}).after || author.photos.after[0];
    slides.push(`<div class="absolute inset-0 p-3 sm:p-4 flex flex-col">
        <p class="text-center text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-muted">${c.carousel.author.label}</p>
        <div class="mt-2 grid grid-cols-2 gap-2 flex-1 min-h-0">
          <figure class="relative rounded-xl overflow-hidden border border-line bg-ink">
            <img src="${asset(b.src)}"${srcsetOf(b, AUTHOR_SIZES)} alt="${c.carousel.author.altBefore}" width="${b.width}" height="${b.height}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
            <figcaption class="absolute top-2 left-2 text-[11px] font-bold uppercase tracking-wider bg-ink/85 border border-line rounded-full px-2.5 py-1">${c.carousel.author.before}</figcaption>
          </figure>
          <figure class="relative rounded-xl overflow-hidden border border-cream/40 bg-ink">
            <img src="${asset(a.src)}"${srcsetOf(a, AUTHOR_SIZES)} alt="${c.carousel.author.altAfter}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
            <figcaption class="absolute top-2 right-2 text-[11px] font-bold uppercase tracking-wider bg-cream text-ink rounded-full px-2.5 py-1">${c.carousel.author.after}</figcaption>
          </figure>
        </div>
      </div>`);
  }

  slides.push(`<div class="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center hero-glow">
      <span class="block w-12 h-0.5 bg-cream mb-6" aria-hidden="true"></span>
      <p class="font-display text-[2.6rem] sm:text-6xl leading-[1.02] text-cream">${c.carousel.objection.big}</p>
      <p class="mt-5 text-base sm:text-lg text-muted max-w-sm">${c.carousel.objection.sub}</p>
    </div>`);

  slides.push(`<div class="absolute inset-0 p-5 sm:p-8 flex flex-col justify-center">
      <p class="font-display text-[1.7rem] sm:text-4xl leading-tight text-cream">${c.carousel.types.title}</p>
      <ul class="mt-5 space-y-3">
        ${c.carousel.types.rows.map(([k, v]) => `<li class="bg-ink/60 border border-line rounded-xl p-3.5 sm:p-4">
          <p class="text-[11px] font-semibold tracking-widest uppercase text-muted">${k}</p>
          <p class="mt-1 text-cream font-semibold leading-snug">${v}</p></li>`).join('')}
      </ul>
    </div>`);

  slides.push(`<div class="absolute inset-0 p-4 sm:p-7 flex flex-col justify-center">
      <p class="font-display text-[1.6rem] sm:text-4xl leading-tight text-cream">${c.carousel.compare.title}</p>
      <div class="mt-4 grid grid-cols-2 gap-x-3 text-[13px] sm:text-sm">
        <p class="pb-2 text-[11px] font-semibold tracking-widest uppercase text-muted border-b border-line">${c.carousel.compare.left}</p>
        <p class="pb-2 text-[11px] font-semibold tracking-widest uppercase text-cream border-b border-line">${c.carousel.compare.right}</p>
        ${c.carousel.compare.rows.map(([l, r]) => `<p class="flex gap-1.5 py-2 border-b border-line text-muted">${cross}<span>${l}</span></p>
          <p class="flex gap-1.5 py-2 border-b border-line text-cream font-semibold">${check}<span>${r}</span></p>`).join('')}
      </div>
    </div>`);

  slides.push(`<div class="absolute inset-0 p-6 sm:p-10 flex flex-col items-center justify-center text-center">
      <div class="w-24 h-24 rounded-full bg-cream/5 border-2 border-cream/30 flex flex-col items-center justify-center">
        <span class="font-display text-4xl text-cream leading-none">7</span>
        <span class="text-[10px] font-bold uppercase tracking-widest text-cream mt-1">${c.carousel.guarantee.badge}</span>
      </div>
      <p class="mt-5 font-display text-[2rem] sm:text-5xl leading-tight text-cream">${c.carousel.guarantee.title}</p>
      <p class="mt-3 text-base sm:text-lg text-muted max-w-xs">${c.carousel.guarantee.body}</p>
    </div>`);

  if (featured) {
    const b = featured.photos.before[0], a = featured.photos.after[0];
    const time = featured.time && featured.time[c.lang] ? ` · ${featured.time[c.lang]}` : '';
    slides.push(`<div class="absolute inset-0 p-3 sm:p-4 flex flex-col">
        <p class="text-center text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-muted">${c.carousel.customer.label}: ${featured.name}${time}</p>
        <div class="mt-2 grid grid-cols-2 gap-2 flex-1 min-h-0">
          <img src="${asset(b.src)}" alt="${featured.name}, ${c.results.before}" width="${b.width}" height="${b.height}" loading="lazy" decoding="async" class="w-full h-full object-cover rounded-xl border border-line" />
          <img src="${asset(a.src)}" alt="${featured.name}, ${c.results.after}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" class="w-full h-full object-cover rounded-xl border border-cream/40" />
        </div>
        <div class="mt-2 text-sm text-center">${quoteOf(featured)}</div>
      </div>`);
  }

  const n = slides.length;
  const carousel = `<div class="relative" role="region" aria-roledescription="carousel" aria-label="${c.carousel.label}">
      <div class="carousel rounded-3xl border border-line bg-card" data-carousel tabindex="0">
        ${slides.map((s, i) => `<div class="slide-c" role="group" aria-roledescription="slide" aria-label="${i + 1} ${c.carousel.of} ${n}">${s}</div>`).join('\n        ')}
      </div>
      <div class="mt-2 flex items-center justify-center gap-2">
        <button type="button" data-c-prev aria-label="${c.carousel.prev}" class="c-btn">‹</button>
        <div class="flex" data-c-dots>
          ${slides.map((_, i) => `<button type="button" class="c-dot" aria-label="${c.carousel.goTo} ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}><span></span></button>`).join('')}
        </div>
        <button type="button" data-c-next aria-label="${c.carousel.next}" class="c-btn">›</button>
      </div>
    </div>`;

  // ---------------------------------------------------------------- proof line (real numbers only)
  const p = config.proof;
  const proof = p.enabled
    ? `<p class="mt-2 text-center text-sm text-muted">${c.proof
        .replace('{buyers}', `<span class="text-cream font-semibold">${p.buyers}</span>`)
        .replace('{refunds}', `<span class="text-cream font-semibold">${p.refunds}</span>`)}</p>`
    : '';

  // ---------------------------------------------------------------- compact offer card
  const offerCard = tiersOn
    ? `<div class="mt-7">${tiers('hero')}<p class="mt-4 text-xs text-muted text-center">${c.offer.bump}</p>${urgency()}</div>`
    : `<div class="mt-7 bg-card border border-cream/30 rounded-2xl p-5 sm:p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-display text-xl sm:text-2xl text-cream leading-tight">${c.product}</p>
            <p class="mt-1.5 text-sm text-muted">${c.offer.includes}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="font-display text-4xl sm:text-5xl text-cream leading-none">{price}</p>
            <p class="mt-1 text-xs text-muted">${c.offer.oneTime}</p>
          </div>
        </div>
        <div class="mt-5">${cta('hero', BTN_BLOCK)}</div>
        <ul class="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-muted">
          ${c.offer.trust.map((t) => `<li class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-cream" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>${t}</li>`).join('')}
        </ul>
        <p class="mt-3 pt-3 border-t border-line text-xs text-muted text-center">${c.offer.bump}</p>
        ${urgency()}
      </div>`;

  const miniFaq = `<div class="mt-5 space-y-2">
      ${c.offer.miniFaq.map(([q, a]) => `<details class="group bg-card/60 border border-line rounded-xl px-4">
        <summary class="flex items-center justify-between gap-3 py-3 text-sm font-semibold text-cream">${q}<span class="faq-icon text-cream text-xl leading-none" aria-hidden="true">+</span></summary>
        <p class="pb-3 -mt-1 text-sm text-muted">${a}</p></details>`).join('')}
    </div>`;

  // ---------------------------------------------------------------- before/after slideshows (author)
  const slideshow = (side, photos, labels) => {
    const isAfter = side === 'after';
    const imgs = photos.map((ph, i) => `<img src="${asset(ph.src)}" alt="${labels.alt} ${i + 1}" loading="lazy" decoding="async"
                   width="${ph.width}" height="${ph.height}"
                   class="slide absolute inset-0 w-full h-full object-cover ${i === 0 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500" data-index="${i}" />`).join('\n              ');
    const dots = photos.map((_, i) => `<button type="button" aria-label="${labels.go} ${i + 1}" class="dot-hit"><span class="dot w-2 h-2 rounded-full ${i === 0 ? 'bg-cream' : 'bg-line'}"></span></button>`).join('');
    return `<div data-slideshow>
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden border ${isAfter ? 'border-cream/40' : 'border-line'} bg-card">
              <span class="absolute z-20 top-2 ${isAfter ? 'right-2 bg-cream text-ink' : 'left-2 bg-ink/85 border border-line'} text-[11px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1">${labels.tag}</span>
              ${imgs}
              <button type="button" data-prev aria-label="${labels.prev}" class="absolute z-20 left-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/70 hover:bg-ink border border-line flex items-center justify-center text-cream">‹</button>
              <button type="button" data-next aria-label="${labels.next}" class="absolute z-20 right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/70 hover:bg-ink border border-line flex items-center justify-center text-cream">›</button>
            </div>
            <div class="mt-1 flex justify-center" data-dots>${dots}</div>
          </div>`;
  };
  const authorFigure = author ? `<figure>
        <div class="grid grid-cols-2 gap-3">
          ${slideshow('before', author.photos.before, { tag: c.results.before, alt: c.story.altBefore, prev: c.story.prevBefore, next: c.story.nextBefore, go: c.story.goBefore })}
          ${slideshow('after', author.photos.after, { tag: c.results.after, alt: c.story.altAfter, prev: c.story.prevAfter, next: c.story.nextAfter, go: c.story.goAfter })}
        </div>
        <figcaption class="mt-3 text-sm text-muted text-center">${c.story.caption}</figcaption>
        <p class="mt-1 text-xs text-muted text-center">${c.results.disclaimer}</p>
      </figure>` : '';

  // ---------------------------------------------------------------- evidence cards
  const evidenceCard = (e) => {
    const b = e.photos.before[0], a = e.photos.after[0];
    const label = e.type === 'author' ? c.results.authorLabel : c.results.customerLabel;
    const time = e.time && e.time[c.lang] ? `<p class="text-sm text-muted">${c.results.in} ${e.time[c.lang]}</p>` : '';
    return `<figure class="reveal bg-card border ${e.type === 'author' ? 'border-cream/30' : 'border-line'} rounded-2xl p-4 sm:p-5 flex flex-col">
        <p class="text-[11px] font-semibold tracking-widest uppercase text-muted">${label}</p>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <div class="relative aspect-[3/4] rounded-xl overflow-hidden border border-line bg-ink">
            <img src="${asset(b.src)}" alt="${e.name}, ${c.results.before}" width="${b.width}" height="${b.height}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
            <span class="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-ink/85 border border-line rounded-full px-2 py-0.5">${c.results.before}</span>
          </div>
          <div class="relative aspect-[3/4] rounded-xl overflow-hidden border border-cream/40 bg-ink">
            <img src="${asset(a.src)}" alt="${e.name}, ${c.results.after}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
            <span class="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-cream text-ink rounded-full px-2 py-0.5">${c.results.after}</span>
          </div>
        </div>
        <div class="mt-4 flex-1">${quoteOf(e)}</div>
        <figcaption class="mt-4 pt-4 border-t border-line">
          <p class="font-semibold text-cream">${e.name}</p>
          ${time}
        </figcaption>
      </figure>`;
  };

  const resultItems = [...(authorIn === 'results' && author ? [author] : []), ...customers];
  const resultsBody = customers.length
    ? `${rule(true)}
      ${h2(c.results.h2Evidence, ' text-center')}
      <p class="reveal mt-4 text-lg text-muted text-center max-w-2xl mx-auto">${c.results.leadEvidence}</p>
      <div class="mt-10 grid gap-5 ${resultItems.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-md mx-auto'}" data-stagger>
        ${resultItems.map(evidenceCard).join('')}
      </div>
      <p class="mt-6 text-sm text-muted text-center">${c.results.disclaimer}</p>`
    : `${rule(true)}
      ${h2(c.results.h2Empty, ' text-center')}
      <p class="reveal mt-4 text-lg text-muted text-center max-w-2xl mx-auto">${c.results.leadEmpty}</p>
      ${resultItems.length ? `<div class="mt-10 grid gap-5 max-w-md mx-auto">${resultItems.map(evidenceCard).join('')}</div>
      <p class="mt-4 text-sm text-muted text-center">${c.results.disclaimer}</p>` : ''}
      <div class="reveal mt-10 max-w-3xl mx-auto bg-card border border-line rounded-2xl p-6 sm:p-10 space-y-5 text-lg text-muted leading-relaxed">
        ${c.results.emptyBody.map((t) => `<p>${t}</p>`).join('')}
      </div>`;

  const guarantee = `<div class="reveal bg-card border border-line rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center justify-center">
          <div class="w-24 h-24 rounded-full bg-cream/5 border-2 border-cream/30 flex flex-col items-center justify-center">
            <span class="font-display text-4xl text-cream leading-none">7</span>
            <span class="text-[10px] font-bold uppercase tracking-widest text-cream mt-1">${c.final.guaranteeBadge}</span>
          </div>
          <p class="font-display text-3xl text-cream mt-5">${c.final.guaranteeTitle}</p>
          <p class="mt-3 text-muted">${c.final.guaranteeBody}</p>
          <p class="mt-3 text-sm text-muted">${c.final.guaranteeSmall}</p>
        </div>`;

  // ================================================================ PAGE
  return `<!DOCTYPE html>
<html lang="${c.htmlLang}" class="scroll-smooth">
<!--
  GENERATED by build.mjs from src/. Do not edit this file: edit src/copy/${c.lang}.mjs (words),
  src/config.json (price, proof, tiers, urgency), src/content/evidence/ (results) or
  src/page.mjs (layout), then run: node build.mjs
-->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/favicon.png" sizes="96x96" type="image/png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <title>${c.meta.title}</title>
  <meta name="description" content="${c.meta.description}" />
  <meta name="theme-color" content="#0A0E1A" />
  <link rel="canonical" href="${c.meta.canonical}" />
  <link rel="alternate" hreflang="en" href="https://aesthetic-engineer.com/" />
  <link rel="alternate" hreflang="es" href="https://aesthetic-engineer.com/es/" />
  <link rel="alternate" hreflang="x-default" href="https://aesthetic-engineer.com/" />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="${c.meta.ogLocale}" />
  <meta property="og:locale:alternate" content="${c.meta.ogLocaleAlt}" />
  <meta property="og:title" content="${c.meta.ogTitle}" />
  <meta property="og:description" content="${c.meta.ogDescription}" />
  <meta property="og:image" content="${c.meta.ogImage}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${c.meta.ogImage}" />

  <link rel="preload" href="/assets/fonts/playfair-700.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" as="image" href="${asset(c.mockup.src)}" imagesrcset="${asset(c.mockup.src720)} 720w, ${asset(c.mockup.src)} 1080w" imagesizes="(min-width: 1024px) 540px, (min-width: 480px) 448px, calc(100vw - 32px)" fetchpriority="high" />

  <link rel="prefetch" href="${c.bridge}" as="document" />
  <link rel="preconnect" href="https://pay.hotmart.com" crossorigin />
  <link rel="preconnect" href="https://static.cloudflareinsights.com" crossorigin />

  <style>
    @font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:url('/assets/fonts/inter-400.woff2') format('woff2')}
    @font-face{font-family:'Inter';font-style:normal;font-weight:600;font-display:swap;src:url('/assets/fonts/inter-600.woff2') format('woff2')}
    @font-face{font-family:'Inter';font-style:normal;font-weight:700;font-display:swap;src:url('/assets/fonts/inter-700.woff2') format('woff2')}
    @font-face{font-family:'Inter';font-style:normal;font-weight:800;font-display:swap;src:url('/assets/fonts/inter-800.woff2') format('woff2')}
    @font-face{font-family:'Inter';font-style:italic;font-weight:400;font-display:swap;src:url('/assets/fonts/inter-400-italic.woff2') format('woff2')}
    @font-face{font-family:'Inter';font-style:italic;font-weight:600;font-display:swap;src:url('/assets/fonts/inter-600-italic.woff2') format('woff2')}
    @font-face{font-family:'Playfair Display';font-style:normal;font-weight:700;font-display:swap;src:url('/assets/fonts/playfair-700.woff2') format('woff2')}
    @font-face{font-family:'Playfair Display';font-style:italic;font-weight:700;font-display:swap;src:url('/assets/fonts/playfair-700-italic.woff2') format('woff2')}
    /* Critical above-the-fold utilities, generated by build.mjs from the header markup.
       Deliberately BEFORE the full stylesheet: it is a subset of it, so when styles.css
       arrives it must win, or a plain .flex-col here beats an sm:flex-row there. */
    ${critical}
  </style>

  <link rel="preload" href="/assets/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="/assets/styles.css" /></noscript>
  <noscript><style>.reveal,.reveal h2 .italic,h2.reveal .italic,.reveal h2 em,h2.reveal em{opacity:1!important;transform:none!important;filter:none!important}.rule{transform:none!important}</style></noscript>

  <!-- Page-specific overrides: after styles.css so they win, and after the critical CSS. -->
  <style>
${CSS}
  </style>
</head>

<body class="bg-ink text-cream font-body antialiased selection:bg-cream selection:text-ink">
  <a href="#main" class="skip-link">${c.skip}</a>
  <div id="progress" aria-hidden="true"></div>

  <!-- ======================================================== STICKY CTA (after the hero button) -->
  <div id="stickyCta"
       class="fixed bottom-0 inset-x-0 z-50 translate-y-full transition-transform duration-300
              border-t border-line bg-ink/95 backdrop-blur px-4 py-3
              flex items-center gap-3 sm:justify-center">
    <div class="hidden sm:block leading-tight">
      <p class="font-display text-2xl text-cream">${c.product}</p>
      <p class="text-xs text-muted">${c.sticky.note}</p>
    </div>
    <div class="flex-1 sm:flex-none">
      ${cta('sticky', 'block text-center bg-cream text-ink font-extrabold rounded-xl px-5 py-3 text-base')}
      <p class="mt-1.5 text-center text-[11px] text-muted">${c.ctaNote}</p>
    </div>
  </div>

  <!-- ======================================================== 1. HERO: carousel, proof, headline, offer -->
  <header class="relative hero-glow">
    <div class="relative max-w-6xl mx-auto px-4 sm:px-5 pt-10 pb-12 sm:pt-14 sm:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
      <nav class="lang-switch" aria-label="${c.langSwitch.label}">
        <a href="/" hreflang="en" lang="en"${c.lang === 'en' ? ' aria-current="page"' : ''}>EN</a><span aria-hidden="true">/</span><a href="/es/" hreflang="es" lang="es"${c.lang === 'es' ? ' aria-current="page"' : ''}>ES</a>
      </nav>

      <div class="min-w-0 lg:sticky lg:top-6 w-full max-w-md mx-auto lg:max-w-none">
        ${carousel}
        ${proof}
      </div>

      <div class="min-w-0 w-full max-w-xl mx-auto lg:max-w-none">
        <p class="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-muted bg-cream/5 border border-line rounded-full px-3 py-1 mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-muted" aria-hidden="true"></span>${c.hero.badge}
        </p>
        <h1 class="font-display leading-[1.08] text-cream text-[2rem] sm:text-5xl lg:text-[3.25rem]">${c.hero.h1}</h1>
        <p class="mt-4 text-base sm:text-lg text-muted">${c.hero.sub}</p>
        <ul class="mt-5 space-y-2.5">
          ${c.hero.benefits.map((b) => `<li class="flex gap-3 text-cream/90">${check}<span>${b}</span></li>`).join('\n          ')}
        </ul>
        ${offerCard}
        ${miniFaq}
      </div>
    </div>
  </header>

  <main id="main">
  <!-- ======================================================== 2. THE TRAP (belief 1) -->
  <section class="bg-panel border-y border-line">
    <div class="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
      ${rule()}
      ${eyebrow(c.trap.eyebrow)}
      ${h2(c.trap.h2)}
      <p class="reveal mt-4 text-lg text-muted max-w-2xl">${c.trap.lead}</p>
      <div class="reveal mt-8 grid sm:grid-cols-2 gap-3 max-w-3xl">
        ${c.trap.mechanism.map((m) => `<p class="text-xl sm:text-2xl text-muted border-l-2 border-cream/40 pl-4">${m}</p>`).join('')}
      </div>
      <div class="mt-10 grid sm:grid-cols-2 gap-4" data-stagger>
        ${c.trap.cards.map(([t, b]) => `<div class="reveal bg-card border border-line rounded-2xl p-6">
          <p class="font-display text-2xl text-cream mb-2">${t}</p>
          <p class="text-muted">${b}</p>
        </div>`).join('\n        ')}
      </div>
      <p class="reveal mt-10 text-xl sm:text-2xl text-cream font-semibold max-w-2xl">${c.trap.close}</p>
    </div>
  </section>

  <!-- ======================================================== 3. THE STORY (beliefs 1, 5) -->
  <section class="bg-ink">
    <div class="max-w-6xl mx-auto px-4 sm:px-5 py-14 sm:py-20 ${authorIn === 'story' ? 'grid lg:grid-cols-2 gap-10 items-center' : ''}">
      <div class="reveal ${authorIn === 'story' ? 'order-2 lg:order-1' : 'max-w-3xl'}" data-anim="left">
        ${rule()}
        ${eyebrow(c.story.eyebrow)}
        <h2 class="font-display text-[2.1rem] sm:text-5xl leading-[1.08] text-cream">${c.story.h2}</h2>
        <div class="mt-6 space-y-4 text-muted text-lg">
          ${c.story.paragraphs.map((t) => `<p>${t}</p>`).join('\n          ')}
          <p class="text-cream font-semibold">${c.story.strong}</p>
        </div>
      </div>
      ${authorIn === 'story' ? `<div class="reveal order-1 lg:order-2" data-anim="right">${authorFigure}</div>` : ''}
    </div>
  </section>

  <!-- ======================================================== 4. HOW IT WORKS (belief 2) -->
  <section class="bg-panel border-y border-line">
    <div class="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
      ${rule()}
      ${eyebrow(c.how.eyebrow)}
      ${h2(c.how.h2)}
      <p class="reveal mt-4 text-lg text-muted max-w-2xl">${c.how.lead}</p>
      <ol class="mt-10 grid md:grid-cols-3 gap-4" data-stagger>
        ${c.how.phases.map(([k, t, b], i) => `<li class="reveal bg-card border ${i === 0 ? 'border-cream/30' : 'border-line'} rounded-2xl p-6">
          <p class="text-[11px] font-semibold tracking-widest uppercase text-muted">${k}</p>
          <p class="mt-2 font-display text-2xl text-cream leading-tight">${t}</p>
          <p class="mt-3 text-muted">${b}</p>
        </li>`).join('\n        ')}
      </ol>
      <div class="reveal mt-8 bg-card border border-line rounded-2xl p-6 sm:p-8">
        <p class="font-display text-2xl sm:text-3xl text-cream leading-tight">${c.how.tree.title}</p>
        <p class="mt-3 text-muted max-w-2xl">${c.how.tree.body}</p>
        <div class="mt-6 flex flex-col sm:flex-row sm:items-center gap-3" aria-hidden="true">
          <div class="flex flex-col gap-2 sm:w-56">
            ${c.how.tree.inputs.map((t) => `<span class="block text-center text-sm font-semibold text-cream border border-line rounded-xl px-4 py-2.5 bg-ink/60">${t}</span>`).join('')}
          </div>
          <span class="self-center text-cream text-2xl leading-none rotate-90 sm:rotate-0">→</span>
          <span class="flex-1 text-center text-base font-semibold text-ink bg-cream rounded-xl px-4 py-3">${c.how.tree.output}</span>
        </div>
        <p class="sr-only">${c.how.tree.inputs.join(' + ')} → ${c.how.tree.output}</p>
      </div>
      <div class="reveal mt-10">
        ${cta('phases', BTN)}
        <p class="mt-2 text-xs text-muted">${c.ctaNote}</p>
      </div>
    </div>
  </section>

  <!-- ======================================================== 5. WHY IT WORKS (beliefs 3, 4) + references -->
  <section class="bg-ink">
    <div class="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
      ${rule()}
      ${eyebrow(c.why.eyebrow)}
      ${h2(c.why.h2)}
      <p class="reveal mt-4 text-lg text-muted max-w-2xl">${c.why.lead}</p>
      <div class="mt-10 grid sm:grid-cols-2 gap-4" data-stagger>
        ${c.why.cards.map((k) => `<div class="reveal bg-card border border-line rounded-2xl p-6">
          <p class="font-display text-2xl text-cream">${k.title}</p>
          <p class="mt-2 text-muted">${k.body}</p>
          ${k.ref ? `<p class="mt-3 text-xs text-muted">[${k.ref}] ${c.why.refShort[k.ref - 1]}</p>` : ''}
        </div>`).join('\n        ')}
      </div>
      <details class="reveal mt-8 bg-card border border-line rounded-2xl px-5" id="references">
        <summary class="flex items-center justify-between gap-4 py-5 font-semibold text-cream">${c.why.refsTitle} (${refs.length})<span class="faq-icon text-cream text-2xl leading-none" aria-hidden="true">+</span></summary>
        <p class="-mt-2 mb-4 text-sm text-muted">${c.why.refsNote}</p>
        <ol class="pb-5 space-y-3 text-sm text-muted list-decimal pl-5">
          ${refs.map((r) => `<li>${r}</li>`).join('\n          ')}
        </ol>
      </details>
      <div class="reveal mt-10 text-center">
        ${cta('mechanism', BTN)}
        <p class="mt-2 text-xs text-muted">${c.ctaNote}</p>
      </div>
    </div>
  </section>

  <!-- ======================================================== 6. WHAT'S INSIDE -->
  <section class="bg-panel border-y border-line">
    <div class="max-w-6xl mx-auto px-4 sm:px-5 py-14 sm:py-20 grid lg:grid-cols-5 gap-10 items-start">
      <div class="lg:col-span-2 reveal lg:sticky lg:top-10">
        <div class="relative mx-auto max-w-[16rem] sm:max-w-xs">
          <div class="absolute -inset-3 bg-gradient-to-b from-cream/10 to-transparent rounded-3xl blur-xl" aria-hidden="true"></div>
          <img src="${asset(c.insideMockup.src)}" alt="${c.insideMockup.alt}" width="${c.insideMockup.width}" height="${c.insideMockup.height}"
               loading="lazy" decoding="async" class="relative w-full rounded-2xl border border-line bg-card" />
        </div>
        <p class="mt-5 text-center text-muted">${c.inside.mockupNote}<br /><span class="text-cream font-semibold">${c.inside.mockupNoteStrong}</span></p>
      </div>
      <div class="lg:col-span-3">
        ${rule()}
        ${h2(c.inside.h2)}
        <p class="reveal mt-4 text-lg text-muted">${c.inside.lead}</p>
        <ol class="mt-8 space-y-3" data-stagger>
          ${c.inside.chapters.map(([t, b], i) => `<li class="reveal flex gap-4 bg-card border border-line rounded-2xl p-5">
            <span class="font-display text-3xl text-cream leading-none w-9 shrink-0" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
            <div><p class="font-semibold text-cream">${t}</p><p class="mt-1 text-muted">${b}</p></div>
          </li>`).join('\n          ')}
        </ol>
        <div class="mt-10">
          <p class="reveal text-xs font-semibold tracking-widest uppercase text-muted mb-3">${c.inside.giftsLabel}</p>
          <ul class="space-y-3" data-stagger>
            ${c.inside.gifts.map(([t, b]) => `<li class="reveal flex gap-4 bg-card border border-cream/30 rounded-2xl p-5">
              <span class="font-display text-3xl text-cream leading-none w-9 shrink-0" aria-hidden="true">+</span>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <p class="font-semibold text-cream">${t}</p>
                  <span class="text-[10px] font-semibold tracking-widest uppercase text-muted bg-cream/5 border border-line rounded-full px-2 py-0.5">${c.inside.sheet}</span>
                </div>
                <p class="mt-1 text-muted">${b}</p>
              </div>
            </li>`).join('\n            ')}
          </ul>
        </div>
        <div class="mt-8">
          ${cta('chapters', BTN)}
          <p class="mt-2 text-xs text-muted">${c.ctaNote}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================================================== 7. RESULTS (evidence, permission only) -->
  <section class="bg-ink">
    <div class="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
      ${resultsBody}
      <div class="reveal mt-10 text-center">
        ${cta('social-proof', BTN)}
        <p class="mt-2 text-xs text-muted">${c.ctaNote}</p>
        <p class="mt-2 text-sm text-muted">${c.results.guaranteeLine}</p>
      </div>
    </div>
  </section>

  <!-- ======================================================== 8. FOR / NOT FOR (belief 5) -->
  <section class="bg-panel border-y border-line">
    <div class="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
      ${rule(true)}
      ${h2(c.fit.h2, ' text-center')}
      <div class="mt-10 grid sm:grid-cols-2 gap-5">
        <div class="reveal bg-card border border-cream/30 rounded-2xl p-6" data-anim="left">
          <p class="font-display text-2xl text-cream mb-4">${c.fit.yesTitle}</p>
          <ul class="space-y-3 text-cream/90">${c.fit.yes.map((t) => `<li class="flex gap-3">${check}<span>${t}</span></li>`).join('')}</ul>
        </div>
        <div class="reveal bg-card border border-line rounded-2xl p-6" data-anim="right">
          <p class="font-display text-2xl text-cream mb-4">${c.fit.noTitle}</p>
          <ul class="space-y-3 text-muted">${c.fit.no.map((t) => `<li class="flex gap-3">${cross}<span>${t}</span></li>`).join('')}</ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================================================== 9. WHAT NOT DOING IT COSTS (value block) -->
  <section class="bg-ink">
    <div class="max-w-3xl mx-auto px-4 sm:px-5 py-14 sm:py-20 text-center">
      ${rule(true)}
      ${h2(c.value.h2)}
      <p class="reveal mt-4 text-lg text-muted">${c.value.lead}</p>
      <ul class="value-list reveal mt-8 max-w-md mx-auto space-y-3 text-left">
        ${c.value.rows.map((r, i, all) => `<li class="relative flex items-center justify-between gap-4 ${i < all.length - 1 ? 'pb-3' : 'pb-1'}">
          <span class="text-muted">${r.label}</span>${r.money
            ? `<span class="text-muted line-through shrink-0 text-sm sm:text-base">${config.price.symbol}<span class="count" data-count="${r.money}">${r.money}</span>${r.suffix}</span>`
            : `<span class="text-muted shrink-0 text-right text-sm sm:text-base">${r.text}</span>`}
          ${i < all.length - 1 ? '<span class="rule rule-divider absolute inset-x-0 bottom-0" aria-hidden="true"></span>' : ''}
        </li>`).join('\n        ')}
      </ul>
      <p class="reveal mt-8 text-xl text-cream">${c.value.close}</p>
    </div>
  </section>

  <!-- ======================================================== 10. ADD-ON AT CHECKOUT (belief 4) -->
  <section class="bg-panel border-y border-line">
    <div class="max-w-3xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
      <div class="reveal bg-card border border-cream/25 rounded-3xl p-6 sm:p-10">
        <p class="inline-block text-[11px] font-semibold tracking-widest uppercase text-muted bg-cream/5 border border-line rounded-full px-2.5 py-1">${c.addon.badge}</p>
        <h2 class="mt-4 font-display text-3xl sm:text-4xl leading-[1.08] text-cream">${c.addon.h2}</h2>
        <div class="mt-5 space-y-4 text-muted text-lg">
          ${c.addon.paragraphs.map((t) => `<p>${t}</p>`).join('\n          ')}
          <p class="text-cream">${c.addon.strong}</p>
        </div>
        <ul class="mt-7 space-y-2.5 text-muted">
          ${c.addon.bullets.map((t) => `<li class="flex gap-3"><span class="shrink-0" aria-hidden="true">▹</span> ${t}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </section>

  <!-- ======================================================== 11. FINAL OFFER (belief 6) -->
  <section class="relative hero-glow bg-ink">
    <div class="relative max-w-5xl mx-auto px-4 sm:px-5 py-16 sm:py-24">
      ${rule(true)}
      ${h2(c.final.h2, ' text-center')}
      <ul class="reveal mt-8 max-w-2xl mx-auto grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
        ${c.final.outcomes.map((t) => `<li class="flex gap-3 text-cream/90">${check}<span>${t}</span></li>`).join('')}
      </ul>
      ${tiersOn
        ? `<div class="reveal mt-10">${tiers('pricing')}${urgency()}</div>
      <div class="mt-5 max-w-xl mx-auto">${guarantee}</div>`
        : `<div class="mt-10 grid md:grid-cols-2 gap-5 items-stretch">
        <div class="reveal bg-card border border-cream/30 rounded-3xl p-6 sm:p-8 flex flex-col" data-anim="scale">
          <p class="text-xs font-semibold tracking-widest uppercase text-muted">${c.final.youGet}</p>
          <ul class="mt-4 space-y-2.5 text-muted flex-1">
            ${c.final.stack.map((t) => `<li class="flex gap-3">${check}<span>${t}</span></li>`).join('')}
          </ul>
          <div class="mt-6 pt-6 border-t border-line text-center">
            <p class="text-muted uppercase tracking-widest text-xs">${c.final.today}</p>
            <p class="font-display text-7xl text-cream leading-none mt-1">{price}</p>
            <div class="mt-5">${cta('pricing', BTN_BLOCK)}</div>
            <p class="mt-2 text-xs text-muted">${c.ctaNote}</p>
            ${urgency()}
          </div>
        </div>
        ${guarantee}
      </div>`}
      <p class="reveal mt-8 text-lg text-cream text-center">${c.final.risk}</p>
      <p class="reveal mt-3 text-sm text-muted text-center max-w-md mx-auto">${c.final.bumpNote}</p>
    </div>
  </section>

  <!-- ======================================================== 12. FAQ -->
  <section class="bg-panel border-y border-line">
    <div class="max-w-3xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
      ${rule(true)}
      ${h2(c.faq.h2, ' text-center')}
      <div class="mt-10 space-y-3" data-stagger>
        ${c.faq.items.map(([q, a]) => `<details class="reveal group bg-card border border-line rounded-2xl px-5">
          <summary class="flex items-center justify-between gap-4 py-5 font-semibold text-cream">${q}<span class="faq-icon text-cream text-2xl leading-none" aria-hidden="true">+</span></summary>
          <p class="pb-5 -mt-1 text-muted">${a}</p>
        </details>`).join('\n        ')}
      </div>
      <div class="reveal mt-12 text-center">
        <p class="font-display text-3xl text-cream">${c.faq.closing}</p>
        <div class="mt-5">${cta('final', BTN)}</div>
        <p class="mt-2 text-xs text-muted">${c.ctaNote}</p>
      </div>
    </div>
  </section>
  </main>

  <footer class="bg-ink border-t border-line">
    <div class="max-w-5xl mx-auto px-4 sm:px-5 py-10 pb-28 sm:pb-10">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p class="font-display text-2xl text-cream">${c.product}</p>
          <p class="text-sm text-muted mt-1">${c.footer.by}</p>
        </div>
        <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Legal">
          <a href="${c.footer.privacyHref}" class="text-muted hover:text-cream transition-colors">${c.footer.privacy}</a>
          <a href="${c.footer.termsHref}" class="text-muted hover:text-cream transition-colors">${c.footer.terms}</a>
          <a href="mailto:aesthethic.engineer@gmail.com" class="text-muted hover:text-cream transition-colors">${c.footer.contact}</a>
        </nav>
      </div>
      <p class="mt-8 text-xs text-muted leading-relaxed max-w-3xl">${c.footer.disclaimer}</p>
      <p class="mt-4 text-xs text-muted">© <span id="year">${new Date().getFullYear()}</span> ${c.footer.rights}</p>
    </div>
  </footer>

  <script>
${JS}
  </script>
</body>
</html>
`;
}
