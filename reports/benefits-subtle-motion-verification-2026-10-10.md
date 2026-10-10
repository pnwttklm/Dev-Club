# Why Us subtle GSAP entrance

Added a small illustration-led entrance to the existing centered natural-flow Benefits grid. Cards rise 16px over 0.5s; illustrations rise 8px, scale from 0.96 to 1, and fade from 0.8 to 1 over 0.65s. Fully opaque headings and paragraphs follow with a 6px translation and 0.06s stagger. Neighboring cards stagger by 0.08s. This adds no pin, deck mechanic, dependency, or layout-property animation.

The existing scoped GSAP cleanup immediately restores static cards and descendants when Pause or reduced motion is enabled. Already revealed cards do not replay after Resume. Hover and touch spotlight behavior remain.

## Fresh verification

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed through the production Playwright web-server command using isolated `.next-motion` output.
- Focused Playwright run: **14/14 passed** across Benefits flow and landing-motion tests. The entire 93-case suite was not rerun for this incremental change.
- Live animation samples at **320, 390, 768, and 1536px** observed the illustration interpolating to scale 1, fully opaque and unclipped copy, unchanged scene height, no horizontal overflow, and no Benefits pin.
- Pause during the entrance and reduced motion restored all card, illustration, heading, and paragraph transforms immediately.
- Axe checks at all four widths: **zero violations**; runtime errors: **zero**.
- Independent read-only review of the animation diff: approved, no findings.

Two initial test failures came from obsolete opacity-based completion waits: the card now remains fully opaque during its entrance. Local tests now wait for card and descendant transforms to clear before asserting settled copy boundaries and reading position; those assertions were preserved. Tests remain local under the repository's existing ignore policy.

Evidence, final test log, motion samples, accessibility results, and viewport captures: `/tmp/dev-club-benefits-subtle-motion-2026-10-10/`.

This is incremental verification, not a new whole-page Impeccable score. The preceding full audit is recorded in `benefits-natural-flow-verification-2026-10-10.md`.
