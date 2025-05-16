// ActionScript/animation/setPosition.ts

export type TSetPosition = {
  screenPosition?: string; // e.g. "top-left", "middle-right"
  offsetX?: number;        // fine-tune horizontal position (default: 0)
  offsetY?: number;        // fine-tune vertical position (default: 0)
};

export const setPosition = (divId: string, options: TSetPosition) => {
  const el = document.getElementById(divId);
  if (!el) {
    console.warn(`setPosition: div id "${divId}" not found`);
    return;
  }

  const {
    screenPosition = 'top-left',
    offsetX = 0,
    offsetY = 0,
  } = options;

  const { top, left } = getCenteredPosition(screenPosition, el, offsetX, offsetY);

  el.style.position = 'absolute';
  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
};

const getCenteredPosition = (
  position: string,
  element: HTMLElement,
  offsetX: number,
  offsetY: number
): { top: number; left: number } => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = element.offsetWidth;
  const h = element.offsetHeight;

  const [vertical, horizontal] = position.split('-');

  let top = 0;
  let left = 0;

  switch (vertical) {
    case 'top':
      top = 0 + h / 2;
      break;
    case 'middle':
      top = vh / 2;
      break;
    case 'bottom':
      top = vh - h / 2;
      break;
    default:
      top = vh / 2;
  }

  switch (horizontal) {
    case 'left':
      left = 0 + w / 2;
      break;
    case 'middle':
      left = vw / 2;
      break;
    case 'right':
      left = vw - w / 2;
      break;
    default:
      left = vw / 2;
  }

  return {
    top: top - h / 2 + offsetY,
    left: left - w / 2 + offsetX,
  };
};
