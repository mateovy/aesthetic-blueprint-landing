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
- Page-specific custom CSS (scroll reveals, marquee, progress bar, CTA shadow, hero glow)
  stays inline in the `<style>` block of `index.html`. It is loaded after `styles.css`, so it
  overrides utilities the same way it did under the CDN.

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

## Brand

Strictly monochrome: no accent colors, ever. Playfair Display for headlines (italic for the
emphasized word), Inter for body. Keep it that way so the page matches the carousels a
visitor just came from.
