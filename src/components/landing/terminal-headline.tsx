'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from './gsap';
import { useLandingMotion } from './motion-provider';

export function TerminalHeadline({ sentence, response }: { sentence: string; response: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const completed = useRef(false);
  const { enabled, ready } = useLandingMotion();
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [state, setState] = useState<'typing' | 'complete' | 'static'>('static');

  useEffect(() => {
    const node = root.current!;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    const visibility = () => setForeground(!document.hidden);
    observer.observe(node);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useGSAP(() => {
    if (!ready) return;
    const node = root.current!;
    const first = node.querySelectorAll('[data-terminal-sentence] [data-terminal-character]');
    const second = node.querySelectorAll('[data-terminal-response] [data-terminal-character]');
    const cursor = node.querySelector<HTMLElement>('[data-terminal-cursor]');
    const positions = new Map<HTMLElement, { x: number; y: number }>();
    let start = { x: 0, y: 0 };
    let last: HTMLElement | undefined;
    let geometry = '';
    const move = cursor ? gsap.quickSetter(cursor, 'css') : undefined;
    const positionCursor = (char?: HTMLElement) => {
      last = char;
      const position = char ? positions.get(char) : start;
      if (position) move?.({ ...position, force3D: true });
    };
    const measure = () => {
      const rootRect = node.getBoundingClientRect();
      const next = `${rootRect.width},${rootRect.height}`;
      if (next === geometry) return;
      geometry = next;
      [...first, ...second].forEach((element, index) => {
        const r = element.getBoundingClientRect();
        positions.set(element as HTMLElement, { x: r.right - rootRect.left, y: r.top - rootRect.top });
        if (index === 0) start = { x: r.left - rootRect.left, y: r.top - rootRect.top };
      });
      positionCursor(last);
    };
    if (!enabled || completed.current) {
      completed.current = true;
      gsap.set([...first, ...second], { visibility: 'visible' });
      setState(enabled ? 'complete' : 'static');
      return;
    }
    setState('typing');
    gsap.set([...first, ...second], { visibility: 'hidden' });
    if (cursor) gsap.set(cursor, { x: 0, y: 0, force3D: true });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    const reveal = (characters: NodeListOf<Element>, duration: number) => {
      const progress = { count: 0 };
      let shown = 0;
      return { progress, vars: { count: characters.length, duration, ease: 'none', onUpdate: () => {
        const count = Math.floor(progress.count);
        for (; shown < count; shown++) {
          const el = characters[shown] as HTMLElement;
          el.style.visibility = 'visible';
        }
        if (count) positionCursor(characters[count - 1] as HTMLElement);
      } } };
    };
    const main = reveal(first, 2.4), reply = reveal(second, 0.6);
    const finish = () => {
      completed.current = true;
      observer.disconnect();
      setState('complete');
      if (cursor) gsap.set(cursor, { clearProps: 'transform' });
    };
    const timeline = gsap.timeline({ onComplete: finish });
    timeline.to(main.progress, main.vars).to(reply.progress, reply.vars, '+=0.9');
    return () => {
      completed.current = true;
      observer.disconnect();
    };
  }, { scope: root, dependencies: [enabled, ready], revertOnUpdate: true });

  const characters = (text: string) => Array.from(text).map((character, index) =>
    <span key={index} data-terminal-character>{character}</span>);
  return <span ref={root} className="terminal-headline" data-typing-state={state}>
    <span className="sr-only">{sentence} {response}</span>
    <span aria-hidden="true" data-terminal-sentence>{characters(sentence)}</span>
    <em aria-hidden="true" data-terminal-response>{characters(response)}<span data-terminal-cursor data-cursor-blinking={enabled && visible && foreground}>_</span></em>
  </span>;
}
