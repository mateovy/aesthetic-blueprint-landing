#!/usr/bin/env node
// Builds the landing from src/ into the files Cloudflare Pages serves as they are:
//   index.html, es/index.html, ig.html, fb.html, assets/styles.css, assets/evidence/*.webp
//
//   node build.mjs           build everything
//   node build.mjs --check   build in memory and validate, write nothing
//
// No npm dependencies. Needs Node 18+, and for the stylesheet `npx tailwindcss@3` (as before).
// Processing customer photos also needs `sips` (macOS) and `cwebp` (brew install webp).
//
// The build refuses to write anything if a rule is broken: a CTA without its UTM set, a
// placeholder left in the copy, an evidence item without permission on the page, tiers or
// urgency switched on without the data they need, or the Spanish copy missing a key.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { render } from './src/page.mjs';
import en from './src/copy/en.mjs';
import es from './src/copy/es.mjs';
import refs from './src/content/references.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CHECK = process.argv.includes('--check');
const r = (...p) => path.join(ROOT, ...p);
const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// node build.mjs --grid originals/photo.jpg [rotate]
// Writes originals/photo.grid.png: the photo with a numbered 10% grid, so the face "box"
// ([x, y, width, height] in % of the photo) can be read off it instead of guessed.
{
  const gi = process.argv.indexOf('--grid');
  if (gi > -1) {
    const rel = process.argv[gi + 1], rot = process.argv[gi + 2];
    const src = r('src/content/evidence', rel || '');
    if (!rel || !fs.existsSync(src)) { console.error(`--grid: ${rel} not found in src/content/evidence/`); process.exit(1); }
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'grid-'));
    const inp = path.join(tmp, 'in' + path.extname(src));
    fs.copyFileSync(src, inp);
    if (rot) execFileSync('sips', ['-r', rot, inp], { stdio: 'ignore' });
    execFileSync('sips', ['-s', 'format', 'bmp', inp, '--out', path.join(tmp, 'in.bmp')], { stdio: 'ignore' });
    const img = readBMP(fs.readFileSync(path.join(tmp, 'in.bmp')));
    const put = (x, y, c) => { if (x >= 0 && y >= 0 && x < img.w && y < img.h) img.data.set(c, (y * img.w + x) * 3); };
    const PINK = [255, 0, 200], WHITE = [255, 255, 255];
    const lw = Math.max(1, Math.round(img.w / 400));
    for (let p = 5; p < 100; p += 5) {
      const X = Math.round((p / 100) * img.w), Y = Math.round((p / 100) * img.h), t = p % 10 ? 1 : lw * 2, col = p % 10 ? WHITE : PINK;
      for (let y = 0; y < img.h; y++) for (let k = 0; k < t; k++) put(X + k, y, col);
      for (let x = 0; x < img.w; x++) for (let k = 0; k < t; k++) put(x, Y + k, col);
    }
    // 3x5 digits so every pink line carries its percentage
    const G = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001001001', 8: '111101111101111', 9: '111101111001111' };
    const s = Math.max(3, Math.round(img.w / 120));
    const text = (str, x0, y0) => [...str].forEach((ch, n) => {
      for (let i = 0; i < 15; i++) if (G[ch][i] === '1') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) put(x0 + n * 4 * s + (i % 3) * s + a, y0 + Math.floor(i / 3) * s + b, PINK);
    });
    for (let p = 10; p < 100; p += 10) { text(String(p), Math.round((p / 100) * img.w) + 3 * lw, 2 * s); text(String(p), 2 * s, Math.round((p / 100) * img.h) + 3 * lw); }
    fs.writeFileSync(path.join(tmp, 'out.bmp'), writeBMP(img));
    const out = src.replace(/\.[^.]+$/, '.grid.png');
    execFileSync('sips', ['-s', 'format', 'png', path.join(tmp, 'out.bmp'), '--out', out], { stdio: 'ignore' });
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`wrote ${path.relative(ROOT, out)}  (pink lines every 10%, white every 5%). Read the face box off it as [x, y, width, height].`);
    process.exit(0);
  }
}

const config = JSON.parse(fs.readFileSync(r('src/config.json'), 'utf8'));

