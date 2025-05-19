// scenes/core.ts

import { setPosition, fade, setOpacity } from '../ActionScript';

export const init = () => {
  setScene();
};

const playNextPrevious = () => {
  console.log('playNextPrevious');
  setPosition('nextprev', {
    screenPosition: 'bottom-left',
  });
  fade('nextprev', {
    fadeInOut: 'in',
    duration: 2,
  });
};

const setScene = () => {
  fade('content', { fadeInOut: 'in' });
  setPosition('click-here', { screenPosition: 'bottom-right' });
  fade('click-here', { fadeInOut: 'in' });
  playNextPrevious();
};
