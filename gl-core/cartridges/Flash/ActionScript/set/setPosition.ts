export type TSetPosition = {
  screenPosition?: string; // e.g. "top-left", "middle-right"
  offsetX?: number | string; // px number or CSS string like '10%'
  offsetY?: number | string;
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

  const coords = getCenteredPosition(screenPosition, el, offsetX, offsetY);

  el.style.position = 'absolute';

  // If offset is a string, apply it as-is
  el.style.top = typeof coords.top === 'number' ? `${coords.top}px` : coords.top;
  el.style.left = typeof coords.left === 'number' ? `${coords.left}px` : coords.left;
};

const getCenteredPosition = (
  position: string,
  element: HTMLElement,
  offsetX: number | string,
  offsetY: number | string
): { top: number | string; left: number | string } => {
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
    top: typeof offsetY === 'number' ? top - h / 2 + offsetY : `calc(${top - h / 2}px + ${offsetY})`,
    left: typeof offsetX === 'number' ? left - w / 2 + offsetX : `calc(${left - w / 2}px + ${offsetX})`,
  };
};
