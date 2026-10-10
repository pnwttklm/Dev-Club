'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { useLandingMotion } from './motion-provider';
import { getNavigationClearance, preserveViewportPosition } from './anchor-navigation';

export function TeamsScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useLandingMotion();

  useGSAP(() => {
    const node = root.current!;
    const grid = node.querySelector<HTMLElement>('[data-teams-grid]')!;
    const cards = [...node.querySelectorAll<HTMLElement>('[data-team-card]')];
    const heading = node.querySelector<HTMLElement>('h2')!;
    const contents = cards.map(card => card.querySelector<HTMLElement>('[data-team-content]')!);
    let scene: gsap.Context | undefined;
    let timer: ReturnType<typeof setTimeout>;
    let signature = '';
    let selected: HTMLElement | undefined;
    const reset = () => {
      node.dataset.teamsMode = 'static';
      delete node.dataset.sceneStart;
      delete node.dataset.sceneEnd;
      node.style.removeProperty('--team-deck-rise');
      node.style.removeProperty('--team-stage-height');
      node.style.removeProperty('--team-stage-padding');
      cards.forEach(card => {
        card.dataset.teamFace = 'settled';
        card.dataset.teamRevealed = 'true';
        delete card.dataset.teamActive;
        delete card.dataset.teamDealing;
        card.style.removeProperty('z-index');
      });
      selected = undefined;
    };
    reset();
    if (!ready) return reset;
    // Offset dimensions ignore translations and detect copy growth even when
    // the equal-height grid itself has not yet grown.
    const dimensions = () => [innerWidth, innerHeight, heading.offsetHeight, grid.offsetWidth, grid.offsetHeight,
      ...cards.flatMap(card => {
        const copy = card.querySelector<HTMLElement>('[data-team-copy]')!;
        return [copy.offsetWidth, copy.offsetHeight, card.offsetHeight];
      })].join(',');
    const build = () => {
      scene?.revert();
      reset();
      // Create the context before setup so even a partial failure can revert.
      scene = gsap.context(() => {}, node);
      try {
        scene.add(() => {
          const natural = cards.map(card => card.getBoundingClientRect());
          const clearance = getNavigationClearance();
          const mobile = innerWidth < 768;
          const tallest = Math.max(...natural.map(rect => rect.height));
          const stepX = mobile ? 6 : 12;
          const stepY = mobile ? 8 : 10;
          const rise = stepY * 4;
          const frameHeight = heading.getBoundingClientRect().height + parseFloat(getComputedStyle(grid).marginTop) + rise + tallest;
          // Center the visible heading/deck frame, not the tall final mobile
          // column. Its remaining cards are read normally after the short pin.
          const stagePadding = Math.max(0, (innerHeight - clearance - frameHeight) / 2);
          const pinTop = clearance;
          // Every responsive grid can deal at its natural size. Large faces
          // stay in normal flow after the short pin instead of disabling it.
          const eligible = enabled && cards.length === 5;
          if (eligible) {
            node.style.setProperty('--team-deck-rise', `${rise}px`);
            node.style.setProperty('--team-stage-height', `${innerHeight - clearance}px`);
            node.style.setProperty('--team-stage-padding', `${stagePadding}px`);
          }
          const slots = cards.map(card => card.getBoundingClientRect());
          const rootRect = node.getBoundingClientRect();
          let rootDocumentTop = rootRect.top + scrollY;
          const positions = slots.map(rect => ({ left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height }));
          // Bottom rows first, then outer columns toward the center. This also
          // produces the existing center-out order in a single desktop row.
          const order = [...cards.keys()].sort((a, b) =>
            Math.round((slots[b].top - slots[a].top) * 100)
            || Math.round((Math.abs(slots[b].left + slots[b].width / 2 - innerWidth / 2) - Math.abs(slots[a].left + slots[a].width / 2 - innerWidth / 2)) * 100)
            || slots[a].left - slots[b].left);
          const originTop = Math.min(...slots.map(rect => rect.top));
          const starts = cards.map((_, index) => ({
            x: (innerWidth - slots[index].width - stepX * 4) / 2 - slots[index].left + order.indexOf(index) * stepX,
            y: originTop - slots[index].top - order.indexOf(index) * stepY,
          }));
          let pin: ScrollTrigger | undefined;
          const coarse = matchMedia('(pointer: coarse)').matches;
          const clear = () => {
            if (selected) delete selected.dataset.teamActive;
            selected = undefined;
          };
          const select = () => {
            if (!coarse) return;
            const progress = pin?.progress ?? 1;
            const rootTop = pin && scrollY >= pin.start && scrollY <= pin.end
              ? pinTop : rootDocumentTop + (pin && scrollY > pin.end ? pin.end - pin.start : 0) - scrollY;
            const center = (innerHeight + clearance - 16) / 2;
            let candidate: HTMLElement | undefined;
            let distance = Infinity;
            cards.forEach((card, index) => {
              if (card.dataset.teamFace === 'back') return;
              const fraction = pin ? Math.max(0, Math.min(1, (progress - order.indexOf(index) * .18) / .18)) : 1;
              const top = rootTop + positions[index].top + (pin ? starts[index].y * (1 - fraction) : 0);
              const bottom = top + positions[index].height;
              const nextDistance = Math.abs((top + bottom) / 2 - center);
              if (bottom > clearance - 16 && top < innerHeight && nextDistance < distance) {
                candidate = card; distance = nextDistance;
              }
            });
            if (candidate !== selected) { clear(); selected = candidate; if (selected) selected.dataset.teamActive = 'true'; }
          };
          if (eligible) {
            gsap.set(cards, { x: index => starts[index].x, y: index => starts[index].y, force3D: false });
            // Keep the opaque frame and all text at full contrast. The subtle
            // face fade affects the illustration only, never the reading copy.
            const illustrations = contents.map(content => content.querySelector('.team-illustration')!);
            gsap.set(illustrations, { opacity: .9 });
            let previous = '';
            const face = (progress: number) => {
              const active = progress >= .9 ? 5 : Math.min(4, Math.floor((progress + 1e-7) / .18));
              const index = order[active];
              const fraction = Math.max(0, Math.min(1, (progress - active * .18) / .18));
              const moving = positions[index];
              // Two-column fan-out can cross an already settled first-row
              // face. Keep the authentic back below that face until clear.
              const exposed = !moving || order.slice(0, active).every(settled => {
                const other = positions[settled];
                const left = moving.left + starts[index].x * (1 - fraction);
                const top = moving.top + starts[index].y * (1 - fraction);
                return Math.min(left + moving.width, other.left + other.width) - Math.max(left, other.left) <= 1
                  || Math.min(top + moving.height, other.top + other.height) - Math.max(top, other.top) <= 1;
              });
              const signature = `${active}:${exposed}`;
              if (signature !== previous) {
                previous = signature;
                node.dataset.teamsMode = active === 5 ? 'settled' : 'deck';
                order.forEach((index, depth) => {
                  const card = cards[index];
                  card.dataset.teamFace = depth < active ? 'settled' : depth === active && exposed ? 'moving' : 'back';
                  if (depth === active) card.dataset.teamDealing = 'true'; else delete card.dataset.teamDealing;
                  card.style.zIndex = String(depth === active && exposed ? 10 : depth < active ? 6 : 5 - depth);
                });
              }
              select();
            };
            const timeline = gsap.timeline({
              defaults: { ease: 'none', force3D: false },
              scrollTrigger: {
                id: 'landing-teams', refreshPriority: 1, trigger: node, pin: node,
                start: () => `top ${pinTop}`,
                end: () => `+=${innerHeight * (mobile ? .68 : .85)}`,
                scrub: true, anticipatePin: 0,
                onUpdate: self => face(self.progress),
                onRefresh: self => {
                  rootDocumentTop = self.start + pinTop;
                  node.dataset.sceneStart = String(self.start);
                  node.dataset.sceneEnd = String(self.end);
                  face(self.progress);
                },
              },
            });
            order.forEach((index, depth) => {
              timeline.to(cards[index], { x: 0, y: 0, duration: .18 }, depth * .18);
              timeline.to(illustrations[index], { opacity: 1, duration: .18, ease: 'sine.out' }, depth * .18);
            });
            timeline.to({}, { duration: .1 });
            pin = timeline.scrollTrigger;
            face(pin?.progress ?? 0);
          }
          if (coarse) {
            ScrollTrigger.create({
              id: 'landing-team-highlight', trigger: node, start: 'top bottom',
              // Its trigger shares the pinned node; include that node's own
              // pin travel explicitly so the last card remains in range.
              end: () => rootDocumentTop + (pin ? pin.end - pin.start : 0) + rootRect.height - (clearance - 16),
              onUpdate: select, onToggle: self => { if (self.isActive) select(); else clear(); },
              onRefresh: () => {
                if (!pin) rootDocumentTop = node.getBoundingClientRect().top + scrollY;
                select();
              },
            });
            select();
          }
        });
      } catch {
        scene.revert();
        reset();
      }
      signature = dimensions();
      ScrollTrigger.refresh();
    };
    build();
    const refit = () => {
      if (dimensions() === signature) return;
      clearTimeout(timer);
      timer = setTimeout(() => preserveViewportPosition(build), 120);
    };
    const observer = new ResizeObserver(refit);
    observer.observe(grid);
    observer.observe(heading);
    cards.forEach(card => {
      observer.observe(card);
      observer.observe(card.querySelector('[data-team-copy]')!);
    });
    window.addEventListener('resize', refit);
    node.addEventListener('load', refit, true);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('resize', refit);
      node.removeEventListener('load', refit, true);
      scene?.revert();
      reset();
    };
  }, { scope: root, dependencies: [enabled, ready], revertOnUpdate: true });

  return <div ref={root} className="teams-scene" data-teams-mode="static">{children}</div>;
}
