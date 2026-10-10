type ScrollHandler = (target: HTMLElement, immediate: boolean) => Promise<void>;
let landingScroll: ScrollHandler | undefined;

export function getNavigationClearance(): number {
  return (document.querySelector('nav')?.getBoundingClientRect().height ?? 80) + 16;
}

export function registerLandingScroll(handler: ScrollHandler): () => void {
  landingScroll = handler;
  return () => { if (landingScroll === handler) landingScroll = undefined; };
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
  const top = target?.getBoundingClientRect().top;
  change();
  if (target && top !== undefined) requestAnimationFrame(() => {
    if (target.isConnected) window.scrollTo({ top: scrollY + target.getBoundingClientRect().top - top, behavior: 'instant' });
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
