// scenes/core.ts

import { setPosition, fade, setOpacity } from '../ActionScript';

export const init = () => {
  setScene();
};

const playTest = () => {
  // console.log('playTest');
  setPosition('testclip', { screenPosition: 'top-right' });
  fade('testclip', { fadeInOut: 'in', duration: 1 });
};

const setScene = () => {
  fade('content', { fadeInOut: 'in' });
  setPosition('click-here', { screenPosition: 'bottom-right' });
  fade('click-here', { fadeInOut: 'in' });
  playTest();
};
