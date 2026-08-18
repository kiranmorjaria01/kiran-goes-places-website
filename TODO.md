# TODO — needs your input

Running list across all phases. Phase 1 additions below; will grow as later phases surface gaps.

## Validation blocked on deployment

The brief's "validation before you call it done" checklist has six items. Three I've been able to verify directly from the files (details in each phase's CHANGES.md entry): all JSON-LD parses as valid JSON with expected `@type`s across all 60 pages, zero broken internal links (checked programmatically across the whole site, not just spot-checked), and the sitemap contains exactly the 60 pages that exist, no more, no less. The other three genuinely need the site live somewhere:

- **Google's Rich Results Test** and **Schema.org's validator** — both need a public URL to test against; I can't run them against a branch that only exists on this machine.
- **Lighthouse SEO score of 100 on a sample of five pages** — same constraint, needs a real URL.
- **Core Web Vitals not regressed against the pre-change baseline** — the brief says to measure before starting, but the site was never live/deployed at any point I had access to it, so there's no baseline to compare against. Worth measuring both this branch and current production once both are reachable.

My suggestion: push `geo-brief` to a Netlify preview URL (or merge to `main` if you're comfortable), then I can run all three remotely and report back before you treat this as fully validated.

## Decisions needed

- **Training crawlers in robots.txt** (Phase 1): I defaulted to allowing GPTBot, ClaudeBot, Google-Extended, Applebot-Extended and CCBot per the brief's instruction, but this is explicitly your call. See the tradeoff written out in CHANGES.md. Say the word if you'd rather block any of them.
- **llms.txt** (flagged in AUDIT.md, not actioned): one already exists at the repo root from before this brief. My recommendation is to leave it as-is rather than remove or expand it. Let me know if you'd rather it went.
- **Rich Results / Schema.org validation** (Phase 2): I validated all 51 rebuilt JSON-LD blocks as well-formed JSON with the expected `@type`s present, but haven't been able to run them through Google's actual Rich Results Test or the Schema.org validator since the site isn't deployed anywhere I can point those tools at. Worth doing once this branch is on a Netlify preview URL, before merging.

## Missing facts I declined to invent

- **Person `sameAs` links** (Phase 2, still open after Phase 7): the brief asked for kiranmorjaria.com and any BBC/TEDx/Channel 5 profile URLs in the Person node's `sameAs`. Phase 7 added the *names* of these credentials in prose on the new `/about/` page (on your direct authority from the brief text), but `sameAs` specifically needs real URLs, and none exist anywhere in the repo, only logo images and now prose mentions. Still just YouTube/Instagram/TikTok in `sameAs`. If you can give me the actual URLs (kiranmorjaria.com if it's live, a BBC profile page, a TEDx talk link, anything on Channel 5), I'll add them, and it's genuinely one of the higher-value additions in the whole brief per the brief's own framing.
- **VideoObject `uploadDate`** (Phase 2): set to each post's `datePublished` as a stand-in for the real YouTube upload date, which isn't recorded anywhere on the site. Likely accurate but unverified — flagging rather than asserting it as fact. If you want it exact, either confirm it's fine as-is or I can pull real upload dates via the YouTube API if you'd like me to set that up.
- **VideoObject `duration`**: omitted entirely across all 50 posts, no source for it anywhere in the repo.
- **BreadcrumbList depth**: currently Home / Blog / [post] on every post. Once Phase 3 ships the destination hub pages, these need a fourth level inserted (Home / [Destination] / Blog / [post], or however you'd prefer the hierarchy read) — noting it now so it doesn't get missed.

## Hub page Quick Facts gaps (Phase 3, partially resolved below)

- **Best time to visit:** still missing for Colombia, Peru, Guatemala (only have a narrow Acatenango-specific dry/wet note, not a whole-country one), Japan, Nepal, because no existing post states one. Have it for Bolivia (Uyuni dry/wet season) and Patagonia (Puerto Natales' flight window).
- **Suggested trip length:** still missing as an overall figure for Peru, Bolivia, Japan (beyond Tokyo's 5 days), Nepal, for the same reason. Have it for Colombia (2-4 weeks) and Guatemala (7/10/14 days); Peru and Patagonia have component lengths (e.g. '4 days for the Salkantay Trek') rather than a single trip-length figure.
- **Currency and Language:** resolved on your instruction (see below) — every hub now has both, cross-referenced online rather than sourced from a post.
- **Daily budget:** resolved on your instruction (see below) — every hub now has an estimated daily budget, researched online rather than sourced from Kiran's own posts.

### Currency, language and daily budget — sourced externally, on your instruction

You asked me to add these and research them online, overriding the earlier default (documented above and originally confirmed with you) of leaving ungrounded facts out. These are **not** sourced from Kiran's own blog posts the way every other hub fact is — they're my read of published third-party travel-cost sites (Nomadic Matt, Budget Your Trip, and similar), cross-referenced across 3-4 sources per destination and rounded to a sensible range. Treat them as general research, not as what Kiran personally spent:

- Colombia: Spanish · Colombian peso (COP) · $35-50/day
- Peru: Spanish · Peruvian sol (PEN) · $50-80/day
- Guatemala: Spanish · Guatemalan quetzal (GTQ) · $25-40/day
- Patagonia (Chile): Spanish · Chilean peso (CLP) · $60-80/day within Torres del Paine specifically (broader Chile/Patagonia estimates run higher)
- Bolivia: Spanish · Bolivian boliviano (BOB) · $30-50/day
- Japan: Japanese · Japanese yen (JPY) · $60-100/day
- Nepal: Nepali · Nepalese rupee (NPR) · $20-35/day, scoped to Kathmandu since that's all the hub currently covers

Worth a periodic re-check since travel costs drift — these reflect August 2026 search results.

## Nepal hub is thin (Phase 3)

Only Kathmandu is covered by existing posts (2 of them). The homepage's own About section mentions the Everest Base Camp trek happened, but there's no blog post for it, so the Nepal hub can't link to or describe it. Worth prioritising an EBC write-up if Nepal is meant to be a fuller hub eventually.

## Missing video transcripts (Phase 6)

Every one of the 50 videos needs a real transcript from you — I have no access to actual captions, and per the brief I have not auto-generated any from a model. What's live now on every post is a 150-250 word written summary of the video's content (labelled 'Video summary', not 'Transcript', so it's not misrepresented), grounded in what each post's own text already describes. Swap these for real transcripts whenever you have them; the summaries are a genuine stopgap, not a substitute.

The 50 videos, in one list for reference:

Colombia: 12-hours-in-bogota, cartagena-food-crawl, cartagena-salsa-lessons-and-door-knockers, cartagena-street-art-and-wildlife, colombia-2-3-4-week-itinerary, medellin-hummingbird-murals-and-bulletproof-walls, medellin-three-days-and-a-guide-called-miguel, minca-a-guide-named-richard-who-talks-to-birds, salento-coffee-country-guide, salento-two-day-vlog, tayrona-hostel-that-feels-like-fiji, tayrona-national-park-guide

Peru: cusco-in-3-days, hiking-the-salkantay-trek, machu-picchu-everything-you-need-to-know, rainbow-mountain-clouds, salkantay-trek-things-to-know, silent-hiking-salkantay-to-machu-picchu, we-made-it-to-machu-picchu

Guatemala: acatenango-fuego-smoking-and-the-best-sunset-yet, acatenango-weak-ankles-and-what-i-wish-id-known, antigua-chocolate-anthem-and-a-volcano-view, antigua-top-things-to-do, free-cerveza-hostel-and-a-tiny-scorpion, guatemala-erupting-volcanoes-and-a-bee-that-bites, guatemala-itinerary-7-10-or-14-days, lake-atitlan-one-lake-five-different-towns, san-pedro-horseback-and-a-4am-sunrise-hike, san-pedro-san-juan-top-things-to-do, semuc-champey-butts-up-and-the-prettiest-water, tikal-howler-monkeys-and-a-lost-mayan-city

Patagonia: w-trek-day-1-edge-of-the-world, w-trek-day-2-los-cuernos, w-trek-day-3-french-valley, w-trek-day-4-grey-glacier, w-trek-four-days-patagonia, w-trek-silent-hiking-patagonia, w-trek-things-to-know

Bolivia: atacama-to-uyuni-road-trip, sunrise-uyuni-salt-flats-mirror, uyuni-salt-flats-things-to-know, salt-hotel-bolivia, la-paz-travel-guide

Japan: 5-days-in-tokyo-itinerary, tokyo-travel-guide-20-things, tokyo-vegetarian-food-guide, mount-fuji-viewpoints-kawaguchiko, japanese-grand-prix-suzuka-first-f1-race

Nepal: kathmandu-haircut-and-momos-24-hours, kathmandu-top-things-to-do

## Chapter lists (Phase 6)

Handled differently to transcripts: rather than skip this or guess, I checked all 50 videos live on YouTube (via their real `ytInitialData` chapter markers, not the video content itself) and pulled genuine chapter data where it exists. 40 of the 50 have real YouTube chapters and now show them on the post, each one a link straight to that timestamp on YouTube. The other 10 don't have chapters set on YouTube at all, so nothing was added for them (no fabricated chapter markers): 12-hours-in-bogota, cartagena-salsa-lessons-and-door-knockers, minca-a-guide-named-richard-who-talks-to-birds, silent-hiking-salkantay-to-machu-picchu, w-trek-day-1-edge-of-the-world, w-trek-day-2-los-cuernos, w-trek-day-3-french-valley, w-trek-day-4-grey-glacier, w-trek-silent-hiking-patagonia, w-trek-things-to-know. If you add chapters to any of those on YouTube later, let me know and I'll pull them in.
