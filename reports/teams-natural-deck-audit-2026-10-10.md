# Teams natural-size deck — Impeccable audit and verification

2026-10-10 · Impeccable 4.5.1 · `feat/enhance-landing` · baseline `3f79019`. This report supersedes the sizing and eligibility decisions in the [Poker deck report](teams-poker-deck-audit-2026-10-10.md). The latest brief restores natural card dimensions and requires active motion in every responsive grid layout.

## Implementation integrity verdict

**Pass.** The same five semantic team articles form the stepped deck and settled grid. Original copy, illustrations, DOM order and responsive 1/2/3/5-column breakpoints remain. All card transforms are translation only. There are no Poker width/height constraints, scaleX/scaleY, inner counter-transforms, compact-fit/font-size guards, or one-row eligibility restriction.

Pending cards retain the decorative Dev Club mark (`/logo_ww.svg`), role name and role-accent token gradient. Cards that would cross a settled face keep their branded back below that face until clear; exposed reading copy never overlaps. Decorative backs remain hidden from assistive technology and disappear immediately in static mode.

The detector found **zero anti-patterns**. Its two advisory notes refer to existing 14px motion-control text and the 24px mobile section heading. Both are intentional variants already documented in DESIGN.md prose; the detector compares the narrower frontmatter type ramp. Neither is a new visual or accessibility defect.

## Audit result

**19/20 — Excellent, preserved.** No P0, P1 or P2 finding. One retained P3 performance-headroom finding.

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 4/4 | Zero axe violations in five profiles; opaque, unscaled text; static Pause/reduced-motion grid; keyboard and focus contrast regressions pass. |
| Performance | 3/4 | Translation/illustration-opacity motion, cached scroll geometry, no new heavy imports, two font preloads. One slower desktop interval and existing shared JS weight retain the deduction. |
| Theming | 4/4 | Inverse opaque surface and role-colored 2px borders; branded backs use existing role/background/foreground tokens. |
| Responsive design | 4/4 | Active natural-size deck at 320/390/768/1024/1536px including multirow grids; zero horizontal overflow; 200% text and short-screen activation; native touch and 44px targets checked. |
| Implementation integrity | 4/4 | Scale 1 throughout, stable layout through unpin, deterministic exposure gating, centered heading, clean reverse scrub and preference/route cleanup. |
| **Total** | **19/20** | **Excellent** |

## Final sizing and choreography

- Card size comes from the ordinary responsive grid. Equal CSS grid rows use the natural tallest content height; no animation-specific fixed height or width is written. Card scale remains exactly **1** in the initial stack, every deal pose, and the settled grid.
- Original **24px padding, 30px team labels, 20px body text, and 120px mobile / 200px larger-screen illustrations** are restored. Copy wraps naturally, remains opaque and has no clipping container. Card borders retain 16px corners and 2px role accents.
- Initial cards gather at the horizontal center with a **+12px X / -10px Y** step per depth on desktop and **+6px / -8px** on mobile. All five neon outlines cascade visibly. The heading stays inside the pinned scene below navigation.
- Cards deal bottom rows first, then outer columns toward the center. The five-column sequence is outer-left, outer-right, inner-left, inner-right, center. Mobile remains a clean vertical deal. Each card translates from its cached deck origin to **x=0, y=0**; illustration opacity alone moves from 0.9 to 1.
- Five equal 18% phases plus a 10% hold retain **0.85 viewport-height desktop / 0.68 mobile** pin travel. Scrubbing remains immediate, reversible and unsnapped.
- When the heading/deck frame fits, it centers vertically below navigation. Larger natural faces and enlarged text align below the nav instead of disabling the scene. A card taller than the physical viewport continues into normal scrolling content after the short pin; its text is never CSS-clipped or compressed to force a viewport fit.
- Pause/reduced motion immediately expose all five ordinary cards and remove pins, covers, stage padding and transforms. Resume rebuilds from current geometry. Setup failures also leave a usable static grid.

## Pin stability and overflow fixes

