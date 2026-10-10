# Full-card Teams deck — Impeccable audit and verification

Audit date: 2026-10-10. Production source: `9f834a6` on `feat/enhance-landing`, compared with `f90529a`. This report supplements the previous landing-page audit without replacing its history. The approved full-card plan is available locally at `docs/superpowers/plans/2026-10-10-teams-readable-deck.md`.

## Implementation integrity verdict

**Pass.** Five existing semantic team articles, including every heading, description and Tools line, form the deck and translate into their original grid slots. Each article occurs once. Pending cards show opaque, decorative, `aria-hidden` backs; exposed moving and settled faces retain complete copy. Role colors, artwork, source wording and the existing one/two/three/five-column grid remain coherent with Dev Club's design.

The installed Impeccable 4.5.1 detector returned **zero primary findings** and two typography advisories: the existing 14px motion control and 1.5rem mobile section heading. Both are intentional documented variants, with readable text and a 44px control target. These are reference-extraction limitations rather than verified interface defects.

## Audit health

| Dimension | Score | Verified evidence |
|---|---:|---|
| Accessibility | 4/4 | Static alternatives for Pause, live OS reduction and JavaScript disabled; original semantic copy remains present once; shared keyboard rings meet 3:1; no axe violations in five profiles. |
| Performance | 3/4 | Translation-only card motion, cached scroll geometry, scoped cleanup, no new plugin/dependency; two font preloads. Desktop retains a single measured frame outlier. |
| Theming | 4/4 | Opaque backs use the existing background token; borders/glows use the existing team role tokens and foregrounds. The site's intentional light presentation remains consistent. |
| Responsive design | 4/4 | No overflow or visible interactive targets below 44px at 320/390/768/1024/1536px. Native synthesized touch works. Short screens, enlarged text and multirow grids preserve natural reading. |
| Implementation integrity | 4/4 | Full articles move, exposed paths remain clear, deterministic reverse scrubbing, factual copy preserved, detector findings checked in context. |
| **Total** | **19/20 — Excellent** | Previous score preserved after the new full-card motion. |

No verified P0/P1/P2/P3 product defect was found in the completed audit. This is an engineering assessment, not WCAG certification or a guarantee of performance on all hardware. The initial, unreproduced hydration warning described below remains a diagnostic uncertainty.

## Choreography and readable copy

- On one column, the deck starts in the first slot and deals Quality Assurance, Design & Art, Backend, Frontend App, then Frontend Web. Dealing to the farthest slot first keeps each exposed moving face above already settled faces. Final DOM order stays unchanged.
- On the complete five-column desktop row, the origin is the rightmost slot and cards deal left to right in DOM order. Subsequent paths stay to the right of settled faces.
- Five equal deal segments occupy the first 90% of progress, followed by a 10% settled hold. Scrubbing is immediate and linear, with no snap or delayed catch-up. Cards animate only `x` and `y`; scale remains 1, rotation 0, opacity 1. Three-pixel depth offsets disappear during each translation.
- Extra pin travel is **0.8 viewport height on mobile** and **1.0 viewport height on the eligible desktop row**. Normal mobile reading still requires scrolling through the five final cards. Dealt destinations below the fold are natural viewport boundaries, rather than CSS clipping.
- A measured common minimum height covers the tallest card and remains through unpinning. Mobile illustration height is 120px, retaining full body type and 24px padding; wider screens retain 200px artwork. Opaque pending backs cover the complete face without text tails.
- Two/three-column intermediate layouts, short screens, 200% root text size, oversized copy and failed setup render the ordinary static grid. Pause and OS reduction remove the Teams pin/backs/transforms and preserve the exposed reading position. Resize, image/copy growth and client-route teardown rebuild or clean up safely.
- Existing role glows remain bounded opacity effects. Coarse pointers highlight at most one visible exposed card nearest the viewport center, including the last card after the deck unpins.

Real browser tests inspect text-line DOM Ranges, card bounds and visible line hit points, so another face painting over copy is a failure. They sample forward/reverse progress, every face boundary, 51 evenly spaced positions, and rapid jumps at 320, 390 and 1536px. Copy remains unchanged throughout; all exposed cards remain disjoint and their text is unclipped. Batched captures confirm crisp type on exposed faces. All five static articles remain readable with longer injected copy, enlarged text and JavaScript disabled.

## Retained landing-page audit fixes

The previous FAQ/navigation focus-ring corrections still pass the minimum 3:1 checks, and the visible controls retain 44px targets. Mobile section links, direct hashes and history retain settled sticky-nav clearance, including navigation during a partial deck. The homepage still preloads only Poppins 400/500: all five confirmation profiles retained **two font preload links**. Next's existing `optimizePackageImports: ['@chakra-ui/react']` remains enabled; this feature adds no dependency or heavy plugin import.

## Fresh verification

| Gate | Result |
|---|---|
| `npm run lint` | Passed, exit 0 |
| `npx tsc --noEmit` | Passed, exit 0 |
| `npm run test:e2e` | **71/71 passed**, production build/server, 2.5 minutes |
| `npm run build` | Passed independently after the E2E run; all 18 routes generated |
| axe WCAG A/AA and best-practice scan | Zero violations at 320/390/768/1024/1536px |
| Overflow / visible touch targets | Zero horizontal overflow; no visible target below 44×44px in those profiles |

