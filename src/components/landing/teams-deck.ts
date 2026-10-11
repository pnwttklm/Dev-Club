import { gsap, ScrollTrigger } from './gsap';
import { getNavigationClearance, preserveViewportPosition } from './anchor-navigation';

/** Readable presentation faces deal into the unchanged canonical grid. */
export function setupTeamsDeck(node: HTMLElement) {
  const grid = node.querySelector<HTMLElement>('[data-teams-grid]')!;
  const heading = node.querySelector<HTMLElement>('h2')!;
  const slots = [...node.querySelectorAll<HTMLElement>('[data-team-slot]')];
  const cards = [...node.querySelectorAll<HTMLElement>('[data-team-card]')];
  const placeholders = [...node.querySelectorAll<HTMLElement>('[data-team-placeholder]')];
  const copies = cards.map(card => card.querySelector<HTMLElement>('[data-team-copy]')!);
  const layer = node.querySelector<HTMLElement>('[data-team-presentation-layer]')!;
  const presentations = [...layer.querySelectorAll<HTMLElement>('[data-team-presentation]')];
  const frames = presentations.map(card => card.querySelector<HTMLElement>('[data-team-presentation-frame]')!);
  const faces = presentations.map(card => card.querySelector<HTMLElement>('[data-team-content]')!);
  let scene: gsap.Context | undefined;
  let timer: ReturnType<typeof setTimeout>;
  let signature = '';
  const dimensions = () => [innerWidth, innerHeight, grid.offsetWidth, grid.offsetHeight,
    heading.offsetHeight, ...copies.map(copy => copy.offsetHeight)].join(',');
  const reset = () => {
    node.dataset.teamsMode = 'static';
    delete node.dataset.sceneStart;
    delete node.dataset.sceneEnd;
    delete node.dataset.deckFallback;
    cards.forEach(card => { delete card.dataset.teamFace; });
  };
  const build = () => {
    scene?.revert();
    reset();
    scene = gsap.context(() => {
      const originalSpacing = {
        minHeight: node.style.minHeight,
        paddingTop: node.style.paddingTop,
        paddingBottom: node.style.paddingBottom,
      };
      const clearance = getNavigationClearance();
      const availableHeight = Math.max(0, innerHeight - clearance);
      const naturalHeight = node.getBoundingClientRect().height;
      const inset = Math.max(0, (availableHeight - naturalHeight) / 2);
      // Center fitting scenes below the navbar. Tall grids retain their natural
      // dimensions with the heading at the top; neither case skips the pin.
      // Reserve a viewport of space so the FAQ cannot enter during the deal.
      gsap.set(node, { minHeight: availableHeight, paddingTop: inset,
        paddingBottom: inset, autoRound: false });
      const rect = node.getBoundingClientRect();
      const positions = slots.map(slot => {
        const r = slot.getBoundingClientRect();
        return { x: r.left - rect.left, y: r.top - rect.top, width: r.width, height: r.height };
      });
      const top = Math.min(...positions.map(p => p.y));
      const firstRow = [...slots.keys()].filter(index => Math.abs(positions[index].y - top) < 1);
      const centerSlot = firstRow.reduce((nearest, index) =>
        Math.abs(positions[index].x + positions[index].width / 2 - rect.width / 2)
          < Math.abs(positions[nearest].x + positions[nearest].width / 2 - rect.width / 2) - 1
          ? index : nearest);
      const anchor = positions[centerSlot];
      const deckWidth = anchor.width;
      const deckHeight = anchor.height;
      const order = [...slots.keys()].sort((a, b) => positions[a].y - positions[b].y
        || Math.round(Math.abs(positions[b].x + positions[b].width / 2 - rect.width / 2))
          - Math.round(Math.abs(positions[a].x + positions[a].width / 2 - rect.width / 2))
        || positions[a].x - positions[b].x);
      order.push(...order.splice(order.indexOf(centerSlot), 1));
      const deals = order.filter(index => index !== centerSlot);
      const step = 3;
      const insetAt = (depth: number, remaining: number) => (remaining - depth - 1) * step;
      const frameScale = (index: number, inset: number) => ({
        scaleX: (deckWidth - inset) / positions[index].width,
        scaleY: (deckHeight - inset) / positions[index].height,
      });
      gsap.set(layer, { display: 'block' });
      gsap.set(cards, { opacity: 0 });
      gsap.set(placeholders, { display: 'block', autoAlpha: 1 });
      gsap.set(placeholders[centerSlot], { display: 'none' });
      gsap.set(presentations, { width: deckWidth, height: deckHeight, autoRound: false,
        autoAlpha: 1, force3D: true });
      // Size each sole painted surface to its slot; transform back to deck size.
      // At scale 1 the border thickness and corner radii match the real article.
      gsap.set(frames, { right: 'auto', bottom: 'auto', autoRound: false,
        width: (index: number) => positions[index].width,
        height: (index: number) => positions[index].height,
        force3D: true });
      gsap.set(faces, { scale: 1, opacity: 0, force3D: true });
      order.forEach((index, depth) => {
        const inset = insetAt(depth, order.length);
        gsap.set(presentations[index], { x: anchor.x, y: anchor.y + inset,
          rotation: 0, zIndex: cards.length - depth });
        gsap.set(frames[index], { ...frameScale(index, inset),
          clipPath: depth === 0 ? 'none' : 'inset(0px 0px 16px 0px)' });
        gsap.set(faces[index], { scale: (deckWidth - inset) / deckWidth });
      });
      gsap.set(faces[order[0]], { opacity: 1 });
      const lastDealStart = .25 + (deals.length - 1);
      const centerSettleStart = lastDealStart + .42;
      const total = lastDealStart + .7;
      let previous = '';
      const synchronizeState = (progress: number) => {
        const time = progress * total;
        const state = order.map((index, depth) => index === centerSlot
          ? time >= total ? 'settled' : time >= centerSettleStart ? 'settling' : 'back'
          : time >= .25 + depth + .7 ? 'settled'
            : time > .25 + depth + .52 ? 'moving' : 'back');
        const key = state.join(',');
        if (key === previous) return;
        previous = key;
        node.dataset.teamsMode = state.every(face => face === 'settled') ? 'settled' : 'deck';
        order.forEach((index, depth) => { cards[index].dataset.teamFace = state[depth]; });
      };
      synchronizeState(0);
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut', force3D: true },
        scrollTrigger: {
          id: 'landing-teams', refreshPriority: 1, trigger: node, pin: node,
          pinSpacing: true,
          start: () => `top ${getNavigationClearance()}`,
          end: () => `+=${Math.max(innerHeight * .4, 250) * deals.length}`,
          // Direct scrub keeps the outer and seated center handoffs complete before
          // unpinning, even when a wheel gesture advances quickly to the end.
          scrub: true,
          onUpdate: self => synchronizeState(self.progress),
          onRefresh: self => {
            node.dataset.sceneStart = String(self.start);
            node.dataset.sceneEnd = String(self.end);
            synchronizeState(self.progress);
          },
        },
      });
      deals.forEach((index, depth) => {
        const start = .25 + depth;
        const destination = positions[index];
        timeline.to(presentations[index], { x: destination.x, y: destination.y, rotation: 0, duration: .52 }, start);
        timeline.to(frames[index], { scaleX: 1, scaleY: 1, duration: .52 }, start);
        timeline.to(faces[index], { scale: destination.width / deckWidth, duration: .52 }, start);
        // Land first. Never show two differently wrapped content faces together.
        timeline.to(faces[index], { opacity: 0, duration: .09, ease: 'none' }, start + .52);
        timeline.to(placeholders[index], { autoAlpha: 0, duration: .18, ease: 'none' }, start + .52);
        timeline.set(cards[index], { opacity: 1 }, start + .61);
        timeline.to(presentations[index], { autoAlpha: 0, duration: .09, ease: 'none' }, start + .61);
        const remaining = order.slice(depth + 1);
        remaining.forEach((pending, offset) => {
          // The integrated center card is already aligned at natural size.
          if (pending === centerSlot) return;
          const inset = insetAt(offset, remaining.length);
          const settle = { duration: .34, ease: 'power2.out' };
          timeline.to(presentations[pending], { x: anchor.x, y: anchor.y + inset,
            ...settle }, start + .18);
          timeline.to(frames[pending], { ...frameScale(pending, inset), ...settle }, start + .18);
          timeline.to(faces[pending], { scale: (deckWidth - inset) / deckWidth, ...settle }, start + .18);
        });
        const next = order[depth + 1];
        if (next !== undefined) {
          timeline.set(frames[next], { clipPath: 'none' }, start + .18);
          timeline.to(faces[next], { opacity: 1, duration: .24, ease: 'sine.out' }, start + .18);
        }
      });
      // The last face is already seated. Reveal its identical interactive card
      // underneath, then dissolve only the presentation layer in place.
      timeline.set(cards[centerSlot], { opacity: 1 }, centerSettleStart);
      timeline.to(presentations[centerSlot], { autoAlpha: 0, duration: .28,
        ease: 'none' }, centerSettleStart);
      // Pin reversion restores its padding snapshot after tween reversion.
      // Restore the original spacing last on refit, Pause and mobile cleanup.
      return () => { Object.assign(node.style, originalSpacing); };
    }, node);
    signature = dimensions();
    ScrollTrigger.refresh();
  };
  const refit = () => {
    if (dimensions() === signature) return;
    clearTimeout(timer);
    timer = setTimeout(() => preserveViewportPosition(build), 120);
  };
  build();
  const observer = new ResizeObserver(refit);
  observer.observe(grid);
  observer.observe(heading);
  copies.forEach(copy => observer.observe(copy));
  window.addEventListener('resize', refit);
  return () => {
    clearTimeout(timer);
    observer.disconnect();
    window.removeEventListener('resize', refit);
    scene?.revert();
    reset();
  };
}
