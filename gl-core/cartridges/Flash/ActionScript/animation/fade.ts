// ActionScript/animation/fade.ts

import { gsap } from 'gsap';

export type TFade = {
  fadeInOut: 'in' | 'out';
  duration?: number; // optional, in seconds
};

export const fade = (divId: string, options: TFade = { fadeInOut: 'in' }) => {
  const el = document.getElementById(divId);

  if (!el) {
    console.warn(`fade: div id "${divId}" not found`);
    return;
  }

  const { fadeInOut, duration = 0.6 } = options;

  gsap.to(el, {
    duration,
    opacity: fadeInOut === 'in' ? 1 : 0,
    ease: 'power2.out',
    onStart: () => {
      if (fadeInOut === 'in') {
        el.style.display = 'block'; // ensure it's visible before fading in
      }
    },
    onComplete: () => {
      if (fadeInOut === 'out') {
        el.style.display = 'none'; // hide after fade out
      }
    },
  });
};
