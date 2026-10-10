'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { useLandingMotion } from './motion-provider';
import { getNavigationClearance, preserveViewportPosition } from './anchor-navigation';

export function BenefitsScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useLandingMotion();

  useGSAP((_context, contextSafe) => {
    const node = root.current!;
    node.dataset.benefitsMode = 'overview';
    node.dataset.benefitsStaging = 'none';
    if (!enabled || !ready) return;
    const cards = [...node.querySelectorAll<HTMLElement>('[data-benefit-card]')];
    const grid = node.querySelector<HTMLElement>('[data-benefits-grid]')!;
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 1024px)', mobile: '(max-width: 1023px)' }, context => {
      const desktop = !!context.conditions?.desktop;
      const clearance = getNavigationClearance();
      const usable = innerHeight - clearance;
      const heading = node.querySelector('h2')!.getBoundingClientRect().height;
      const rectangles = cards.map(card => card.getBoundingClientRect());
      const tallest = Math.max(...rectangles.map(rect => rect.height));
      const fits = tallest + heading + 40 + 28 <= usable;
      if (!fits) {
        node.dataset.benefitsMode = 'overview';
        node.dataset.benefitsStaging = 'none';
        // The normal reading layout stays intact on short/enlarged viewports.
        gsap.from(cards, { y: 16, duration: 0.35, stagger: 0.06, scrollTrigger: { trigger: node, start: 'top 85%', once: true } });
        return;
      }
      const mode = desktop ? 'spotlight' : 'deck';
      node.dataset.benefitsStaging = mode;
      const illustrations = cards.map(card => card.querySelector('img'));
      if (!desktop) {
        gsap.set(cards, {
          x: index => rectangles[0].left - rectangles[index].left,
          y: index => rectangles[0].top - rectangles[index].top + index * 12,
          scale: index => 1 - index * 0.02,
          rotation: index => index === 1 ? -1 : index === 2 ? 1 : 0,
          transformOrigin: 'center top',
        });
      }
      const update = (progress: number) => {
        const overview = progress >= 0.999;
        const active = overview ? -1 : Math.min(2, Math.floor(progress / 0.3));
        node.dataset.benefitsMode = overview ? 'overview' : mode;
        node.dataset.benefitActive = String(active);
        cards.forEach((card, index) => {
          card.dataset.benefitSpotlight = String(index === active);
          card.style.zIndex = String(index === active ? 4 : 3 - index);
        });
      };
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'landing-benefits', trigger: node, pin: node, start: () => `top ${getNavigationClearance()}`,
          end: () => `+=${(innerHeight - getNavigationClearance()) * (desktop ? 1.5 : 1)}`,
          scrub: true, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => update(self.progress),
          onRefresh: self => {
            node.dataset.sceneStart = String(self.start);
            node.dataset.sceneEnd = String(self.end);
            update(self.progress);
          },
        },
      });
      // Illustration emphasis leads each phase; body copy stays fully opaque.
      timeline.set(illustrations, { opacity: desktop ? 0.45 : 1 }, 0);
      for (let index = 0; index < cards.length; index++) {
        if (desktop) {
          timeline.to(illustrations, { opacity: i => i === index ? 1 : 0.45, duration: 0.08 }, index * 0.3);
          timeline.to(cards, { y: i => i === index ? -10 : 0, duration: 0.08 }, index * 0.3);
        } else {
          // Successive faces lift just enough to distinguish the deck.
          timeline.to(cards[index], { scale: 1, rotation: 0, duration: 0.12 }, index * 0.3);
        }
      }
      timeline.to(cards, { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.22 }, 0.78);
      timeline.to(illustrations, { opacity: 1, duration: 0.22 }, 0.78);
      update(0);
      return () => {
        node.dataset.benefitsMode = 'overview';
        node.dataset.benefitsStaging = 'none';
        delete node.dataset.benefitActive;
        cards.forEach(card => { delete card.dataset.benefitSpotlight; card.style.removeProperty('z-index'); });
      };
    }, root);

    let timeout: ReturnType<typeof setTimeout>;
    let previousWidth = grid.offsetWidth, previousHeight = grid.offsetHeight, previousViewport = innerHeight;
    const refit = contextSafe!(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => preserveViewportPosition(() => { gsap.matchMediaRefresh(); ScrollTrigger.refresh(); }), 120);
    });
    const observer = new ResizeObserver(() => {
      if (grid.offsetWidth !== previousWidth || grid.offsetHeight !== previousHeight) {
        previousWidth = grid.offsetWidth; previousHeight = grid.offsetHeight; refit();
      }
    });
    const resize = () => { if (innerHeight !== previousViewport) { previousViewport = innerHeight; refit(); } };
    observer.observe(grid);
    window.addEventListener('resize', resize);
    ScrollTrigger.refresh();
    return () => { clearTimeout(timeout); observer.disconnect(); window.removeEventListener('resize', resize); media.revert(); };
  }, { scope: root, dependencies: [enabled, ready], revertOnUpdate: true });

  return <div ref={root} className="benefits-scene" data-benefits-mode="overview" data-benefits-staging="none">{children}</div>;
}