The 16 new Teams cases cover collision-free faces, short pin/exact settlement, persisted Pause, live reduction, viewport/text changes, oversized copy, genuine client routing, injected measurement failure, JavaScript disabled, touch/anchor history and unsafe layouts. Existing site and landing-motion tests also pass. Contrast checks supplement axe's incomplete illustrated/overlapping-content results.

The author observed failing regressions before implementation: absent deck state, a 586.7px reading shift on Pause, resize collisions, stale motion after copy growth, and missing center emphasis on the last card. The final source resolves those failures. Tests and design references remain local under the existing ignore policy; they were not force-added.

## Performance and payload

Next's actual First Load JS calculation reports **190,226 bytes**, compared with the previous **189,549 bytes**: **+677 bytes / +0.36%**. Route JS is 58,929 bytes. This preserves the earlier approximately 61% reduction from the original 492kB build. No package manifest, lockfile, shared GSAP import module or Lenis configuration changes were needed.

Warmed Chrome samples loaded fonts/images before recording:

| Input | Frames | Median | p95 | Maximum | Intervals >32ms | Observed JS long tasks |
|---|---:|---:|---:|---:|---:|---|
| Desktop wheel, 1536px | 136 | 16.7ms | 16.7ms | 33.4ms | 1 | None |
| Native synthesized touch, 390px | 182 | 16.7ms | 16.7ms | 16.8ms | 0 | None |

The first desktop sample also had one 33.3ms frame; touch again had no interval above 32ms. The confirmation trace contains one 41.2ms Chromium `ThreadControllerImpl::RunTask`, without a corresponding JavaScript long-task entry. Across the sample, desktop Layout events total 0.92ms (maximum 0.185ms); touch Layout events total 1.272ms (maximum 0.158ms). No repeated expensive layout pattern or unbounded effect was identified. These measurements support responsive normal scrolling, **not literal universal zero jank**. Physical touch devices, other engines and constrained hardware remain unmeasured.

## Hydration investigation

The first audit's initial 320px page recorded one minified React `#418` HTML hydration recovery and retained zero font preload links, despite downloading the two font files. Preserve this evidence; it was not silently discarded or called fixed.

The warning did not reproduce in **15 fresh executor loads** (five normal, five with font requests delayed 800ms, five with script requests delayed 400ms), **three independent reviewer loads**, or the subsequent **five-profile full audit confirmation**. Every executor investigation page had five real cards, deck mode, two retained preload links and no page error. The confirmation also had zero page errors and two font preloads throughout. Available evidence does not attribute the isolated warning to a changed source line; no speculative hydration patch was made. Its cause remains unknown, so this report claims clean confirmation samples rather than absence of all possible hydration races.

## Independent review

One fresh gpt-6-astra reviewer inspected the entire `f90529a..9f834a6` change, accepted plan, rulings, tests, source and screenshot contact sheet. It found **no Critical, Important or Minor issues**, with an empty Declined to judge list. No second review or fix pass was needed.

Its independent production probes verified Pause at progress 0/.18/.36/.54/.72/.8 preserves the exposed card within **0.34px**, modest copy growth retains five equal 521.5px faces with complete backs and one spacer, and oversized copy restores static content with zero backs/spacers and all transforms `none`. Its readiness verdict applied to the reviewed implementation and explicitly required reconciliation of the isolated audit warning; the investigation above fulfills that reporting checkpoint without claiming a demonstrated fix.

## Execution rulings and costs

1. Use the existing feature checkout in place, following the user's preserved-branch choice. This avoids unwanted branch/worktree changes; if wrong, implementation shares the user's checkout.
2. Include the existing 40px grid margin in the fit budget and establish flow roots. Browser probes showed changed margin collapse caused a 40px unpin jump; if overly conservative, some screens fall back to static earlier.
3. Extend viewport preservation to select an exposed Teams card. Section anchoring caused the demonstrated 586.7px reading shift; if the selection is wrong, a preference change may preserve the wrong reading anchor.
4. Use the whole E2E suite as Task 2 completion and Task 3's production regression gate. It includes every named focused test and avoids redundant builds; ambiguous gate attribution is the risk, addressed by retaining the exact full log.

Deferred review minors: **none for this change**. Earlier audit recommendations for genuine client-route coverage and injected enhancement failure now have Teams acceptance cases; this does not imply every other scene's failure modes were newly covered.

## Evidence and handoff

Raw audit, screenshots, hydration probes, detector output, bundle calculation and Chrome traces are at `/tmp/dev-club-teams-deck-2026-10-10/`. `results-first.json` preserves the initial warning; `results.json` and `audit.log` contain the confirmation. `hydration.cjs` and `hydration-results.json` reproduce the fresh-load investigation. The standalone browser scripts require the production app on localhost:3101 and the installed Chrome channel.

Execution logs, plan/briefs, review diff and the ledger are archived under that directory's `verification/` before task scratch cleanup. Repeat the production gates with `npm run lint`, `npx tsc --noEmit`, `npm run test:e2e`, and `npm run build`. The production E2E config rebuilds and serves on localhost:3100.

No additional Impeccable fix command is recommended from the verified findings. Retain static alternatives, deterministic face ownership and scoped cleanup when changing copy or breakpoints. Branch `feat/enhance-landing` and the working checkout are preserved without merge/push; the user's existing `.gitignore` edit is untouched.
