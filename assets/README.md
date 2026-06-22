# Assets — what to supply before launch

Drop your real images into this folder using the **exact filenames** below.
The page already points at placeholder `.svg` files so it renders out of the box —
replace each placeholder by adding the real file and updating the `src` in `index.html`
(each image has a comment next to it like `{{HERO_IMAGE}} -> replace assets/hero.svg with your assets/hero.jpg`).

| File to add                | Used for                          | Ideal dimensions | Format | Notes |
|----------------------------|-----------------------------------|------------------|--------|-------|
| `hero.jpg`                 | Hero physique shot                | 900 × 1100 (portrait) | JPG/WebP | Lean, aesthetic male physique / Greek-statue energy. Dark background suits the design. Keep under ~250KB. |
| `transformation.jpg`       | Before/after story block          | 1000 × 750 (landscape) | JPG/WebP | Real before/after. Left = before, right = after (overlay labels are added by the page). |
| `book-mockup.png`          | Product mockup in "What's Inside" | 600 × 800 (portrait) | PNG (transparent) | The book cover / 3D render. Transparent background looks best. |
| `og-image.jpg`             | Social share preview (link unfurl)| 1200 × 630 | JPG | Shown when the link is shared on TikTok/IG/WhatsApp/etc. Title + book + orange accent. |

## Tips
- **Optimize before upload.** Compress with [squoosh.app](https://squoosh.app) or `tinypng.com`. Target < 250KB each — mobile TikTok traffic is impatient.
- **WebP is fine** anywhere JPG is listed (better compression). Just match the filename's extension in `index.html`.
- All non-hero images already use `loading="lazy"`; the hero loads eagerly for fast first paint.

## Placeholder files (delete after you add the real ones)
- `hero.svg`, `transformation.svg`, `book-mockup.svg` — generic placeholders so the page renders before you have art.
