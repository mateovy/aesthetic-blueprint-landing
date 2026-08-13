# Aesthetic Engineer landing page

Static site, no framework and no bundler. The deploy is "push the files as they are":
`index.html`, `privacy.html`, `terms.html`, and `assets/` go straight to the host.

## Styling

Tailwind is precompiled to a static, purged stylesheet at `assets/styles.css`, which is
committed to the repo so the deploy stays copy-the-files. The pages no longer load the
Tailwind Play CDN (that CDN shipped ~300KB of JS and compiled styles in the browser on
every visit).

- Design tokens (colors, fonts) live in `tailwind.config.js`.
- The Tailwind entry file is `assets/tailwind.input.css` (just the three `@tailwind` directives).
- Page-specific custom CSS (scroll reveals, self-drawing rules, marquee, progress bar, CTA
  states, compare slider, in-app interstitial, hero glow) stays inline in the `<style>` block
  of `index.html`. It is loaded after `styles.css`, so it overrides utilities the same way it
  did under the CDN.

## Motion

The vocabulary is deliberately small and all of it is CSS transitions/transforms driven by one
IntersectionObserver. Everything degrades to "visible, unanimated" rather than "invisible":
`<noscript>` styles, a 2.5s safety net that reveals anything still hidden, and a
`prefers-reduced-motion` block that switches the whole system off.

- `.reveal` — the existing fade/slide system. `data-anim` picks the variant; `hero` is the
  slow 1.04 → 1 settle on the hero image.
- `.rule` — any horizontal divider or accent line, `scaleX(0) → 1` from the left over 600ms.
  `.rule-accent` is the short opener above each section heading (the carousel device);
  `.rule-divider` is a full-width hairline. Both ride the same observer as `.reveal`.
- Section heading italics fade and rise 50ms behind the roman text, so the eye lands on the
  emphasis word last.
- `[data-count]` figures count up from zero over 900ms. The markup holds the final value, so
  no-JS and reduced-motion visitors just read it. The `$7` is deliberately never animated.
- `.cta-glow` — resting lift, hover into pure white, and a press state. No pulse: the press
  is what makes it feel real on mobile, where there is no hover.

Two things are JS rather than CSS because they cannot be expressed as transitions: the
count-up, and the compare slider's one-time "drag me" hint (animating a custom property needs
`@property`, which is not safe to rely on in older in-app webviews). Both are skipped
entirely under `prefers-reduced-motion`.

### Regenerate the stylesheet

Run this after changing any class in the HTML, or any token in `tailwind.config.js`:

```
npx tailwindcss@3 -c tailwind.config.js -i assets/tailwind.input.css -o assets/styles.css --minify
```

Then commit the updated `assets/styles.css`.

The config `content` array covers `index.html`, `privacy.html`, `terms.html`, and
`og-template.html`, so classes used in any of those are kept and everything else is purged.
Classes that the vanilla JS toggles at runtime (`opacity-0`, `opacity-100`, `bg-cream`,
`bg-line`, `translate-y-full`) are pinned in the config `safelist` so a future JS refactor
cannot silently drop them.

## Images

The page loads small WebP derivatives (`hero.webp`, `before-1.webp`, etc.), sized to the
actual rendered width times 2 for retina. Full-resolution originals stay in `assets/` as
unreferenced source files. See `assets/README.md` for the full table and the regenerate
command (needs `sips`, built into macOS, and `cwebp` via `brew install webp`).

## Social share image

`og-template.html` is the source used to render `assets/og-image.png` (1200x630). If you
change the template, regenerate the PNG (screenshot the template at 1200x630) and keep the
filename. `og:image` and `twitter:image` in `index.html` point at the absolute URL
`https://aesthetic-engineer.com/assets/og-image.png` so link previews resolve for scrapers.

## Before / after

One drag-to-compare slider (`#compare`), not two slideshows. The after frame is the base
layer; the before frame sits on top, clipped by `clip-path` to everything left of the handle.
A single custom property `--pos` drives both the clip and the handle, so pointer drag,
keyboard (arrows / Home / End / shift for bigger steps) and the intro hint all just move one
number. Prev/next and the dots swap which of the three photo pairs is under the handle.

The images carry `draggable="false"` (plus `-webkit-user-drag: none`). Without it the browser
starts a native image drag on mousedown, which fires `dragstart` → `pointercancel` and stalls
the wipe about two pixels in.

## In-app browsers

TikTok/Instagram/Facebook/Snapchat webviews block the popup PayPal opens at checkout, so
buyers there get a silent reload instead of a payment screen. The page detects those user
agents and intercepts checkout clicks with an interstitial offering "Copy link" or "Continue
anyway". It fires on intent only — nothing renders until someone actually taps a checkout
link — and in a normal browser the detection returns immediately, no listener is bound, and
every click passes through untouched.

Checkout links are marked with `data-checkout`. **Any new checkout link needs that attribute**
or in-app visitors will hit the broken PayPal popup with no warning.

## Brand

Strictly monochrome: no accent colors, ever. Playfair Display for headlines (italic for the
emphasized word), Inter for body. Keep it that way so the page matches the carousels a
visitor just came from.
