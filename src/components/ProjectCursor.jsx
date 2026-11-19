import { useEffect, useRef } from 'react';

export default function ProjectCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const move = (event) => {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-project', Boolean(event.target.closest('[data-project-card]')));
    };
    const hide = (event) => {
      if (!event.relatedTarget) cursor.classList.remove('is-visible', 'is-project');
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', hide);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', hide);
    };
  }, []);

  return <span className="project-cursor" ref={cursorRef} aria-hidden="true" />;
}
