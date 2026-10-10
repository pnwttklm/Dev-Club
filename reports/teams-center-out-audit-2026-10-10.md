# Teams center-out motion — Impeccable audit and verification

Audit date: 2026-10-10. Final product source: `d6776d2`, compared with `689972e`, on `feat/enhance-landing`; choreography commit `70698ae` plus the independent review fixes. This supplements [the full-card deck audit](teams-deck-audit-2026-10-10.md), preserving the previous findings and evidence.

## Result

**19/20 — Excellent, preserved.** The Teams heading now belongs to the pinned scene. The full-card deck starts in the horizontal center, with the heading/card composition vertically centered in the usable viewport below navigation. Desktop cards deal alternately left and right into their original five grid slots. Mobile retains a short vertical deal. Exposed faces retain complete, readable copy.

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 4/4 | Instant ordinary grid on Pause/reduction; JavaScript-disabled reading; shared keyboard rings meet 3:1; visible controls at least 44×44px; zero axe violations in five profiles. |
| Performance | 3/4 | Cached scroll geometry, transform/opacity motion, no new imports/dependencies; two font preloads. Desktop has one measured 33.2ms interval. |
| Theming | 4/4 | Existing role colors and glows; opaque token-based scene and card surfaces prevent rear copy showing through. |
| Responsive design | 4/4 | No horizontal overflow at 320/390/768/1024/1536px; fitting one-column/five-column motion, safe static alternatives for other layouts, short screens and enlarged text. |
| Implementation integrity | 4/4 | Full semantic cards move once; pinned heading remains visible; deterministic face ownership, reverse scrubbing, refits and route cleanup. |
| **Total** | **19/20** | Previous score retained. |

No verified product defect remains from this refinement. This audit is an engineering assessment, not WCAG certification or a promise of identical frame timing on all devices. The earlier isolated hydration recovery remains an unattributed diagnostic uncertainty, described below.

## Pin handoff and viewport preservation

A browser regression reproduced a **994px shift** of the Teams pin after Why Us recreated its trigger. The resulting Teams start also overlapped Why Us's end. Global refresh had measured the downstream scene before rebuilding the upstream pin spacing. Explicit refresh priorities now sort Why Us before Teams. The acceptance test repeats an upstream refit and verifies the Teams start remains stable within 2px and after the Why Us end.

Teams uses an opaque viewport stage beginning at navigation height plus 16px. Measured top padding centers the heading, 40px grid gap, tallest card and 12px deck depth. The complete scene remains behind its cards, so an adjacent pinned section cannot paint through the stage. The heading belongs to the same pinned root and stays fixed through the deal and settled hold. The original final grid remains in normal document flow after unpinning.

An additional regression exposed a **618.4px reading shift on Pause**. Viewport restoration wrote the correct position, but a queued ScrollTrigger refresh subsequently restored its stale cached position. Initial synchronization preserved that mobile paragraph within **0.42px**, but independent review found two additional desktop paths that required a coordinated fix.