The existing upstream refresh priority and reading-anchor preservation remain. A production stress test exposed intermittent false Why Us re-pinning during rapid downstream reverse jumps. GSAP's velocity anticipation can change a completed upstream trigger from progress 1 to .9999, reactivating its pin before the actual scroll reaches it. Both scenes now use GSAP's default **anticipatePin: 0**; actual pin start/end, spacing, scrub and pacing are unchanged. The warmed rapid-reverse check passes in the full suite and **10/10 additional production repeats**.

The 320px, 200%-text check also found an existing footer acknowledgement link extending beyond the viewport. Footer links now allow wrapping within their available width. No factual copy or navigation behavior changed.

## Verification

| Gate | Result |
|---|---|
| `npm run lint` | Passed after final source/test edits |
| `npx tsc --noEmit` | Passed after final source edits |
| Fresh `npm run build` | Passed through the production E2E server command, isolated `.next-motion` output |
| `LANDING_MOTION_TEST=1 npm run test:e2e -- --trace off` | **86/86 passed** in one fresh production run, 3.5 minutes |
| Additional rapid-reverse collision stress | **10/10 passed**, same verified production build |
| Card scale/dimensions | Scale exactly 1; rendered dimensions unchanged through forward/reverse poses at all five widths |
| Layout shift through deal and unpin | **0 observed layout shift**, zero grid-height delta across 31 warmed scroll positions |
| axe WCAG A/AA and best-practice profiles | Zero violations at 320/390/768/1024/1536px |
| Layout/assets/runtime | Zero horizontal overflow, broken images, undersized visible targets or runtime errors in all five profiles |
| Impeccable detector | Zero primary findings; two documented existing type advisories |
| Independent read-only review | No blocking findings; reviewed natural motion, targeted test updates and final anticipation fix |

Seven natural-size cases replace seven superseded Poker-specific cases. Existing center/pin, collision, preference, resize/copy-growth, route cleanup, setup-failure, no-JavaScript, touch, history and shared landing checks remain. Older short-screen tests now scope static-flow requirements to Why Us while explicitly expecting Teams to reactivate; global zero-pin checks remain during Pause and reduced motion. The settled-hover test completes the deal before exercising real hover, retaining role color, opacity, noninteractive-card and contrast assertions.

One batched visual pass captured 12 poses at each of five widths, plus short-screen, 200%-text, Pause and reduced-motion states. Inspection covered natural sizing, layered outlines, branded backs, exposed copy and multirow destinations. No extra visual polish loop followed the inspection.

## Performance and remaining finding

**[P3] Performance headroom remains.** Location: landing runtime/browser rendering and shared client payload. Category: Performance. No per-scroll layout reads, varying blur/shadow animation, new animation package or permanent will-change was introduced. These Chrome samples show smooth pacing but cannot establish universal zero-jank behavior.

| Sample | Frames | Median | p95 | Maximum | Intervals >32ms | Long tasks |
|---|---:|---:|---:|---:|---:|---:|
| Desktop wheel | 128 | 16.7ms | 16.8ms | 33.4ms | 1 | None |
| Synthesized native touch | 182 | 16.7ms | 16.7ms | 16.8ms | 0 | None |

Whole-page JavaScript resources remain approximately **246KiB encoded / 817KiB decoded**. The existing shared client payload and isolated slower desktop interval justify retaining Performance at 3/4. Recommendation: profile rendering and payload on target devices in a separate `$impeccable optimize` pass, followed by `$impeccable polish` only for demonstrated fixes. Physical devices and Safari/Firefox were not independently measured.

## Evidence and workspace state

Evidence: `/tmp/dev-club-teams-natural-2026-10-10/` contains red/green and fresh production logs, ten-repeat stress output, axe/resources JSON, desktop/touch traces, screenshots, independent review and local tests/design records. Earlier runs are retained, including superseded test assumptions and the intermittent pin failure, rather than being presented as passing.

New motion tests and DESIGN.md remain local under the user's existing ignore policy; no force-add or ignore-rule change was made. Product changes and this report are committed on the existing branch. The user-owned `.gitignore` change and newer hero work are preserved. No merge, push or deployment was performed.
