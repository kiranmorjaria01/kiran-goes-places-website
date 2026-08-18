# TODO — needs your input

Running list across all phases. Phase 1 additions below; will grow as later phases surface gaps.

## Decisions needed

- **Training crawlers in robots.txt** (Phase 1): I defaulted to allowing GPTBot, ClaudeBot, Google-Extended, Applebot-Extended and CCBot per the brief's instruction, but this is explicitly your call. See the tradeoff written out in CHANGES.md. Say the word if you'd rather block any of them.
- **llms.txt** (flagged in AUDIT.md, not actioned): one already exists at the repo root from before this brief. My recommendation is to leave it as-is rather than remove or expand it. Let me know if you'd rather it went.
- **Rich Results / Schema.org validation** (Phase 2): I validated all 51 rebuilt JSON-LD blocks as well-formed JSON with the expected `@type`s present, but haven't been able to run them through Google's actual Rich Results Test or the Schema.org validator since the site isn't deployed anywhere I can point those tools at. Worth doing once this branch is on a Netlify preview URL, before merging.

## Missing facts I declined to invent

- **Person `sameAs` links** (Phase 2): the brief asked for kiranmorjaria.com and any BBC/TEDx/Channel 5 profile URLs in the Person node's `sameAs`. None of those exist as URLs anywhere in the repo, only as logo images or plain-text mentions, so I left them out rather than guess. If you can give me the actual URLs (kiranmorjaria.com if it's live, a BBC profile page, a TEDx talk link, anything on Channel 5), I'll add them, and it's genuinely one of the higher-value additions in the whole brief per the brief's own framing.
- **VideoObject `uploadDate`** (Phase 2): set to each post's `datePublished` as a stand-in for the real YouTube upload date, which isn't recorded anywhere on the site. Likely accurate but unverified — flagging rather than asserting it as fact. If you want it exact, either confirm it's fine as-is or I can pull real upload dates via the YouTube API if you'd like me to set that up.
- **VideoObject `duration`**: omitted entirely across all 50 posts, no source for it anywhere in the repo.
- **BreadcrumbList depth**: currently Home / Blog / [post] on every post. Once Phase 3 ships the destination hub pages, these need a fourth level inserted (Home / [Destination] / Blog / [post], or however you'd prefer the hierarchy read) — noting it now so it doesn't get missed.

## Hub page Quick Facts gaps (Phase 3)

Every field below was left out of its hub's Quick Facts block because no existing post states it, not because it was overlooked. If you can point me at (or write) a source for any of these, they're quick to add:

- **Best time to visit:** missing for Colombia, Peru, Guatemala (only have a narrow Acatenango-specific dry/wet note, not a whole-country one), Japan, Nepal. Have it for Bolivia (Uyuni dry/wet season) and Patagonia (Puerto Natales' flight window).
- **Suggested trip length:** missing as an overall figure for Peru, Bolivia, Japan (beyond Tokyo's 5 days), Nepal. Have it for Colombia (2-4 weeks) and Guatemala (7/10/14 days); Peru and Patagonia have component lengths (e.g. '4 days for the Salkantay Trek') rather than a single trip-length figure.
- **Currency:** missing for Bolivia (boliviano is never named in any Bolivia post, even though obviously correct), Patagonia/Chile, Nepal. Have it for Colombia, Peru, Guatemala, Japan (all literally named in the posts).
- **Rough daily budget:** missing on every hub. None of the 50 posts state a per-day budget figure, only scattered per-item or per-tour prices, so this field doesn't appear anywhere rather than being approximated from those.

## Nepal hub is thin (Phase 3)

Only Kathmandu is covered by existing posts (2 of them). The homepage's own About section mentions the Everest Base Camp trek happened, but there's no blog post for it, so the Nepal hub can't link to or describe it. Worth prioritising an EBC write-up if Nepal is meant to be a fuller hub eventually.

## Missing video transcripts (Phase 6, not started)

Not yet assessed — will list every video needing a real transcript once Phase 6 starts.