Preservation now retains the first reading anchor across simultaneous upstream/downstream refits and restores it once per frame. Before computing its final pose, the provider finishes the pin refresh. After the native restoration, it sets [GSAP's public scroll function](https://github.com/greensock/GSAP/blob/master/types/scroll-trigger.d.ts), synchronizes Lenis and updates ScrollTrigger. This avoids stale recorded refresh positions after media reversion, conflicting restoration callbacks, private GSAP fields and GSAP imports in shared navigation.

## Choreography and readability

- Desktop starts at the central grid slot. The outer left card deals first, then outer right, inner left, inner right, and the center card settles. These paths never cross an already exposed settled face. The DOM and final visual grid order remain unchanged.
- Mobile starts in the centered first column slot and deals farthest destinations first. Every card travels vertically, with no x translation. Destinations below the fold remain normal scrolling content rather than a clipped animation window.
- Five equal deal segments occupy the first 90% of the scene, followed by a 10% settled hold. Pin travel is **0.8 viewport height on mobile** and **1.0 viewport height on eligible desktop**. Scrubbing is immediate; no snapping or delayed catch-up is added.
- Articles remain at scale 1, rotation 0 and opacity 1. They animate only x/y. Face content fades gently from **0.9 to 1** over an opaque card surface, retaining text contrast and preventing rear copy bleed. Pending cards show full opaque decorative backs; only moving and settled faces expose their copy.
- Browser assertions inspect real text-line ranges, card boundaries and paint hit points. Exposed copy remains unclipped and unobscured throughout sampled forward/reverse motion, every deal boundary and rapid jumps. Contrast checks use composited fading colors: large headings remain at least 3:1 and body text at least 4.5:1.
- Two/three-column layouts, insufficient viewport height, 200% root text size, oversized copy and setup failure use the ordinary grid. Resize/copy/image growth rebuild safely. Pause and live OS reduction remove pins, backs, transforms, fading and stage padding immediately, preserving the reading position.
- Role glow behavior remains available on hover/focus. Coarse pointers select at most one visible exposed face nearest viewport center, including cards after unpinning.

## Verification

| Gate | Final result |
|---|---|
| `npm run lint` | Passed |
| `npx tsc --noEmit` | Passed |
| `LANDING_MOTION_TEST=1 npm run test:e2e -- --trace off` | **79/79 passed**, fresh production build/server, 2.5 minutes |
| `npm run build` via that production E2E server | Passed before the suite; production app served successfully |
| axe WCAG A/AA and best-practice profiles | Zero violations at 320/390/768/1024/1536px |
| Responsive audit | Zero horizontal overflow; no visible interactive target below 44×44px in those profiles |
| Impeccable source detector | Zero primary findings; two retained typography advisories |

The eight added center-out cases cover centered composition/heading at three widths, alternating deal/fade, upstream refit stability, rapid reverse transitions, live desktop reduction and short-viewport reading continuity. The existing sixteen full-card cases retain copy collision, short pin, settlement, Pause/reduction, text/viewport/copy growth, client routing, setup failure, no-JavaScript, touch/history and static-layout coverage. Existing landing motion and site checks also pass.

The detector's two advisories concern existing 14px motion-control text and the 1.5rem mobile section heading. These intentional variants were assessed in the previous audit and remain readable with sufficient control size. No new primary Impeccable finding was introduced.

Tests run in the existing isolated `.next-motion` output using `LANDING_MOTION_TEST=1`. Traces were disabled after an earlier run exhausted temporary disk space during context teardown; assertions and the full suite were retained. Tests/design references remain local under the user's existing ignore policy, with copies in the evidence archive. No ignore rule was changed by this work.

## Performance

Fresh warmed Chrome measurements loaded fonts/images before recording:

| Input | Frames | Median | p95 | Maximum | Intervals >32ms | JS long tasks |
|---|---:|---:|---:|---:|---:|---|
| Desktop wheel, 1536px | 136 | 16.7ms | 16.7ms | 33.2ms | 1 | None |
| Native synthesized touch, 390px | 183 | 16.7ms | 16.8ms | 16.8ms | 0 | None |

Desktop Layout events total **0.974ms**, maximum **0.093ms**; touch Layout events total **1.256ms**, maximum **0.155ms**. No repeated expensive layout pattern was identified. This supports responsive scrolling on the measured machine, without claiming universal zero jank. Physical touch hardware, other engines and constrained devices remain unmeasured.

Next's actual First Load JS calculation is **190,455 bytes**, compared with **190,226 bytes** before this refinement: **+229 bytes / +0.12%**. Route JS is **59,158 bytes**. There are no new package, lockfile or heavy plugin imports. The existing Chakra import optimization and two Poppins 400/500 font preloads remain intact.

## Diagnostic uncertainty

The first production attempt recorded one existing minified React `#418` HTML hydration recovery in the cold FAQ test. Six development loads, a fresh production FAQ check, the next full run and the audit confirmation were clean. The final source passes all 79 tests, including the hydration/runtime checks. No changed source line was established as the warning's cause, and no speculative hydration patch was made. The clean current gates do not prove every possible hydration race absent.

## Independent review

One independent `gpt-6.1-sol/high` reviewer inspected `689972e..70698ae`, source, tests, screenshots, audit/performance evidence and targeted production behavior. The requested `gpt-6-astra` model hit a usage limit before reviewing any code, so the available model performed the sole actual review.

The reviewer found two **Important** reading-position failures, with no Critical or Minor issues:

1. Live reduced motion at desktop progress 0.45 moved the exposed Frontend Web paragraph by **470.5px**, underneath navigation. A queued refresh overwrote the correct restoration with the old recorded scroll position.
2. Resizing 1536×1000 to 1536×880 moved that paragraph by **391px**, below the new viewport, when the deck became static. Instrumentation showed two preservation callbacks restoring different poses in the same frame.

Both findings reproduced with and without warmed images. Two new acceptance tests reproduced the exact failures against the reviewed production source. The coordinated restoration fix described above makes both tests pass, keeping the exposed paragraph within 1px. The fresh **79/79 production suite** verifies this fix pass; no second review is substituted for the RED→GREEN evidence. No Critical/Important finding remains open.

The reviewer excluded the user-owned `.gitignore` change. **Ruling:** preserve that existing edit untouched, consistent with the authorized scope and reviewed commit range. If this ruling is wrong, that ignore-policy change remains outside the product review. Deferred review minors: **none**.

## Evidence and handoff

Evidence lives at `/tmp/dev-club-teams-center-2026-10-10/`: `review-suite-final.log`, `review-red.log`, `review-green.log`, lint/type logs, `results.json`, `results-stage.json`, `audit-reviewed-final.log`, Chrome traces, `layout-final.json`, `bundle-final.json`, `detector-final.json`, visual captures and the earlier RED/GREEN diagnostic logs. The scripts require the production app on localhost:3101 and installed Chrome. `verification/` retains the task record, tests and review before scratch cleanup.

The user selected keeping the branch as-is. `feat/enhance-landing` and the working checkout remain preserved, without merge/push. The pre-existing `.gitignore` edit is untouched.
