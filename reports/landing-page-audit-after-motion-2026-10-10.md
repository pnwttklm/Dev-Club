# Landing page audit after motion — 2026-10-10

## Implementation integrity verdict

**Pass.** The landing page preserves Dev Club's Poppins typography, illustration assets, black team cards, role colors, factual copy, room IT210, contact/map destinations, and light canvas. GSAP enhances the existing headings and articles rather than duplicating content. The approved spec and implementation plan are in `docs/superpowers/specs/2026-10-10-landing-page-motion-design.md` and `docs/superpowers/plans/2026-10-10-landing-page-motion.md`.

The local Impeccable detector returned **zero primary findings and two advisories**: 14px motion-control text and the 1.5rem mobile section heading. Both are intentional, documented variants in DESIGN.md; the control retains a minimum 44px hit area. These are extractor limitations, not verified UI defects. DESIGN.md and its reference sidecar were refreshed with the current typography, responsive grids, role foregrounds, and motion alternatives.

## Audit health score

| Dimension | Before | After | Evidence |
|---|---:|---:|---|
| Accessibility | 3 | 4 | Keyboard rings meet 3:1; readable single headings; pause and live OS preference support; axe reports no violations on 320, 390 and 1440px profiles. |
| Performance | 2 | 3 | First Load JS falls from 492kB to 189,546 bytes; only two font files download; bounded transform/opacity effects. One desktop frame outlier remains in the measurement. |
| Theming | 4 | 4 | Existing role tokens, shared blue focus token and intentional light-only presentation remain coherent. |
| Responsive design | 3 | 4 | Nine profiles, including 320px and short screens, show no overflow or targets below 44px; synthesized native touch scrolling works. |
| Implementation integrity | 3 | 4 | All five baseline findings addressed; design references match the implementation; detector advisories verified in context. |
| **Total** | **15/20** | **19/20** | **Excellent** |

This is an engineering audit score, not WCAG certification or a guarantee of performance on every device. No verified P0/P1/P2/P3 product defect remains from this audit. The desktop trace outlier is disclosed below as a performance limit.

## Baseline findings resolved

| Finding | Resolution and verification |
|---|---|
| FAQ keyboard outline was 2.56:1 | Explicit 2px `role.mobile` outline with 4px offset replaces the gray ring. Blue has approximately 4.66:1 contrast on white and over 3:1 on FAQ gray. The same semantic ring fixes navigation/button recipes; explicit location-link focus styling avoids a low-contrast animated outline transition. |
| Mobile anchor headings covered by navigation | Mobile navigation opens as an overlay. Destination geometry uses the settled nav height plus 16px, refreshes pins before measuring and preserves normal href/history behavior. Tests exercise all section links at 320/390px, direct hashes, history, pinned navigation and route remounts. |
| Nine Poppins preloads | Homepage preloads and downloads exactly two Latin faces, weights 400/500, totaling 15,640 font-body bytes versus the baseline 72,832 bytes. Document-only declarations live in a separate module with 400/500/600/700 and no preload, avoiding duplicate homepage downloads while retaining a real semibold face on documents. |
| Unused Chakra widget bundle | Next's documented `optimizePackageImports` setting for `@chakra-ui/react` preserves supported public imports. Homepage-loaded chunks contain none of the inspected unused Combobox, DatePicker, Slider, Dialog, Menu or Tooltip runtime markers. |
| Design-reference drift | Current hero clamp/line height, nav spacing, responsive benefit/team grids, role foregrounds, factual location content and motion states are recorded in DESIGN.md and `.impeccable/design.json`. Non-rendered components were removed from the reference inventory. |

The first visual pass exposed taller mobile deck copy leaking around a shorter active face. A failing hit-testing regression reproduced it; inactive faces now expose only their deck edges until the overview transition. Text remains in the original DOM and cleanup restores the complete reading layout. Confirmation screenshots show no leaking copy.

## Motion and accessibility verification

