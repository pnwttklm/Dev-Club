'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { useLandingMotion } from './motion-provider';
import { getNavigationClearance } from './anchor-navigation';

export function TeamsScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useLandingMotion();

  useGSAP(() => {
    const node = root.current!;
    const grid = node.querySelector<HTMLElement>('[data-teams-grid]')!;
    const cards = [...node.querySelectorAll<HTMLElement>('[data-team-card]')];
    const reset = () => {
      node.dataset.teamsMode = 'static';
      delete node.dataset.sceneStart;
      delete node.dataset.sceneEnd;
      node.style.removeProperty('--team-deck-height');
      cards.forEach(card => {
        card.dataset.teamFace = 'settled';
        card.dataset.teamRevealed = 'true';
        card.style.removeProperty('z-index');
      });
    };
    reset();
    if (!ready) return reset;
    let scene: gsap.Context | undefined;
    try {
      scene = gsap.context(() => {
        if (!enabled || cards.length !== 5) return;
        const natural = cards.map(card => card.getBoundingClientRect());
        const oneColumn = natural.every(rect => Math.abs(rect.left - natural[0].left) < 1);
        const oneRow = natural.every(rect => Math.abs(rect.top - natural[0].top) < 1);
        const tallest = Math.max(...natural.map(rect => rect.height));
        const fits = tallest + parseFloat(getComputedStyle(grid).marginTop) + 12 <= innerHeight - getNavigationClearance();
        const sameWidth = natural.every(rect => Math.abs(rect.width - natural[0].width) <= 1);
        if ((!oneColumn && !oneRow) || !fits || !sameWidth || parseFloat(getComputedStyle(document.documentElement).fontSize) >= 32) return;
        node.style.setProperty('--team-deck-height', `${tallest}px`);
        const slots = cards.map(card => card.getBoundingClientRect());
        const order = oneColumn ? [...cards.keys()].reverse() : [...cards.keys()];
        const origin = slots[oneColumn ? 0 : 4];
        const starts = cards.map((_, index) => ({ x: origin.left - slots[index].left, y: origin.top - slots[index].top + order.indexOf(index) * 3 }));
        gsap.set(cards, { x: index => starts[index].x, y: index => starts[index].y, force3D: false });
        const face = (progress: number) => {
          const complete = progress >= .9;
          const active = complete ? 5 : Math.min(4, Math.floor((progress + 1e-7) / .18));
          node.dataset.teamsMode = complete ? 'settled' : 'deck';
          order.forEach((index, depth) => {
            const card = cards[index];
            card.dataset.teamFace = depth < active ? 'settled' : depth === active ? 'moving' : 'back';
            card.style.zIndex = String(depth === active ? 10 : depth < active ? 6 : 5 - depth);
          });
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
              node.dataset.sceneStart = String(self.start);
              node.dataset.sceneEnd = String(self.end);
              face(self.progress);
            },
          },
        });
        order.forEach((index, depth) => timeline.to(cards[index], { x: 0, y: 0, duration: .18 }, depth * .18));
        timeline.to({}, { duration: .1 });
        face(timeline.scrollTrigger?.progress ?? 0);
      }, node);
    } catch {
      scene?.revert();
      // A failed enhancement leaves the real reading grid intact.
      gsap.set(cards, { clearProps: 'transform' });
      reset();
    }
    ScrollTrigger.refresh();
    return () => { scene?.revert(); reset(); };
  }, { scope: root, dependencies: [enabled, ready], revertOnUpdate: true });

  return <div ref={root} className="teams-scene" data-teams-mode="static">{children}</div>;
}
