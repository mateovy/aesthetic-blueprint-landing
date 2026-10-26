# Copy notes: why the page says what it says

The words live in `src/copy/en.mjs` and `src/copy/es.mjs`. This file records the decisions
behind them, so a later edit doesn't undo one by accident.

## Headline

Scored on Mark's seven criteria, one point each: curiosity, pain, promise, timeframe,
specificity, simplicity, credibility. Minimum to ship: 4.

| # | Headline | Cur | Pain | Prom | Time | Spec | Simp | Cred | Total |
|---|---|---|---|---|---|---|---|---|---|
| A | Build a lean, aesthetic physique, without wasting years guessing. (old) | 0 | 1 | 1 | 0 | 0 | 1 | 0 | **3** |
| B | Skinny-fat to lean in 90 days: the phase order that fixes both. | 1 | 1 | 1 | 1 | 1 | 1 | 0 | **6**, rejected |
| C | Skinny-fat? Get lean first. Then build muscle without getting fat again. | 0 | 1 | 1 | 0 | 1 | 1 | 1 | **5** |
| D | Fix skinny-fat in the right order, with your first 30 days mapped out. | 1 | 1 | 1 | 1 | 1 | 1 | 1 | **7**, chosen |
| E | Stop bouncing between bulk and cut. Start the phase your body needs. | 1 | 1 | 0 | 0 | 1 | 1 | 0 | **4** |

**Why B was rejected even though it scores 6:** "lean in 90 days" promises a result on a
deadline. Nothing in the product backs a 90-day outcome (the written plan covers 30 days),
results depend on starting body fat, and the rules forbid guaranteed results. D keeps a
timeframe that is true: the first 30 days really are mapped out in the guide.

Subheadline (the "without" line): *Lean out to a base first, then build muscle without getting
fat again. Without another dirty bulk, endless cardio, or a diet you quit in week two.*

## Beliefs, in the order the page installs them

| Belief | Where |
|---|---|
| 1. My problem isn't genetics or effort, it's the order. | Trap section (big idea as its headline), story |
| 2. Get lean to a base first, then build without getting fat again. | How it works: 3 phases + decision tree |
| 3. A few sets taken truly close to failure can grow me, even with little time. | Why it works (cards 1-2), hero benefit 4, FAQ "How much time" |
| 4. I can do it naturally, without TRT or expensive supplements. | Why it works (cards 5-7), mini FAQ, for/not-for, add-on |
| 5. This plan is built for a skinny-fat guy like me. | Carousel "built for where you are", story, for/not-for (first line in the buyer's words) |
| 6. $12 is a tiny risk next to another year with no change. | Value block, final offer, guarantee |

Every other element breaks an objection: proof line and guarantee ("is this legit?"), mini
FAQs ("will it work for skinny or skinny-fat?", "do I need TRT?", "how do I get it?"), the
add-on panel ("is the $10 thing included?"), the cutting FAQ ("am I spinning my wheels?").

## Scientific claims: the only approved wording

| Claim on the page | Source |
|---|---|
| Hypertrophy (muscle growth) increases as sets are taken closer to failure. | [1] Robinson et al., 2024 (preprint 2023) |
| More weekly sets still tend to build more muscle, but when time is short, a handful of truly hard sets per muscle works well. | [2] Schoenfeld et al., 2017 |
| Training at long muscle lengths likely produces slightly more growth. | [3] Wolf et al., 2023 |
| 30-40 g of protein per meal is a practical minimum; there's no rigid ceiling. | [4] Trommelen et al., 2023 |
| Higher body fat is linked to lower testosterone. | [5] Corona et al., 2013 |
| One week of short sleep can lower testosterone by 10-15%. | [6] Leproult & Van Cauter, 2011 |
| FFMI 22-23 at 10-12% body fat is an athletic, natural target; natural lifters rarely exceed about 25. | [7] Kouri et al., 1995 |
| Eating carbs around training helps fuel performance. | [8] Kerksick et al., 2017 |

Full citations: `src/content/references.mjs`, shown in the "References" accordion on the page.
The brief dated Robinson et al. 2023; that is the SportRxiv preprint. The paper was published
in *Sports Medicine* in 2024, so the page cites 2024.

**Removed because they overclaimed:** "Fewer, harder sets build more", "Muscles grow most
when loaded in a deep stretch", "Same calories, better result" (nutrient timing evidence is
weak), "raises aromatase... Definitely lean is law", "Side delts are the #1 aesthetic muscle
and they recover fast", "why your lab number lies", "the supplements quietly destroying it",
"the fats that kill 5-alpha reductase", "habits that increases your testosterone", and the FAQ
line "Follow the system, get the result".

## Copy chief review log

- **Unsupported claims:** "Exact calorie targets" became "Calorie targets for your phase" (a
  calculator estimates). "Join 56+ guys running the system" became "56+ already have the system":
  Hotmart shows purchases, not who is running it or their gender. "The fix costs $12" became
  "The whole system costs $12". "Changes everything" became "matters so much".
- **Objections:** added the FAQ "I'm cutting and nothing changes. Should I keep going?" (the
  buyer's "am I spinning my wheels" fear) and "Am I skinny-fat or just skinny?".
- **Reading level:** Flesch-Kincaid grade, 169 sentences, average **3.8**. The few sentences
  above grade 8 are product names, the required results disclaimer and the approved
  hypertrophy wording. Jargon on first use is glossed: hypertrophy (muscle growth), long
  muscle lengths (the stretched part of the rep), FFMI (muscle for your height).
- **Insults removed:** "You're looking terrible and girls don't even look at you", "for the
  female gaze", "v-taper sexy physique", "(don't think so if you're in this page)".
- **Grammar fixed:** "i'm" (x2), "habits that increases", "Definitely lean is law",
  "Usually promoted by enhanced people" (no period), the comma splice in the footer.
- **Vague benefits made concrete:** the two tools now name the exact problem they end
  ("I don't know how many calories to eat", "I don't know if it's working").

## Removed sections and why

- **Scrolling trust strip (marquee):** repeated the offer card's trust row. No new job.
- **"Everything you get" as its own section:** the stack now lives in the hero offer card,
  "What's inside" and the final offer, so it was said three times instead of four.
- **Separate guarantee section and separate final CTA:** merged into the final offer (one
  card, one guarantee, one button) per the brief's structure.
- **"No testimonials yet" (2026-10-26):** replaced by Results once real, authorized evidence
  existed (the author at 18 months, Samuel at 1 year). Nothing else on the page claimed there
  were no testimonials. The story lost its "(the 'before' photos)" aside because the author's
  photos moved into Results.

## Spanish

An adaptation, not a literal translation: "skinny fat" kept as is (it is how the audience
searches), bulk = volumen, cut = definición, dirty bulk = volumen sucio, lean bulk = volumen
limpio. Every mention of the add-on says "al pagar". Same keys as the English file: the
build stops if either file is missing a line the other has.
