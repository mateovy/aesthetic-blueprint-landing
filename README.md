# Aesthetic Engineer landing page

Static site. The pages are generated from `src/` by `build.mjs` (no npm dependencies), and the
generated files are committed, so the deploy is still "push the files as they are": Cloudflare
Pages serves `index.html`, `es/index.html`, `ig.html`, `fb.html`, `privacy.html`, `terms.html`,
the `go/` bridges and `assets/` with no build step on its side.

```
node build.mjs           # build everything (pages, ig/fb copies, stylesheet, evidence photos)
node build.mjs --check   # validate only, writes nothing
```

Needs Node 18+. The stylesheet step runs `npx tailwindcss@3` (downloads it the first time).
Processing customer photos also needs `sips` (built into macOS) and `cwebp` (`brew install webp`).

**Do not edit `index.html`, `es/index.html`, `ig.html` or `fb.html` by hand.** The next build
overwrites them. Edit `src/` and rebuild.

## Where things live

| To change | Edit |
|---|---|
| Price, bump price, page counts, proof numbers, tiers, urgency, author photo placement | `src/config.json` |
| English words | `src/copy/en.mjs` |
| Spanish words | `src/copy/es.mjs` (same keys as English; the build stops if one is missing) |
| Results / testimonials | `src/content/evidence/*.json` |
| Study citations | `src/content/references.mjs` |
| Layout and section order | `src/page.mjs` |
| Page CSS / JS | `src/styles/page.css`, `src/scripts/page.js` |
| Why the copy says what it says | `docs/COPY.md` |

## Change the price

1. Change the price **in Hotmart first**. The page only displays a number; Hotmart is what charges.
2. In `src/config.json`, set `price.amount` (and `bump.amount` if the order bump changed).
3. `node build.mjs`. Every price on both pages, the meta description and the FAQ update together.
4. The share images are pictures, so they don't update themselves. Re-export them:
   `og-template.html` → `assets/og-image.jpeg` and `og-template-es.html` →
   `assets/og-image-es.jpeg` (screenshot at 1200x630, see "Social share images"). Then bump the
   `?v=` on `meta.ogImage` in the copy file so scrapers and caches fetch the new one.

## Proof line ("56+ already have the system · 0 refunds")

`config.proof`. Real numbers only, copied from Hotmart by hand: `buyers` is total sales,
`refunds` is total refunds, `asOf` is the date you copied them. The build warns when `asOf`
is more than 30 days old. Set `enabled: false` to hide the line.

## Add evidence (a customer result)

Only real people, with their permission. The build enforces the rest.

1. Get written permission (DM, email) to use their photos, first name or initials, and quote.
   Keep a screenshot.
2. Put their raw photos in `src/content/evidence/originals/`. That folder is in `.gitignore`:
   the raw photos never reach git or the site. Only the processed copies do.
