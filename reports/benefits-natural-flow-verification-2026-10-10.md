# Why Us — centered natural flow and motion verification

2026-10-10 · `feat/enhance-landing` · baseline `b7beeb5` · Impeccable 4.5.1.

## Result

Benefits now uses an ordinary centered responsive grid with a quiet entrance. The deck/deal mechanic belongs exclusively to Teams. Existing benefit copy, illustrations, semantic articles, and 1/2/3-column breakpoints remain.

- The grid fills available width up to 80rem and centers with automatic inline margins. Cards cap at 24rem and center within their tracks.
- At two columns, the third card spans both tracks and centers at the same width as the first-row cards. This rule uses Chakra's `mdOnly` condition and `spacing.10` token, matching both the grid breakpoint and gap when text size changes.
- Removed Benefits pinning, scrub/deal timeline, stacked x/y offsets, scaling, rotation, clipping, geometry-fit guards, resize observer, and global matchMedia refresh.
- Cards enter individually when reached: a 16px rise, opacity 0.9–1, 0.5s expo.out entrance, and 0.08s sibling stagger. Content is visible by default and never held at zero opacity. Distant rows enter when reached naturally.
- Already revealed cards do not replay after Pause/Resume. Scoped GSAP contexts clean up batch callbacks, tweens and touch triggers; Pause/reduced motion immediately expose the normal layout with full opacity and no transform.
- Desktop hover retains the thin role-blue spotlight. Coarse input receives the same accent while a card passes the viewport-center region; these triggers do not pin or change layout.
- No Teams implementation file or shared scroll runtime changed. Teams still uses its natural-size deck and existing short pacing.

## Verification

| Gate | Result |
|---|---|
| Initial regression demonstration | Existing Benefits pin failed the new 390px/768px no-pin checks |
| Enlarged-tablet regression demonstration | Confirmed 20px orphan width mismatch before replacing fixed px gap with Chakra spacing token |
| Focused acceptance | 15/15 passed before final responsive-token correction |
| Final `npm run lint` | Passed |
| Final `npx tsc --noEmit` | Passed |
| Fresh `npm run build` | Passed through isolated production E2E server command |
| `LANDING_MOTION_TEST=1 npm run test:e2e -- --trace off` | **93/93 passed**, one fresh production run, 6.1 minutes |
| Independent read-only review | Responsive P2 fixed and verified; no important remaining findings |
| Impeccable detector | Zero primary findings; two retained documented type-ramp advisories |

Seven new Benefits cases cover centering at 390/768/1024/1536px, equal orphan width, real hover, native synthesized touch, preference fallbacks and 200% tablet text. Obsolete Benefits deck tests now enforce natural flow, complete copy, responsive columns, anchor navigation and static preferences. The downstream refit test measures the ordinary Benefits bottom instead of its removed pin end; reverse collision and reading-position assertions remain.

## Batched layout and accessibility audit

| Viewport width | Heading center | Grid center | Benefits pin | Horizontal overflow | Broken images | axe violations |
|---:|---:|---:|---|---:|---:|---:|
| 320 | 160 | 160 | None | 0px | 0 | 0 |
| 390 | 195 | 195 | None | 0px | 0 | 0 |
| 768 | 384 | 384 | None | 0px | 0 | 0 |
| 1024 | 512 | 512 | None | 0px | 0 | 0 |
| 1536 | 768 | 768 | None | 0px | 0 | 0 |

Visual inspection confirms centered mobile columns, a balanced two-column first row with the third card centered below, and an evenly centered desktop row. Copy stays left-aligned inside each centered card, preserving readability. Hover, Pause and reduced-motion captures also match the brief.

One batched visual pass and one confirmation were used. The audit helper initially omitted its performance function; it was corrected without changing the site. Final full-section captures temporarily hide navigation and skip-link overlays only during screenshot capture to avoid sticky-overlay artifacts in tall element screenshots. Overlays are restored before accessibility checks; source navigation and keyboard behavior remain subject to the full E2E suite.

## Impeccable health score

**19/20 — Excellent, preserved.** No P0/P1/P2 finding remains. The reviewer-found P2 responsive mismatch was fixed before the final production run.

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 4/4 | Zero axe violations, readable semantic copy, static preferences, retained keyboard/focus suite |
| Performance | 3/4 | Transform/opacity entrance only, no new imports or per-scroll custom layout reads; retained landing smoke sample has isolated desktop slowdown |
| Theming | 4/4 | Existing foreground/background/role tokens and Chakra responsive spacing |
| Responsive design | 4/4 | Exact group centering across five widths, equal tablet orphan sizing at 200% text, touch and overflow checks pass |
| Implementation integrity | 4/4 | Benefits ordinary flow and Teams-only deck, scoped cleanup, existing content preserved, zero detector findings |
| **Total** | **19/20** | **Excellent** |

The two detector advisories concern existing 14px motion-control text and 24px mobile section headings. Both are documented variants in DESIGN.md prose; no new type drift was introduced.

**[P3] Retained landing performance headroom.** A warmed whole-page scroll smoke test through Teams was retained to check downstream behavior. It does not attribute renderer costs to Benefits:

| Sample | Frames | Median | p95 | Maximum | Intervals >32ms | Long tasks |
|---|---:|---:|---:|---:|---:|---:|
| Desktop wheel | 144 | 16.7ms | 16.7ms | 50ms | 1 | One 59ms task |
| Synthesized native touch | 184 | 16.7ms | 16.8ms | 16.8ms | 0 | None |

Keep Performance at 3/4; these samples do not prove universal zero-jank rendering. A separate `$impeccable optimize` pass could investigate the isolated desktop task on target devices, followed by `$impeccable polish` for demonstrated fixes. Physical devices and Safari/Firefox were not independently measured.

## Evidence and workspace

Evidence: `/tmp/dev-club-benefits-flow-2026-10-10/` contains regression/focused/production logs, axe/layout JSON, final section captures, desktop/touch traces, independent review and local test/design records. Final validation used the corrected production source; the earlier run was stopped after the responsive review fix and is not presented as passing.

Product changes and this report are committed on the existing branch. The user's `.gitignore` change remains untouched. New motion tests and DESIGN.md retain their local ignored status; no force-add or ignore-rule changes were made. No push, merge or deployment occurred.