// ------------------------------------------------------------------ copy parity (EN vs ES)
function shape(o, p = '') {
  if (Array.isArray(o)) return [`${p}[${o.length}]`, ...o.flatMap((v, i) => shape(v, `${p}[${i}]`))];
  if (o && typeof o === 'object') return Object.keys(o).sort().flatMap((k) => shape(o[k], p ? `${p}.${k}` : k));
  return [p];
}
{
  const a = new Set(shape(en)), b = new Set(shape(es));
  for (const k of a) if (!b.has(k)) fail(`copy: src/copy/es.mjs is missing "${k}" (or a list has a different length)`);
  for (const k of b) if (!a.has(k)) fail(`copy: src/copy/en.mjs is missing "${k}" (or a list has a different length)`);
}

// ------------------------------------------------------------------ config checks
{
  const p = config.proof;
  if (p.enabled) {
    if (!Number.isInteger(p.buyers) || p.buyers < 0) fail('config.proof.buyers must be a whole number');
    if (!Number.isInteger(p.refunds) || p.refunds < 0) fail('config.proof.refunds must be a whole number');
    const age = (Date.now() - Date.parse(p.asOf)) / 864e5;
    if (isNaN(age)) fail('config.proof.asOf must be a date (YYYY-MM-DD)');
    else if (age > 30) warn(`config.proof numbers are ${Math.round(age)} days old (asOf ${p.asOf}). Update them from Hotmart.`);
  }
  const t = config.tiers;
  if (t.enabled) {
    if (t.items.length !== 3) fail('config.tiers needs exactly 3 items');
    if (t.items.filter((i) => i.popular).length !== 1) fail('config.tiers needs exactly one "popular" item');
    t.items.forEach((i) => { if (!i.hotmartOffer) fail(`config.tiers "${i.id}" has no hotmartOffer code, so its button would sell the wrong price`); });
  }
  const u = config.urgency;
  if (u.enabled) {
    const end = Date.parse(u.endsAt);
    if (isNaN(end)) fail('config.urgency.endsAt must be a real date (ISO, e.g. 2026-11-30T23:59:00-05:00)');
    else if (end < Date.now()) fail('config.urgency.endsAt is in the past. Turn urgency off: fake deadlines are not allowed.');
  }
  if (!['story', 'results'].includes(config.authorPhotos.placement)) fail('config.authorPhotos.placement must be "story" or "results"');
}

// ------------------------------------------------------------------ evidence
const EVD = r('src/content/evidence');
const evidenceAll = fs.readdirSync(EVD)
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => ({ file: f, ...JSON.parse(fs.readFileSync(path.join(EVD, f), 'utf8')) }));

{
  const ids = new Set();
  let authors = 0;
  for (const e of evidenceAll) {
    const where = `evidence/${e.file}`;
    if (!/^[a-z0-9-]+$/.test(e.id || '')) fail(`${where}: "id" must be lowercase letters, numbers or dashes`);
    if (ids.has(e.id)) fail(`${where}: duplicate id "${e.id}"`);
    ids.add(e.id);
    if (!['author', 'customer'].includes(e.type)) fail(`${where}: "type" must be "author" or "customer"`);
    if (e.type === 'author') authors++;
    if (typeof e.permission !== 'boolean') fail(`${where}: "permission" must be true or false`);
    if (!e.name) fail(`${where}: "name" is required (first name or initials)`);
    if (!e.quote || !e.quote.text) fail(`${where}: "quote.text" is required (their exact words)`);
    if (e.quote && !['en', 'es'].includes(e.quote.lang)) fail(`${where}: "quote.lang" must be "en" or "es"`);
    if (!e.photos || !(e.photos.before || []).length || !(e.photos.after || []).length) fail(`${where}: needs at least one before and one after photo`);
    if (e.type === 'customer' && e.permission && !e.permissionNote) warn(`${where}: add "permissionNote" (where and when they said yes)`);
    if (e.type === 'author' && e.featured) fail(`${where}: the author can't be "featured" as a customer result`);
  }
  if (authors > 1) fail('evidence: only one item can have type "author"');
}

// Only items with permission: true ever reach the page.
const evidence = evidenceAll.filter((e) => e.permission === true);

