type ScrollHandler = (target: HTMLElement, immediate: boolean) => Promise<void>;
let landingScroll: ScrollHandler | undefined;

export function getNavigationClearance(): number {
  return (document.querySelector('nav')?.getBoundingClientRect().height ?? 80) + 16;
}

export function registerLandingScroll(handler: ScrollHandler): () => void {
  landingScroll = handler;
  return () => { if (landingScroll === handler) landingScroll = undefined; };
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
