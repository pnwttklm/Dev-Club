type ScrollHandler = (target: HTMLElement, immediate: boolean) => Promise<void>;
let landingScroll: ScrollHandler | undefined;
type ScrollRuntime = { refresh: () => void; synchronize: () => void };
let landingRuntime: ScrollRuntime | undefined;
let readingAnchor: { target: HTMLElement; top: number } | undefined;
let restorationFrame: number | undefined;

export function getNavigationClearance(): number {
  return (document.querySelector('nav')?.getBoundingClientRect().height ?? 80) + 16;
}

export function registerLandingScroll(handler: ScrollHandler, runtime?: ScrollRuntime): () => void {
  landingScroll = handler;
  landingRuntime = runtime;
  return () => {
    if (landingScroll === handler) { landingScroll = undefined; landingRuntime = undefined; }
  };
}

// Preference/layout changes may remove pin spacing above the current view.
export function preserveViewportPosition(change: () => void): void {
  const hit = document.elementFromPoint(innerWidth / 2, getNavigationClearance() + 8);
  let target = hit?.closest<HTMLElement>('[data-benefits-mode], section[id]');
  if (target?.id === 'teams') {
    // The section's top cannot preserve a paragraph while a deck card returns
    // to its ordinary grid slot. Anchor an exposed face instead.
    const visible = [...target.querySelectorAll<HTMLElement>('[data-team-card]')]
      .filter(card => card.dataset.teamFace !== 'back')
      .map(card => ({ card, rect: card.getBoundingClientRect() }))
      .filter(({ rect }) => rect.bottom > getNavigationClearance() && rect.top < innerHeight)
      .sort((a, b) => Math.abs(a.rect.top - getNavigationClearance()) - Math.abs(b.rect.top - getNavigationClearance()));
    target = visible[0]?.card ?? target;
  }
  // Upstream and downstream refits can run in the same frame. Keep the first
  // reading anchor until both have finished, rather than restoring two poses.
  if (!readingAnchor && target) readingAnchor = { target, top: target.getBoundingClientRect().top };
  change();
  if (readingAnchor && restorationFrame === undefined) restorationFrame = requestAnimationFrame(() => {
    const anchor = readingAnchor;
    readingAnchor = undefined;
    restorationFrame = undefined;
    if (anchor?.target.isConnected) {
      // Finish any reverted pin measurements before computing the final pose.
      // A queued refresh must subsequently record this restored scroll value.
      landingRuntime?.refresh();
      window.scrollTo({ top: scrollY + anchor.target.getBoundingClientRect().top - anchor.top, behavior: 'instant' });
      landingRuntime?.synchronize();
    }
  });
}

export async function navigateToSection(id: string, options: {
  history?: 'push' | 'replace' | 'none'; immediate?: boolean; focus?: boolean;
} = {}): Promise<void> {
  const target = document.getElementById(id);
  if (!target) return;
  if (options.history !== 'none' && location.hash !== `#${id}`) {
    history[options.history === 'replace' ? 'replaceState' : 'pushState'](null, '', `/#${id}`);
  }
  if (options.focus !== false) {
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }
  const immediate = options.immediate || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (landingScroll) await landingScroll(target, !!immediate);
  else window.scrollTo({
    top: Math.max(0, target.getBoundingClientRect().top + scrollY - getNavigationClearance()),
    behavior: immediate ? 'instant' : 'smooth',
  });
}