// Photos given as "original" are cropped to 3:4, face-protected and encoded at build time,
// so the published file never contains a face the person asked to hide.
function readBMP(buf) {
  const off = buf.readUInt32LE(10), dib = buf.readUInt32LE(14);
  const w = buf.readInt32LE(18), hs = buf.readInt32LE(22), bpp = buf.readUInt16LE(28), comp = buf.readUInt32LE(30);
  const h = Math.abs(hs), topDown = hs < 0, Bpp = bpp / 8;
  if (bpp !== 24 && bpp !== 32) throw new Error(`unsupported BMP depth ${bpp}`);
  let masks = [0x00ff0000, 0x0000ff00, 0x000000ff];
  if (comp === 3 || comp === 6) masks = dib >= 52 ? [buf.readUInt32LE(54), buf.readUInt32LE(58), buf.readUInt32LE(62)] : [buf.readUInt32LE(off - 12), buf.readUInt32LE(off - 8), buf.readUInt32LE(off - 4)];
  const shift = (m) => (m ? Math.log2(m & -m) : 0);
  const sh = masks.map(shift);
  const row = Math.ceil((w * Bpp) / 4) * 4;
  const data = new Uint8Array(w * h * 3);
  for (let y = 0; y < h; y++) {
    const sy = topDown ? y : h - 1 - y;
    for (let x = 0; x < w; x++) {
      const i = off + sy * row + x * Bpp, o = (y * w + x) * 3;
      if (bpp === 24) { data[o] = buf[i + 2]; data[o + 1] = buf[i + 1]; data[o + 2] = buf[i]; }
      else { const v = buf.readUInt32LE(i); data[o] = (v & masks[0]) >>> sh[0]; data[o + 1] = (v & masks[1]) >>> sh[1]; data[o + 2] = (v & masks[2]) >>> sh[2]; }
    }
  }
  return { w, h, data };
}
function writeBMP({ w, h, data }) {
  const row = Math.ceil((w * 3) / 4) * 4, size = 54 + row * h, b = Buffer.alloc(size);
  b.write('BM', 0); b.writeUInt32LE(size, 2); b.writeUInt32LE(54, 10); b.writeUInt32LE(40, 14);
  b.writeInt32LE(w, 18); b.writeInt32LE(h, 22); b.writeUInt16LE(1, 26); b.writeUInt16LE(24, 28); b.writeUInt32LE(row * h, 34);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = 54 + (h - 1 - y) * row + x * 3, o = (y * w + x) * 3;
    b[i] = data[o + 2]; b[i + 1] = data[o + 1]; b[i + 2] = data[o];
  }
  return b;
}
function crop(img, x, y, w, h) {
  x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
  const out = new Uint8Array(w * h * 3);
  for (let j = 0; j < h; j++) out.set(img.data.subarray(((y + j) * img.w + x) * 3, ((y + j) * img.w + x + w) * 3), j * w * 3);
  return { w, h, data: out };
}
function pixelate(img, bx, by, bw, bh) {
  const block = Math.max(8, Math.round(bw / 5));
  const x0 = Math.max(0, Math.round(bx)), y0 = Math.max(0, Math.round(by));
  const x1 = Math.min(img.w, Math.round(bx + bw)), y1 = Math.min(img.h, Math.round(by + bh));
  for (let y = y0; y < y1; y += block) for (let x = x0; x < x1; x += block) {
    const ye = Math.min(y + block, y1), xe = Math.min(x + block, x1);
    let s = [0, 0, 0], n = 0;
    for (let j = y; j < ye; j++) for (let i = x; i < xe; i++) { const o = (j * img.w + i) * 3; s[0] += img.data[o]; s[1] += img.data[o + 1]; s[2] += img.data[o + 2]; n++; }
    s = s.map((v) => Math.round(v / n));
    for (let j = y; j < ye; j++) for (let i = x; i < xe; i++) { const o = (j * img.w + i) * 3; img.data[o] = s[0]; img.data[o + 1] = s[1]; img.data[o + 2] = s[2]; }
  }
}
function processPhoto(e, side, idx, ph) {
  if (ph.src) return ph; // already a published, processed file
  const src = path.join(EVD, ph.original || '');
  const out = `assets/evidence/${e.id}-${side}-${idx + 1}.webp`;
  if (!ph.original || !fs.existsSync(src)) { fail(`evidence/${e.file}: photo "${ph.original}" not found in src/content/evidence/`); return { src: out, width: 720, height: 960 }; }
  const json = path.join(EVD, e.file);
  const fresh = fs.existsSync(r(out)) && fs.statSync(r(out)).mtimeMs > Math.max(fs.statSync(src).mtimeMs, fs.statSync(json).mtimeMs);
  if (fresh || CHECK) return { src: out, width: 720, height: 960 };

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'evd-'));
  const ext = path.extname(src).toLowerCase();
  fs.copyFileSync(src, path.join(tmp, 'in' + ext));
  if (ph.rotate) execFileSync('sips', ['-r', String(ph.rotate), path.join(tmp, 'in' + ext)], { stdio: 'ignore' });
  execFileSync('sips', ['-s', 'format', 'bmp', path.join(tmp, 'in' + ext), '--out', path.join(tmp, 'in.bmp')], { stdio: 'ignore' });
  let img = readBMP(fs.readFileSync(path.join(tmp, 'in.bmp')));
  const W = img.w, H = img.h;
  const face = ph.face && ph.face.box ? ph.face.box.map((v, i) => (v / 100) * (i % 2 ? H : W)) : null; // [x,y,w,h] px

  // 3:4 frame: explicit [x%, y%, w%], or below the face for "crop", or a centred 3:4.
  let fw, fh, fx, fy;
  if (ph.frame) { fw = (ph.frame[2] / 100) * W; fh = fw * 4 / 3; fx = (ph.frame[0] / 100) * W; fy = (ph.frame[1] / 100) * H; }
  else if (face && ph.face.mode === 'crop') {
    fy = face[1] + face[3] + 0.02 * H; fh = H - fy; fw = Math.min(W, fh * 3 / 4); fh = fw * 4 / 3;
    fx = Math.min(Math.max(0, face[0] + face[2] / 2 - fw / 2), W - fw);
  } else { fw = Math.min(W, H * 3 / 4); fh = fw * 4 / 3; fx = (W - fw) / 2; fy = (H - fh) / 2; }
  fx = Math.max(0, Math.min(fx, W - fw)); fy = Math.max(0, Math.min(fy, H - fh));
  if (face && ph.face.mode === 'blur') pixelate(img, face[0], face[1], face[2], face[3]);
  img = crop(img, fx, fy, fw, fh);

  fs.writeFileSync(path.join(tmp, 'out.bmp'), writeBMP(img));
  execFileSync('sips', ['-s', 'format', 'png', path.join(tmp, 'out.bmp'), '--out', path.join(tmp, 'out.png')], { stdio: 'ignore' });
  fs.mkdirSync(r('assets/evidence'), { recursive: true });
  execFileSync('cwebp', ['-quiet', '-q', '82', '-resize', '720', '960', path.join(tmp, 'out.png'), '-o', r(out)]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`  photo  ${out}${ph.face ? `  (face: ${ph.face.mode})` : ''}`);
  return { src: out, width: 720, height: 960 };
}
for (const e of evidence) {
  for (const side of ['before', 'after']) e.photos[side] = e.photos[side].map((ph, i) => processPhoto(e, side, i, ph));
}

