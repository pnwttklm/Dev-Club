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
    // The default content stays visible. Only a small rise and soft fade
    // introduce nearby siblings; distant rows enter when reached naturally.
    if (pending.length) {
      gsap.set(pending, { y: 16, opacity: .9 });
      ScrollTrigger.batch(pending, {
        start: 'top 90%', once: true, interval: .08,
        onEnter: contextSafe!((batch: Element[]) => {
          if (!live) return;
          batch.forEach(card => revealed.current.add(card));
          gsap.to(batch, {
            y: 0, opacity: 1, duration: .5, stagger: .08,
            ease: 'expo.out', overwrite: 'auto', clearProps: 'transform,opacity',
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
