// scenes/core.ts

/**
 * This is the scene manager for the Flash runtime.
 * It defines layout and actions for the initial scene using ActionScript helpers.
 */

import { setPosition, fade, setOpacity } from '../ActionScript';

// const clips = ['redux', 'rehydrate-ad', 'body'];

export const init = (
  // divId: string,
) => {
  setScene();
};

const setScene = () => {

  setPosition('rehydrate-ad', {
    screenPosition: 'middle-middle',
    offsetX: 35,
    offsetY: 35,
  });
  setOpacity('rehydrate-ad', { opacity: 1 });
  fade('rehydrate-ad', { fadeInOut: 'out' });

  setPosition('nav', {
    screenPosition: 'bottom-left',
    
  });
  fade('nav', { fadeInOut: 'in' });

  setTimeout(() => {
    setPosition('body', {
      screenPosition: 'top-left',
    });
    fade('body', { fadeInOut: 'in' });
  }, 500)

  
};
