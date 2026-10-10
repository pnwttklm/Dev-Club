# Teams Poker deck — Impeccable audit and verification

2026-10-10 · Impeccable 4.5.1 · `feat/enhance-landing` · implementation `1185d37`, scoped comparison `208d407..1185d37`. The newer hero cursor commit `208d407` was preserved. This report supplements the [previous Teams audit](teams-center-out-audit-2026-10-10.md).

## Implementation integrity verdict

**Pass.** The same five semantic team articles form the deck and the responsive grid. Existing illustrations, club identity, role colors and copy remain. Pending backs use the existing white Dev Club mark, a role-accent gradient and a team label, all decorative and hidden from assistive technology. There is no empty black back or duplicate accessible content. The final grid keeps its original DOM order and 1/2/3/5-column breakpoints.

The detector found **zero anti-patterns**. One retained advisory concerns the existing 14px Pause/Resume label; its control meets the 44px target requirement. The local design record documents the expressly requested 16px card radius and compact team typography, eliminating the new shape/type advisories. These are intentional design variants, not systemic drift.

## Result

**19/20 — Excellent, preserved.** No P0, P1 or P2 finding. One retained P3 performance-headroom finding is detailed below.

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 4/4 | Zero axe violations in five profiles; text stays opaque and proportionate; instant static grid on Pause/reduced motion; visible controls meet 44×44px; focus-ring checks pass. |
| Performance | 3/4 | Transform/opacity motion, cached counter-scale math, no new package imports; two font preloads. Isolated slower intervals and existing JS weight retain the performance deduction. |
| Theming | 4/4 | Opaque inverse surface and role borders; branded back gradient uses existing foreground/background/role tokens. |
| Responsive design | 4/4 | No overflow at 320/390/768/1024/1536px; compact 320px deck, readable ordinary flow for multirow/short/enlarged-text layouts; native synthesized touch and history checks pass. |
| Implementation integrity | 4/4 | Full-card sizing endpoints, deterministic face ownership, clean reverse scrubbing, centered pinned heading, upstream refresh and reading-anchor preservation. |
| **Total** | **19/20** | **Excellent** |

## Sizing and choreography

- Initial deck: approximately **280×392px**, with a **248×347px** compact variant at 320px. All five frames start together in a centered stepped stack: desktop +12px/-10px per depth, mobile +6px/-8px. The heading and initial deck frame remain vertically centered below navigation.
- Final grid: responsive column widths and **30rem minimum/natural card height**. At 390px, a 280×392 deck face becomes a 342×480 grid card. At 1536px, the five-column slot is approximately 237×480; its width follows the grid rather than remaining fixed at 280px. Initial Poker dimensions never constrain the settled layout.
- Frames animate x/y and separate horizontal/vertical scale. Face and back-emblem counter-transforms keep their combined scale uniform at every pose, avoiding stretched text or logos. Body text remains fully opaque, with no clipping or rotation. Container-relative typography and measured compact-copy fit prevent overflow; motion requires rendered body size of at least 14.5px. Backend and Design labels use black foregrounds to retain normal-text AA contrast.
- Only illustrations fade from 0.9 to 1. The opaque article surface prevents rear copy bleeding through. A pending branded back remains visible until its card owns the moving face.
- Desktop deals outer-left, outer-right, inner-left, inner-right, then center. The final pending card recenters before opening, staying clear of the settled inner-right face. Mobile deals farthest destinations first vertically; cards below the fold become normal scrolling content after unpinning.
- Pin distance: **0.85 viewport height desktop**, **0.68 mobile**. Five equal phases occupy 90% of the scrub, followed by a 10% settled hold. Scrubbing remains immediate, reversible and unsnapped.
- Why Us refits preserve the surviving downstream Teams pin offset. Pause/reduction and unsafe-layout transitions preserve visible reading copy instead. Counter-transforms, decorative backs, pins and stage padding clear in ordinary mode. Readable settled faces take anchor priority; a tiny visible edge of a lower card cannot steal the reading anchor.

## Verification

| Gate | Result |
|---|---|
| `npm run lint` | Passed |
| `npx tsc --noEmit` | Passed |
| Fresh `npm run build` | Passed through the production E2E server command, isolated `.next-motion` output |
| `LANDING_MOTION_TEST=1 npm run test:e2e -- --trace off` | **86/86 passed**, fresh production server, 3.9 minutes |
| axe WCAG A/AA and best-practice profiles | Zero violations at 320/390/768/1024/1536px |
| Layout/assets | Zero horizontal overflow, broken images, small visible targets or runtime errors in those profiles |
| Impeccable detector | Zero primary findings, one retained typography advisory |
| Independent review | No Critical/Important findings; no requested source fix |

Seven new Poker cases cover initial proportions/steps/bounds, short pacing, forward/reverse copy readability, scaled moving-paragraph preservation, real branded assets and dynamic sizing endpoints. Existing center/pin, collision, preference, resize/copy growth, route cleanup, setup failure, no-JavaScript, touch and history checks remain. The tracked site image warm-up excludes intentionally hidden decorative back images from `scrollIntoViewIfNeeded`; its all-document broken-image assertions still cover those assets.

Independent read-only review sampled **306 production poses**: 51 positions at each of 1536/1600/1660/1728/1800/1920px, height 1080px. No exposed text fell outside its frame, lost paint hit-testing, or had a nonuniform combined transform. The reviewer suggested retaining an intermediate-width automated case as future coverage; current width evidence is retained in the review archive.

One batched visual inspection covered desktop/mobile stack, intermediate deal, settled grid, Pause/reduction, short screens and 200% text. The illustrations, lettering, neon layering and branded backs remain legible; no extra polish cycle or source rebuild followed that inspection.

## Performance and remaining finding

**[P3] Performance headroom remains.** Location: landing runtime/browser rendering and shared client payload; category: Performance. There is no demonstrated Teams per-frame layout read/write loop or newly imported animation package. Still, these Chrome samples do not establish universal zero-jank behavior:

| Sample | Frames | Median | p95 | Maximum | Intervals >32ms | Long tasks |
|---|---:|---:|---:|---:|---:|---:|
| Desktop wheel | 127 | 16.7ms | 16.8ms | 66.6ms | 1 | One 67ms renderer task |
| Synthesized native touch | 182 | 16.7ms | 16.8ms | 33.4ms | 1 | None |

The desktop long task includes initial pointer-over/mouse-move work; its cause is not attributed to Teams. The whole-page traces include small browser layout events (desktop maximum 0.307ms, touch maximum 3.279ms); no claim of zero browser layouts is made. JavaScript resource totals were approximately **246KiB encoded / 817KiB decoded** in each profile. The existing logo SVG adds a single cached 8.1KiB asset, with no heavy JavaScript dependency.

Recommendation: profile rendering and shared client payload on target devices in a separate optimization pass. Suggested command: `$impeccable optimize`. Keep Performance at 3/4 until that evidence improves. This engineering audit is not WCAG certification or a physical-device/browser-wide guarantee; Safari/Firefox rasterization and physical touch devices were not independently measured.

## Evidence and workspace state

Evidence: `/tmp/dev-club-teams-poker-2026-10-10/` contains fresh production logs, axe/resources JSON, desktop/touch traces, batched screenshots, independent review and copies of local regression tests. New motion tests and the design record remain local under the user's existing ignore policy; no force-add or ignore-rule change was made. The user's `.gitignore` edit and newer hero commit were preserved. No merge, push or deployment was performed.
