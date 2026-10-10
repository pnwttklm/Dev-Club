type ScrollHandler = (target: HTMLElement, immediate: boolean) => Promise<void>;
let landingScroll: ScrollHandler | undefined;
type ScrollRuntime = { refresh: () => void; synchronize: () => void };
let landingRuntime: ScrollRuntime | undefined;
let readingAnchor: { target: HTMLElement; top: number; pin?: { node: HTMLElement; offset: number; duration: number } } | undefined;
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
export function preserveViewportPosition(change: () => void, preserveDownstreamPin = false): void {
  const hit = document.elementFromPoint(innerWidth / 2, getNavigationClearance() + 8);
  let target = hit?.closest<HTMLElement>('[data-benefits-mode], section[id]');
  if (target?.id === 'teams') {
    // The section's top cannot preserve a paragraph while a deck card returns
    // to its ordinary grid slot. Anchor an exposed face instead.
    const visible = [...target.querySelectorAll<HTMLElement>('[data-team-card]')]
      .filter(card => card.dataset.teamFace !== 'back')
      .map(card => ({ card, rect: card.getBoundingClientRect() }))
      .filter(({ rect }) => rect.bottom > getNavigationClearance() && rect.top < innerHeight)
      .filter(({ card, rect }) => Math.min(rect.bottom, innerHeight) - Math.max(rect.top, getNavigationClearance()) >= 44
        || [...card.querySelectorAll('[data-team-copy] p, [data-team-copy] h3')].some(copy => {
        const rect = copy.getBoundingClientRect(); return rect.bottom > getNavigationClearance() && rect.top < innerHeight;
      }))
      .sort((a, b) => Number(a.card.dataset.teamFace === 'moving') - Number(b.card.dataset.teamFace === 'moving')
        || Math.abs(a.rect.top - getNavigationClearance()) - Math.abs(b.rect.top - getNavigationClearance()));
    const card = visible[0]?.card;
    // Keep the reader's visible paragraph stable when scene geometry changes.
    target = card ? [...card.querySelectorAll<HTMLElement>('[data-team-copy] p'), ...card.querySelectorAll<HTMLElement>('[data-team-copy] h3')]
      .find(copy => { const rect = copy.getBoundingClientRect(); return rect.bottom > getNavigationClearance() && rect.top < innerHeight; }) ?? card : target;
  }
  // Upstream and downstream refits can run in the same frame. Keep the first
  // reading anchor until both have finished, rather than restoring two poses.
  if (!readingAnchor && target) {
    const node = preserveDownstreamPin ? target.closest('section')?.querySelector<HTMLElement>('.teams-scene') : undefined;
    const start = Number(node?.dataset.sceneStart), end = Number(node?.dataset.sceneEnd);
    const pin = node && scrollY >= start && scrollY <= end ? { node, offset: scrollY - start, duration: end - start } : undefined;
    readingAnchor = { target, top: target.getBoundingClientRect().top, pin };
  }
  change();
  if (readingAnchor && restorationFrame === undefined) restorationFrame = requestAnimationFrame(() => {
    const anchor = readingAnchor;
    readingAnchor = undefined;
    restorationFrame = undefined;
    if (anchor?.target.isConnected) {
      // Finish any reverted pin measurements before computing the final pose.
      // A queued refresh must subsequently record this restored scroll value.
      landingRuntime?.refresh();
      const pin = anchor.pin;
      const start = Number(pin?.node.dataset.sceneStart), end = Number(pin?.node.dataset.sceneEnd);
      // An upstream refit temporarily changes the downstream scrub pose. Keep
      // its scroll offset when the same pin survives; text anchors still handle
      // Pause, reduced motion and layout changes that remove/rebuild the scene.
      const top = pin && Math.abs(end - start - pin.duration) < 1
        ? start + pin.offset : scrollY + anchor.target.getBoundingClientRect().top - anchor.top;
      window.scrollTo({ top, behavior: 'instant' });
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