3. Copy `src/content/evidence/_template.json` to `src/content/evidence/<name>.json` (no
   leading underscore; files starting with `_` are ignored) and fill it in:
   - `type`: `"customer"`. (`"author"` is only you, and always shows the label "The author,
     first to run the system". It can never be presented as a customer.)
   - `name`: first name or initials. `time`: the real time it took, per language.
   - `quote.text`: their exact words. `quote.lang`: the language they wrote in. On the other
     language's page, `quote.translation` shows instead, marked "Translated from…".
   - `permission`: `true` only once you have it. `false` keeps them off the page entirely.
   - `permissionNote`: where and when they said yes.
   - `featured: true` also adds them as a slide in the hero carousel.
4. Hiding the face, per photo: `"face": { "mode": "blur" | "crop", "box": [x, y, width, height] }`,
   in % of the photo. `blur` pixelates the face; `crop` frames the photo from below the chin.
   Both happen **in the image file**, so the published photo never contains the face. To read
   the box, run `node build.mjs --grid originals/<photo>.jpg`: it writes a copy with a numbered
   10% grid next to the original.
   `rotate` (90/180/270) fixes a sideways phone photo. `frame: [x, y, width]` (in %) picks the
   3:4 crop by hand; leave `null` for centred.
5. `node build.mjs`. Photos come out as `assets/evidence/<id>-before-1.webp` etc. (720x960).

While no customer has `permission: true`, the results section keeps the honest
"No testimonials yet" text. As soon as one does, it switches to the evidence grid, with
"Individual results vary and depend on consistency and starting point." underneath.

`config.authorPhotos.placement`: `"story"` keeps your before/after in "My story" (default);
`"results"` moves it into the results section as an author card.

## Turn on the 3-tier offer (Mark's model, off by default)

1. In Hotmart, create an **offer** on the product for each tier price (Product → Offers). Each
   offer has a code. The tier buttons send it as `off=<code>`, which Hotmart uses to open the
   checkout at that price. Without a code the build refuses to turn tiers on.
2. In `config.tiers.items`, fill `hotmartOffer`, `price`, `features` and `name` for each tier.
   Exactly one tier has `popular: true` (it gets the "Most popular" badge). `decoy: true` is
   just a label for you: the cheap tier that makes the middle one look right.
   `compareAt` shows a struck-through price: only use a price you really charged or will charge.
3. Set `price.amount` to the popular tier's price (used in the sticky bar and the copy).
4. If a tier includes The Testosterone Blueprint, remove it as an order bump from that offer in
   Hotmart, and adjust the add-on wording in the copy, so nobody gets offered it twice.
5. `config.tiers.enabled: true`, then `node build.mjs`. The tiers replace the offer card in the
   hero and in the final offer, each button with its own `utm_content` (`hero-tier-system`, …).

## Urgency (off by default)

Only for a real deadline. `config.urgency`: `enabled`, `endsAt` (ISO date with time zone) and
the text with `{date}`. The build refuses a date in the past, and the line removes itself
in the browser once the date passes.

## Checkout links and UTMs

Every button is a plain link to the bridge (`/go/blueprint/` or `/es/go/blueprint/`) with
`utm_source=landing&utm_medium=web&utm_campaign=blueprint&utm_content=<section>`. The bridge
adds `checkoutMode=10` (the order bump) and `src=tiktok` / `src=tiktok_es`, and forwards the
whole query string to Hotmart. The build refuses to write a page with a button missing any of
those UTMs or pointing at the other language's bridge.

`utm_content` per button, both languages: `sticky`, `hero`, `phases`, `mechanism`, `chapters`,
`social-proof`, `pricing`, `final`. Compared with the version before the rework: `stack`
(the old "Everything you get" section) and `guarantee` (the old guarantee section) no longer
exist, and `phases` (How it works) is new. Older Hotmart reports still show those labels.

The bridges contain the Hotmart product links (`go/blueprint/index.html`,
`es/go/blueprint/index.html`). They are not generated: edit them directly. Inside an iOS
TikTok/Instagram/Facebook browser the bridge shows "open in your browser" instead of
redirecting, because Hotmart's checkout doesn't open there.

## Page structure

1. Hero: carousel (product, author before/after labelled as the author, "no dirty bulk, no
   starving", who it's for, system vs. random advice, guarantee, a featured customer when one
   exists), proof line, headline, outcomes, offer card, 3 short FAQs
2. The trap (big idea as the headline) · 3. My story · 4. How it works (3 phases + decision tree)
5. Why it works (approved claims + references accordion) · 6. What's inside (8 chapters, 2 free tools)
7. Results · 8. For / not for · 9. What not doing it costs · 10. Add-on at checkout
11. Final offer (outcomes, card, guarantee) · 12. FAQ, footer

The carousel is native horizontal scroll with snap points, so it swipes with no JavaScript;
the script only adds the arrows, the dots and the current-slide state.

## Styling and performance

Tailwind is precompiled into `assets/styles.css` by the build. Design tokens are in
`tailwind.config.js`. The build also compiles just the utilities used above the fold and
inlines them in `<head>`, so first paint needs no stylesheet request. That inline CSS sits
**before** the stylesheet link on purpose: it is a subset of `styles.css`, and if it came after,
a plain `.flex-col` there would beat an `sm:flex-row` in the stylesheet.

Measured with Lighthouse (mobile, served with gzip like Cloudflare does): performance 93,
accessibility 100 on both pages. The previous version measured 82 / 91 the same way.

## Images

WebP derivatives sized for their rendered width ×2. The hero carousel uses
`assets/carousel/` (mockups at 720 and 1080 wide with `srcset`, small author photos for the
carousel slide). See `assets/README.md` for the rest and the regenerate commands.

## Social share images

`og-template.html` and `og-template-es.html` are the layouts for `assets/og-image.jpeg` and
`assets/og-image-es.jpeg` (1200x630). To re-export one:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --allow-file-access-from-files --virtual-time-budget=3000 --window-size=1200,630 \
  --screenshot=og.png "file://$PWD/og-template-es.html"
sips -s format jpeg -s formatOptions 85 og.png --out assets/og-image-es.jpeg
```

Keep the file small (WhatsApp skips multi-megabyte previews) and bump its `?v=`.

## Offer rules

$12 buys the Blueprint, the 30-day plan and the two Google Sheets. The Testosterone Blueprint
($10) is **not** included: it is the order bump inside Hotmart's checkout. Every mention says
"at checkout" / "al pagar". Copy that lets a buyer think it ships with the $12 turns into a
refund.

## Brand

Strictly monochrome, no accent colours. Playfair Display for headlines (italic for the
emphasized words, written as `<em>` in the copy files), Inter for body text.

## Going back

The version before this rework is tagged `pre-mark-v1`. `git checkout pre-mark-v1 -- .`
restores its files.

## What's still missing

- **Your real transformation time.** `time` in `src/content/evidence/author.json` is empty, so
  no duration is shown. Fill it in only with the real number.
- **Customer evidence.** None yet. Ask buyers for photos and permission (see above).
- **Proof numbers.** 56 sales / 0 refunds as of 2026-10-25. Update `config.proof` from Hotmart.
- **English share image.** `assets/og-image.jpeg` still uses the old headline ("Build a lean,
  aesthetic physique"). The price on it is right ($12). Re-export if you want it to match.
- **3-tier mode.** Needs Hotmart offer codes before it can be switched on.
- **`assets/originals/`** is served publicly (the deploy copies the repo). It holds full-size
  author photos. Move it out of the repo if that matters to you.
