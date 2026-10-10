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
    let scene: gsap.Context | undefined;
    let timer: ReturnType<typeof setTimeout>;
    let signature = '';
    let selected: HTMLElement | undefined;
    const reset = () => {
      node.dataset.teamsMode = 'static';
      delete node.dataset.sceneStart;
      delete node.dataset.sceneEnd;
      node.style.removeProperty('--team-deck-height');
      cards.forEach(card => {
        card.dataset.teamFace = 'settled';
        card.dataset.teamRevealed = 'true';
        delete card.dataset.teamActive;
        card.style.removeProperty('z-index');
      });
      selected = undefined;
    };
    reset();
    if (!ready) return reset;
    // Offset dimensions ignore translations and detect copy growth even when
    // the equal-height grid itself has not yet grown.
    const dimensions = () => [innerWidth, innerHeight, grid.offsetWidth, grid.offsetHeight,
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
          const oneColumn = natural.every(rect => Math.abs(rect.left - natural[0].left) < 1);
          const oneRow = natural.every(rect => Math.abs(rect.top - natural[0].top) < 1);
          const tallest = Math.max(...natural.map(rect => rect.height));
          const fits = tallest + parseFloat(getComputedStyle(grid).marginTop) + 12 <= innerHeight - clearance;
          const sameWidth = natural.every(rect => Math.abs(rect.width - natural[0].width) <= 1);
          const eligible = enabled && cards.length === 5 && (oneColumn || oneRow) && fits && sameWidth
            && parseFloat(getComputedStyle(document.documentElement).fontSize) < 32;
          if (eligible) node.style.setProperty('--team-deck-height', `${tallest}px`);
          const slots = cards.map(card => card.getBoundingClientRect());
          const rootRect = node.getBoundingClientRect();
          let rootDocumentTop = rootRect.top + scrollY;
          const positions = slots.map(rect => ({ top: rect.top - rootRect.top, height: rect.height }));
          const order = oneColumn ? [...cards.keys()].reverse() : [...cards.keys()];
          const origin = slots[oneColumn ? 0 : 4];
          const starts = cards.map((_, index) => ({ x: origin.left - slots[index].left, y: origin.top - slots[index].top + order.indexOf(index) * 3 }));
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
              ? clearance : rootDocumentTop + (pin && scrollY > pin.end ? pin.end - pin.start : 0) - scrollY;
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
            let previous = -1;
            const face = (progress: number) => {
              const active = progress >= .9 ? 5 : Math.min(4, Math.floor((progress + 1e-7) / .18));
              if (active !== previous) {
                previous = active;
                node.dataset.teamsMode = active === 5 ? 'settled' : 'deck';
                order.forEach((index, depth) => {
                  const card = cards[index];
                  card.dataset.teamFace = depth < active ? 'settled' : depth === active ? 'moving' : 'back';
                  card.style.zIndex = String(depth === active ? 10 : depth < active ? 6 : 5 - depth);
                });
              }
              select();
            };
            const timeline = gsap.timeline({
              defaults: { ease: 'none', force3D: false },
              scrollTrigger: {
                id: 'landing-teams', trigger: node, pin: node,
                start: () => `top ${getNavigationClearance()}`,
                end: () => `+=${innerHeight * (oneColumn ? .8 : 1)}`,
                scrub: true, anticipatePin: 1,
                onUpdate: self => face(self.progress),
                onRefresh: self => {
                  rootDocumentTop = self.start + clearance;
                  node.dataset.sceneStart = String(self.start);
                  node.dataset.sceneEnd = String(self.end);
                  face(self.progress);
                },
              },
            });
            order.forEach((index, depth) => timeline.to(cards[index], { x: 0, y: 0, duration: .18 }, depth * .18));
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
