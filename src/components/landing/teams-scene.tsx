'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { useLandingMotion } from './motion-provider';
import { getNavigationClearance } from './anchor-navigation';

const storageKey = 'dev-club-revealed-teams';

export function TeamsScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const completed = useRef(new Set<string>());
  const { enabled, ready } = useLandingMotion();

  useGSAP((_context, contextSafe) => {
    if (!ready) return;
    const node = root.current!;
    const cards = [...node.querySelectorAll<HTMLElement>('[data-team-card]')];
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? '[]');
      if (Array.isArray(saved)) saved.forEach(name => { if (typeof name === 'string') completed.current.add(name); });
    } catch { /* Reveals still complete locally when session storage is unavailable. */ }
    const remember = (items: HTMLElement[]) => {
      items.forEach(card => { card.dataset.teamRevealed = 'true'; completed.current.add(card.dataset.teamCard!); });
      try { sessionStorage.setItem(storageKey, JSON.stringify([...completed.current])); } catch { /* Local completion still prevents replay. */ }
    };
    const pending = cards.filter(card => enabled && !completed.current.has(card.dataset.teamCard!) && card.getBoundingClientRect().bottom > getNavigationClearance());
    const visible = cards.filter(card => !pending.includes(card));
    remember(visible);
    gsap.set(visible, { opacity: 1, y: 0 });
    if (pending.length) {
      gsap.set(pending, { opacity: 0, y: 24 });
      ScrollTrigger.batch(pending, {
        start: 'top 90%', once: true, interval: 0.016, batchMax: 5,
        onEnter: contextSafe!((batch: Element[]) => {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', overwrite: 'auto', onComplete: () => remember(batch as HTMLElement[]) });
        }),
      });
    }

    const media = gsap.matchMedia();
    media.add('(pointer: coarse)', () => {
      let selected: HTMLElement | undefined;
      const clear = () => { if (selected) { delete selected.dataset.teamActive; selected = undefined; } };
      const select = () => {
        const navBottom = getNavigationClearance() - 16;
        const center = (innerHeight + navBottom) / 2;
        // Batch all geometry reads, then update only the changed selection.
        const rectangles = cards.map(card => ({ card, rect: card.getBoundingClientRect() }));
        const candidate = rectangles.filter(({ rect }) => rect.bottom > navBottom && rect.top < innerHeight)
          .sort((a, b) => Math.abs(a.rect.top + a.rect.height / 2 - center) - Math.abs(b.rect.top + b.rect.height / 2 - center))[0]?.card;
        if (candidate !== selected) { clear(); selected = candidate; if (selected) selected.dataset.teamActive = 'true'; }
      };
      ScrollTrigger.create({
        trigger: node, start: 'top bottom', end: () => `bottom ${getNavigationClearance() - 16}`,
        onUpdate: select, onRefresh: select, onToggle: self => { if (self.isActive) select(); else clear(); },
      });
      select();
      return clear;
    }, root);
    ScrollTrigger.refresh();
    return () => media.revert();
  }, { scope: root, dependencies: [enabled, ready], revertOnUpdate: true });

  return <div ref={root} className="teams-scene">{children}</div>;
}
