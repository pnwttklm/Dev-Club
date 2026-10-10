'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { getNavigationClearance, navigateToSection, preserveViewportPosition, registerLandingScroll } from './anchor-navigation';

type MotionState = { enabled: boolean; paused: boolean; reduced: boolean; ready: boolean; togglePaused: () => void };
const MotionContext = createContext<MotionState>({ enabled: false, paused: false, reduced: false, ready: false, togglePaused: () => {} });
const preferenceKey = 'dev-club-motion-paused';
export const useLandingMotion = () => useContext(MotionContext);

export function LandingMotionProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const enabled = ready && !paused && !reduced && !failed;

  useEffect(() => {
    let live = true;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => preserveViewportPosition(() => setReduced(media.matches));
    sync();
    try { setPaused(sessionStorage.getItem(preferenceKey) === 'true'); } catch { /* Private storage still permits local controls. */ }
    media.addEventListener('change', sync);
    document.fonts.ready.then(() => { if (live) setReady(true); });
    return () => { live = false; media.removeEventListener('change', sync); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    let lenis: Lenis | undefined;
    let frame = 0;
    const completions = new Set<() => void>();
    const tick = (time: number) => lenis?.raf(time * 1000);
    const visibility = () => {
      gsap.ticker.remove(tick);
      if (!document.hidden && lenis) gsap.ticker.add(tick);
    };
    try {
      if (enabled) {
        lenis = new Lenis({ lerp: 0.22, smoothWheel: true, syncTouch: false, autoRaf: false });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);
        visibility();
        document.addEventListener('visibilitychange', visibility);
        document.documentElement.dataset.landingScroll = 'smooth';
      } else document.documentElement.dataset.landingScroll = 'static';
    } catch {
      lenis?.destroy();
      lenis = undefined;
      setFailed(true);
      document.documentElement.dataset.landingScroll = 'static';
    }
    const unregister = registerLandingScroll(async (target, immediate) => {
      ScrollTrigger.refresh();
      lenis?.resize();
      const top = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight,
        target.getBoundingClientRect().top + scrollY - getNavigationClearance()));
      if (!lenis) { window.scrollTo({ top, behavior: 'instant' }); return; }
      await new Promise<void>(resolve => {
        const finish = () => { clearTimeout(timeout); completions.delete(finish); resolve(); };
        const timeout = setTimeout(finish, 1600);
        completions.add(finish);
        lenis!.scrollTo(top, { immediate, force: true, onComplete: finish });
      });
    }, {
      refresh: () => { ScrollTrigger.refresh(); lenis?.resize(); },
      synchronize: () => {
        ScrollTrigger.getScrollFunc(window)(window.scrollY);
        lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
        ScrollTrigger.update();
      },
    });
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { ScrollTrigger.refresh(); lenis?.resize(); });
    };
    root.current?.addEventListener('load', refresh, true);
    const node = root.current;
    refresh();
    return () => {
      unregister();
      cancelAnimationFrame(frame);
      completions.forEach(finish => finish());
      document.removeEventListener('visibilitychange', visibility);
      node?.removeEventListener('load', refresh, true);
      gsap.ticker.remove(tick);
      lenis?.off('scroll', ScrollTrigger.update);
      lenis?.destroy();
      delete document.documentElement.dataset.landingScroll;
    };
  }, [ready, enabled]);

  useEffect(() => {
    if (!ready) return;
    let frame = 0;
    const hash = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          const id = location.hash.slice(1);
          if (id) void navigateToSection(id, { history: 'none', immediate: true, focus: false });
        });
      });
    };
    const skip = (event: MouseEvent) => {
      const link = (event.target as Element).closest('a.skip-link');
      if (!link || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      void navigateToSection('main-content', { history: 'none', immediate: true });
    };
    hash();
    window.addEventListener('popstate', hash);
    window.addEventListener('hashchange', hash);
    document.addEventListener('click', skip);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('popstate', hash);
      window.removeEventListener('hashchange', hash);
      document.removeEventListener('click', skip);
    };
  }, [ready]);

  const togglePaused = () => preserveViewportPosition(() => setPaused(previous => {
    const next = !previous;
    try { sessionStorage.setItem(preferenceKey, String(next)); } catch { /* Local state remains usable. */ }
    return next;
  }));
  return <MotionContext.Provider value={{ enabled, paused, reduced, ready, togglePaused }}>
    <div ref={root} data-motion-state={reduced ? 'reduced' : paused ? 'paused' : enabled ? 'active' : 'fallback'}>{children}</div>
  </MotionContext.Provider>;
}

export function MotionToggle() {
  const { paused, reduced, ready, togglePaused } = useLandingMotion();
  if (!ready || reduced) return null;
  return <button type="button" className="motion-toggle" aria-pressed={paused} onClick={togglePaused}>
    {paused ? 'Resume animations' : 'Pause animations'}
  </button>;
}