- Lenis uses one GSAP ticker, wheel interpolation of 0.1 and native touch scrolling. ScrollTrigger and React contexts clean up on route changes. Anchors retain hrefs, modified-click behavior, target focus, initial hashes and browser history.
- Hero typing preserves full character geometry and immediately exposes one complete accessible heading. Its persistent `_` cursor stops blinking offscreen, in a genuinely minimized Chrome window, when paused, and with reduced motion. Geometry checks at 320, 390 and 1280px allow at most 1px displacement.
- Benefits use desktop pinned illustration emphasis, a short mobile deck, then the native one/two/three-column grid. Short screens and enlarged text retain ordinary reading flow. Preference changes remove pin spacing while preserving the section in view.
- Teams reveal over 0.45s with 0.08s stagger and at most 24px translation. Existing role colors drive bounded hover glows; coarse-pointer center selection highlights at most one card. Completed entrances are remembered during the session.
- Pause persists in session storage; the OS reduced-motion preference takes priority. Without JavaScript, all heading, benefit, team and link content remains readable.
- axe found no violations in the three audited profiles. Color-contrast checks involving overlapping/illustrated content returned incomplete results; manual token/foreground verification complements them. Large team labels retain at least 3:1 contrast, ordinary black/white copy is high contrast, and keyboard-ring regression checks cover navigation, preferences, location, FAQ and footer.

## Production and performance evidence

The final `npm run test:e2e` closure passed **53/53 tests in 2.3 minutes**, including the new deck overlap regression, all existing site/document tests and all motion regressions. Its web server ran a fresh `npm run build`, which compiled, type-checked and generated all 18 routes. `npm run lint` and `npx tsc --noEmit` also passed. The earlier 52/52 production acceptance and focused red/green checks are retained as supporting evidence.

| Payload measure | Before | After |
|---|---:|---:|
| Next First Load JS | 492kB | 189,546 bytes (about 61.5% smaller) |
| Route JS portion | — | 58,249 bytes |
| Homepage-observed JS response bodies, gzip | About 551kB transferred | 249,534 bytes gzip; 253,765 bytes transferred including response overhead |
| Homepage font body bytes | 72,832 | 15,640 (about 78.5% smaller) |
| Homepage font preloads/downloads | 9 preloads | 2 preloads, 2 downloads |

First Load JS uses Next's `getJsPageSizeInKb` calculation, matching its build-table concept; observed browser network totals include additional loaded application/error chunks and use a different scope. They should not be treated as the same metric.

Warmed production scrolling was measured in Chrome with fonts and images loaded:

| Input | Frames sampled | Median | p95 | Maximum | Intervals >32ms | Observed long tasks |
|---|---:|---:|---:|---:|---:|---|
| Native synthesized touch, 390px | 212 | 16.7ms | 16.7ms | 16.8ms | 0 | None |
| Desktop wheel, 1280px | 142 | 16.7ms | 16.7ms | 50ms | 1 | One 53ms task |

The desktop trace includes a 53ms Chromium compositor scheduling task (`ScheduledActionSendBeginMainFrame`). The first pass also had one 50ms frame but no long-task entry. The bounded sample supports smooth normal scrolling, but **does not establish literal zero jank**. No repeated layout thrashing or unbounded blur/shadow animation was found. Physical touch devices, other browser engines and constrained hardware remain unmeasured.

## Evidence and repeatability

- Baseline raw results: `/tmp/dev-club-audit-2026-10-10/results.json` and `confirm.json`. The former historical report is absent from the current checkout; it was not recreated or changed.
- Current detector findings: `/tmp/dev-club-motion-audit-2026-10-10/detector.json`.
- Final production audit: `/tmp/dev-club-motion-audit-2026-10-10/confirmation/results.json` and `bundle-final.json` in its parent directory.
- Desktop/mobile hero, three benefit phases, restored overview, team glow, short-view and 320px reduced-motion screenshots are in the confirmation directory. `confirmed-scenes.jpg` and `static-strips.jpg` collect the inspected captures.
- Frame traces: `confirmation/scroll-1280-trace.json` and `confirmation/scroll-390-trace.json` under the same evidence directory.
- Regression coverage: `tests/e2e/landing-motion.spec.ts`, its shared helper and existing `tests/e2e/site.spec.ts`. Tests/design references remain local under the repository's existing ignore policy; task-owned product files and this report are committed explicitly.

Maintain the static alternatives, scoped lifecycle cleanup, real font faces and role tokens. Future hardware/browser verification should reproduce the warmed scroll scenarios before making stronger performance claims. No additional Impeccable fix command is recommended from this audit.
