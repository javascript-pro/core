import { gsap } from 'gsap';

export type TMoveTo = {
  screenPosition?: string; // e.g. "middle-right"
};

export const moveTo = (divId: string, options: TMoveTo) => {
  const el = document.getElementById(divId);
  if (!el) {
    console.warn(`moveTo: no element found with id "${divId}"`);
    return;
  }

  const { screenPosition = 'top-left' } = options;

  const { top, left } = getCoordsFromScreenPosition(screenPosition, el);

  gsap.to(el, {
    duration: 0.6,
    top,
    left,
    ease: 'power2.out',
  });
};

const getCoordsFromScreenPosition = (
  position: string,
  element: HTMLElement
): { top: number; left: number } => {
  const { innerWidth: vw, innerHeight: vh } = window;
  const { offsetWidth: w, offsetHeight: h } = element;

  const [vertical, horizontal] = position.split('-');

  let top = 0;
  let left = 0;

  switch (vertical) {
    case 'top':
      top = 0;
      break;
    case 'middle':
      top = (vh - h) / 2;
      break;
    case 'bottom':
      top = vh - h;
      break;
  }

  switch (horizontal) {
    case 'left':
      left = 0;
      break;
    case 'middle':
      left = (vw - w) / 2;
      break;
    case 'right':
      left = vw - w;
      break;
  }

  return { top, left };
};