// ------------------------------------------------------------------ render
const fill = (html, c) => html
  .replaceAll('{price}', `${config.price.symbol}${config.price.amount}`)
  .replaceAll('{bump}', `${config.price.symbol}${config.bump.amount}`)
  .replaceAll('{pages}', String(config.pages[c.lang]))
  .replaceAll('{product}', c.product)
  .replaceAll('{bumpName}', c.bumpName);

const pages = [
  { c: en, out: 'index.html' },
  { c: es, out: 'es/index.html' },
];

function tailwind(contentFile, outFile) {
  execFileSync('npx', ['--yes', 'tailwindcss@3', '-c', r('tailwind.config.js'), '-i', r('assets/tailwind.input.css'),
    ...(contentFile ? ['--content', contentFile] : []), '-o', outFile, '--minify'], { cwd: ROOT, stdio: 'ignore' });
}

// Pass 1: render, take the above-the-fold markup (sticky bar + header) of both pages, and
// compile only the utilities it uses. That CSS is inlined so first paint needs no stylesheet.
for (const p of pages) p.html = fill(render({ c: p.c, config, evidence, refs }), p.c);
let critical = '/* critical CSS skipped in --check */';
if (!CHECK) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'crit-'));
  const fold = pages.map((p) => p.html.slice(p.html.indexOf('<body'), p.html.indexOf('</header>') + 9)).join('\n');
  fs.writeFileSync(path.join(tmp, 'fold.html'), fold);
  tailwind(path.join(tmp, 'fold.html'), path.join(tmp, 'critical.css'));
  critical = fs.readFileSync(path.join(tmp, 'critical.css'), 'utf8').trim();
  fs.rmSync(tmp, { recursive: true, force: true });
}
// Pass 2: the real pages.
for (const p of pages) p.html = fill(render({ c: p.c, config, evidence, refs, critical }), p.c);

