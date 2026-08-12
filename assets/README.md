# Assets

## What the page actually loads

The page references small WebP derivatives, not the original photos:

| Referenced file | Source it's derived from | Rendered width used to size it |
|---|---|---|
| `hero.webp` | `hero.png` | 536px CSS (max, wide desktop) × 2 for retina → 1080px wide |
| `aesthetic-blueprint-mockup.webp` | `aesthetic blueprint mockup.png` | 320px CSS (flat across breakpoints) × 2 → 640px wide |
| `before-1.webp` / `before-2.webp` / `before-3.webp` | `before 1.jpeg` / `before 2.jpeg` / `before 3.jpeg` | 356px CSS (max, tablet width) × 2 → 720px wide |
| `after-1.webp` / `after-2.webp` / `after-3.webp` | `after 1.JPG` / `after 2.PNG` / `after 3.jpg` | same as above → 720px wide |

The original files (PNG/JPEG, full camera resolution) stay in this folder as the source to
regenerate from. They are **not** referenced by any HTML, so they add zero bytes to what a
visitor downloads.

## Regenerating a WebP derivative

Requires `sips` (macOS built-in) and `cwebp` (`brew install webp`).

```
# fix orientation/cropping first if the source needs it, e.g.:
sips -r 90 "after 1.JPG" --out fixed.jpg              # rotate
sips --cropOffset 250 0 -c 2100 1206 "after 2.PNG" --out fixed.png   # crop

# resize to the target width from the table above, preserving aspect ratio
sips --resampleWidth 720 fixed.jpg

# encode; q=88-92 lands comfortably under the size budget at these dimensions
cwebp -q 90 fixed.jpg -o after-1.webp
```

Budget: hero under 250KB, everything else under 150KB. In practice quality 88-92 lands
these around 30-140KB, well inside budget, so there's no need to drop quality further.

## If you add a new photo

1. Check the actual rendered CSS width in the browser dev tools (not a guess), multiply by
   2 for retina.
2. Fix orientation/cropping if needed, resize, encode to WebP per the steps above.
3. Name it without spaces (`before-1.webp`, not `before 1.webp`) so the URL never needs `%20`.
4. Reference it in `index.html` with explicit `width`/`height` attributes matching the
   resized file, and `loading="lazy"` unless it's above the fold.
5. Keep the original, full-resolution file in this folder too (unreferenced) so you can
   re-derive a different size or format later without re-shooting.
