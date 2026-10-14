import { gsap } from './gsap';

/** The browser owns gestures/inertia. No touch handlers, pinning or scroll scrub. */
export function setupTeamsCarousel(node: HTMLElement, animated: boolean) {
  const rail = node.querySelector<HTMLElement>('[data-teams-grid]')!;
  const slots = [...node.querySelectorAll<HTMLElement>('[data-team-slot]')];
  const cards = [...node.querySelectorAll<HTMLElement>('[data-team-card]')];
  const dots = [...node.querySelectorAll<HTMLButtonElement>('[data-team-dot]')];
  const controls = node.querySelector<HTMLElement>('[data-team-controls]')!;
  // Seed a context-owned set so matchMedia also reverts quickSetter styles.
  gsap.set(cards, { xPercent: 0, scale: 1, rotationY: 0, opacity: 1, force3D: true });
  const setters = cards.map(card => gsap.quickSetter(card, 'css'));
  let centers: number[] = [];
  let steps: number[] = [];
  let width = 0;
  let active = -1;
  let frame = 0;
  const render = () => {
    frame = 0;
    const center = rail.scrollLeft + width / 2;
    let nearest = 0;
    let distance = Infinity;
    centers.forEach((position, index) => {
      const delta = position - center;
      if (Math.abs(delta) < distance) { distance = Math.abs(delta); nearest = index; }
      if (animated) {
        const progress = Math.abs(delta) < 1 ? 0 : gsap.utils.clamp(-1, 1, delta / steps[index]);
        const depth = Math.abs(progress);
        setters[index]({ xPercent: -progress * 12, scale: 1 - depth * .1,
          rotationY: -progress * 12, opacity: 1 - depth * .12, force3D: true });
      }
    });
    if (active !== nearest) {
      active = nearest;
      cards.forEach((card, index) => {
        card.dataset.teamActive = String(index === active);
        dots[index].setAttribute('aria-current', String(index === active));
      });
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  const measure = () => {
    width = rail.clientWidth;
    centers = slots.map(slot => slot.offsetLeft + slot.offsetWidth / 2);
    steps = slots.map(slot => slot.offsetWidth + 16);
    schedule();
  };
  const navigate = (index: number) => {
    rail.scrollTo({ left: centers[index] - width / 2, behavior: animated ? 'smooth' : 'instant' });
  };
  const tap = (event: MouseEvent) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-team-dot]');
    if (button) navigate(dots.indexOf(button));
  };
  const keyboard = (event: KeyboardEvent) => {
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1
      : event.key === 'ArrowRight' ? Math.min(cards.length - 1, active + 1)
      : event.key === 'ArrowLeft' ? Math.max(0, active - 1) : undefined;
    if (next === undefined) return;
    event.preventDefault();
    navigate(next);
  };
  node.dataset.teamsMode = 'carousel';
  node.dataset.carouselReady = 'true';
  rail.setAttribute('aria-roledescription', 'carousel');
  rail.setAttribute('tabindex', '0');
  measure();
  const observer = new ResizeObserver(measure);
  observer.observe(rail);
  slots.forEach(slot => observer.observe(slot));
  rail.addEventListener('scroll', schedule, { passive: true });
  rail.addEventListener('keydown', keyboard);
  controls.addEventListener('click', tap);
  return () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    rail.removeEventListener('scroll', schedule);
    rail.removeEventListener('keydown', keyboard);
    controls.removeEventListener('click', tap);
    rail.removeAttribute('aria-roledescription');
    rail.removeAttribute('tabindex');
    delete node.dataset.carouselReady;
    node.dataset.teamsMode = 'static';
    cards.forEach(card => delete card.dataset.teamActive);
  };
}