// ------------------------------------------------------------------ validate the output
for (const p of pages) {
  const left = p.html.match(/\{(price|bump|pages|buyers|refunds|product|bumpName|date)\}/g);
  if (left) fail(`${p.out}: placeholder(s) left in the page: ${[...new Set(left)].join(', ')}`);
  const links = [...p.html.matchAll(/href="([^"]*go\/blueprint\/[^"]*)"/g)].map((m) => m[1]);
  const ctas = links.filter((h) => h.includes('?'));
  if (!ctas.length) fail(`${p.out}: no checkout buttons found`);
  for (const h of ctas) {
    if (!h.startsWith(p.c.bridge + '?')) fail(`${p.out}: CTA goes to the wrong bridge: ${h}`);
    const q = new URLSearchParams(h.split('?')[1]);
    if (q.get('utm_source') !== 'landing' || q.get('utm_medium') !== 'web' || q.get('utm_campaign') !== 'blueprint' || !q.get('utm_content')) {
      fail(`${p.out}: CTA without the full UTM set: ${h}`);
    }
  }
  p.utm = ctas.map((h) => new URLSearchParams(h.split('?')[1]).get('utm_content'));
  for (const e of evidenceAll.filter((x) => !x.permission)) {
    if (p.html.includes(`${e.id}-before-`) || p.html.includes(`"${e.name}`)) fail(`${p.out}: evidence "${e.id}" has no permission but appears on the page`);
  }
}

if (warnings.length) { console.log('\nWarnings:'); warnings.filter(Boolean).forEach((w) => console.log('  - ' + w)); }
if (errors.length) {
  console.error('\nBuild stopped. Nothing was written:');
  errors.forEach((e) => console.error('  x ' + e));
  process.exit(1);
}

// ------------------------------------------------------------------ write
const IGFB = (slug) => `<!--
  GENERATED FILE. Do not edit this one: edit src/ and run \`node build.mjs\`.

  Everything below this comment is a byte-for-byte copy of index.html. Cloudflare Pages
  serves it at /${slug}, and Web Analytics reports location.pathname, so that campaign gets
  its own row in the Path tab. The URL has to stay /${slug} for that to work: any redirect
  collapses it back to "/" and the split is lost.

  A copy rather than a _redirects rewrite because Pages turns a 200 rewrite pointed at
  /index.html into a 307 to "/", which is exactly the outcome this needs to avoid.

  index.html carries <link rel="canonical"> pointing at the root, so all three paths tell
  search engines the same thing.
-->
`;

if (CHECK) {
  for (const p of pages) console.log(`ok  ${p.out}  (${p.utm.length} CTAs: ${p.utm.join(', ')})`);
  console.log('\n--check: everything valid, nothing written.');
  process.exit(0);
}

for (const p of pages) {
  fs.mkdirSync(path.dirname(r(p.out)), { recursive: true });
  fs.writeFileSync(r(p.out), p.html);
  console.log(`wrote ${p.out}  (${(p.html.length / 1024).toFixed(0)} KB, ${p.utm.length} CTAs: ${p.utm.join(', ')})`);
}
for (const slug of ['ig', 'fb']) {
  fs.writeFileSync(r(`${slug}.html`), IGFB(slug) + pages[0].html);
  console.log(`wrote ${slug}.html  (copy of index.html)`);
}
tailwind(null, r('assets/styles.css'));
console.log(`wrote assets/styles.css  (${(fs.statSync(r('assets/styles.css')).size / 1024).toFixed(1)} KB)`);
console.log(`\nEvidence on the page: ${evidence.map((e) => `${e.id} (${e.type})`).join(', ') || 'none'}`);
console.log(`Proof line: ${config.proof.enabled ? `${config.proof.buyers} buyers, ${config.proof.refunds} refunds (as of ${config.proof.asOf})` : 'off'}`);
console.log(`Tiers: ${config.tiers.enabled ? 'ON' : 'off'} · Urgency: ${config.urgency.enabled ? 'ON' : 'off'} · Price: ${config.price.symbol}${config.price.amount}`);
