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
    const positionCursor = (char?: HTMLElement) => {
      if (!cursor) return;
      const rootRect = node.getBoundingClientRect();
      if (!char) {
        const firstChar = first[0] as HTMLElement | undefined;
        if (firstChar) {
          const r = firstChar.getBoundingClientRect();
          cursor.style.left = `${r.left - rootRect.left}px`;
          cursor.style.top = `${r.top - rootRect.top}px`;
        }
        return;
      }
      const r = char.getBoundingClientRect();
      cursor.style.left = `${r.right - rootRect.left}px`;
      cursor.style.top = `${r.top - rootRect.top}px`;
    };
    if (!enabled || completed.current) {
      completed.current = true;
      gsap.set([...first, ...second], { visibility: 'visible' });
      if (cursor) {
        cursor.style.removeProperty('left');
        cursor.style.removeProperty('top');
      }
      setState(enabled ? 'complete' : 'static');
      return;
    }
    setState('typing');
    gsap.set([...first, ...second], { visibility: 'hidden' });
    positionCursor();
    const reveal = (characters: NodeListOf<Element>, duration: number) => {
      const progress = { count: 0 };
      let shown = 0;
      return { progress, vars: { count: characters.length, duration, ease: 'none', onUpdate: () => {
        const count = Math.floor(progress.count);
        for (; shown < count; shown++) {
          const el = characters[shown] as HTMLElement;
          el.style.visibility = 'visible';
          positionCursor(el);
        }
      } } };
    };
    const main = reveal(first, 2.4), reply = reveal(second, 0.6);
    const finish = () => {
      completed.current = true;
      setState('complete');
      if (cursor) {
        cursor.style.removeProperty('left');
        cursor.style.removeProperty('top');
      }
    };
    const timeline = gsap.timeline({ onComplete: finish });
    timeline.to(main.progress, main.vars).to(reply.progress, reply.vars, '+=0.15');
    return () => {
      completed.current = true;
      if (cursor) {
        cursor.style.removeProperty('left');
        cursor.style.removeProperty('top');
      }
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
