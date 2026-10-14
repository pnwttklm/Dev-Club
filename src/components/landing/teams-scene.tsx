'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from './gsap';
import { useLandingMotion } from './motion-provider';
import { setupTeamsCarousel } from './teams-carousel';
import { setupTeamsDeck } from './teams-deck';

export function TeamsScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useLandingMotion();

  useGSAP(() => {
    if (!ready) return;
    const node = root.current!;
    const media = gsap.matchMedia();
    media.add('(max-width: 767px)', () => setupTeamsCarousel(node, enabled));
    media.add('(min-width: 768px)', () => {
      if (enabled) return setupTeamsDeck(node);
    });
    return () => media.revert();
  }, { scope: root, dependencies: [ready, enabled], revertOnUpdate: true });

  return <div ref={root} className="teams-scene" data-teams-mode="static">{children}</div>;
}
