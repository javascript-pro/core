export type TSetPosition = {
  screenPosition?: string; // e.g. "top-left", "middle-right", or "center"
};

/*
Supported Values for screenPosition:
'top-left'
'top-middle'
'top-right'
'middle-left'
'middle-middle' or 'center'
'middle-right'
'bottom-left'
'bottom-middle'
'bottom-right'
*/

export const setPosition = (divId: string, options: TSetPosition = {}) => {
  requestAnimationFrame(() => {
    const el = document.getElementById(divId);
    if (!el) {
      console.warn(`setPosition: div id "${divId}" not found`);
      return;
    }

    const { screenPosition = 'top-left' } = options;
    const coords = getPosition(screenPosition, el);

    el.style.position = 'absolute';
    el.style.top = `${coords.top}px`;
    el.style.left = `${coords.left - window.innerWidth / 2}px`;
  });
};

const normalizePosition = (pos: string): string => {
  return pos === 'center' ? 'middle-middle' : pos;
};

const getPosition = (
  position: string,
  el: HTMLElement,
): { top: number; left: number } => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = el.offsetWidth;
  const h = el.offsetHeight;

  const [vAlign = 'middle', hAlign = 'middle'] =
    normalizePosition(position).split('-');

  let top = 0;
  let left = 0;

  // Vertical alignment
  switch (vAlign) {
    case 'top':
      top = 0;
      break;
    case 'middle':
      top = vh / 2 - h / 2;
      break;
    case 'bottom':
      top = vh - h;
      break;
  }

  // Horizontal alignment
  switch (hAlign) {
    case 'left':
      left = 0;
      break;
    case 'middle':
      left = vw / 2 - w / 2;
      break;
    case 'right':
      left = vw - w;
      break;
  }

  return { top, left };
};
