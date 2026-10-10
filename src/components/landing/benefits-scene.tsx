'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { useLandingMotion } from './motion-provider';

export function BenefitsScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const revealed = useRef(new Set<Element>());
  const { enabled, ready } = useLandingMotion();

  useGSAP((_context, contextSafe) => {
    const node = root.current!;
    const cards = [...node.querySelectorAll<HTMLElement>('[data-benefit-card]')];
    node.dataset.benefitsStaging = 'none';
    if (!enabled || !ready) return;
    node.dataset.benefitsStaging = 'entrance';
    let live = true;
    const pending = cards.filter(card => !revealed.current.has(card));
    // Copy stays opaque. Illustration emphasis leads a small text stagger;
    // distant rows enter when reached naturally, without changing layout.
    if (pending.length) {
      gsap.set(pending, { y: 16 });
      gsap.set(pending.map(card => card.querySelector('img')), { y: 8, scale: .96, opacity: .8 });
      gsap.set(pending.flatMap(card => [...card.querySelectorAll('h3, p')]), { y: 6 });
      ScrollTrigger.batch(pending, {
        start: 'top 90%', once: true, interval: .08,
        onEnter: contextSafe!((batch: Element[]) => {
          if (!live) return;
          batch.forEach(card => revealed.current.add(card));
          const timeline = gsap.timeline({
            defaults: { ease: 'expo.out', overwrite: 'auto' },
          });
          batch.forEach((card, index) => {
            const start = index * .08;
            timeline.to(card, { y: 0, duration: .5, clearProps: 'transform' }, start);
            timeline.to(card.querySelector('img'), {
              y: 0, scale: 1, opacity: 1, duration: .65, clearProps: 'transform,opacity',
            }, start);
            timeline.to(card.querySelectorAll('h3, p'), {
              y: 0, duration: .4, stagger: .06, clearProps: 'transform',
            }, start + .1);
          });
        }),
      });
    }
    // Touch has no hover: the ordinary card crossing viewport center gets
    // the same accent. These triggers never change layout or pin anything.
    const media = gsap.matchMedia();
    media.add('(pointer: coarse)', () => {
      cards.forEach(card => ScrollTrigger.create({
        trigger: card, start: 'top 60%', end: 'bottom 40%',
        onToggle: self => { card.dataset.benefitSpotlight = String(self.isActive); },
      }));
      return () => cards.forEach(card => { delete card.dataset.benefitSpotlight; });
    });
    return () => {
      live = false;
      media.revert();
      node.dataset.benefitsStaging = 'none';
      cards.forEach(card => { delete card.dataset.benefitSpotlight; });
    };
  }, { scope: root, dependencies: [enabled, ready], revertOnUpdate: true });

  return <div ref={root} className="benefits-scene" data-benefits-mode="overview" data-benefits-staging="none">{children}</div>;
}
