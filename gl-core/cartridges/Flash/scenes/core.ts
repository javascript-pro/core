// scenes/core.ts

import { setPosition, fade, setOpacity } from '../ActionScript';

export const init = (
  // divId: string,
) => {
  setScene();
};

const setScene = () => {

  setPosition('ad', {
    screenPosition: 'middle-middle',
    offsetX: 35,
    offsetY: 35,
  });
  setOpacity('ad', { opacity: 1 });
  fade('ad', { fadeInOut: 'out' });

  setPosition('content', {
    screenPosition: 'top-middle',
  });
  fade('content', { fadeInOut: 'in' }); 
};


  // setTimeout(() => {
  // }, 500)
