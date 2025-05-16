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
  setPosition('header', {
    screenPosition: 'top-middle',
  });
  fade('header', { fadeInOut: 'in' });
  setPosition('image', {
    screenPosition: 'top-middle',
    offsetY: 80,
  });
  fade('image', { fadeInOut: 'in' });
  setPosition('breadcrumb', {
    screenPosition: 'middle-right',
    offsetY: 90,
    offsetX: 10,
  });
  fade('breadcrumb', { fadeInOut: 'in' });
  setPosition('body', {
    screenPosition: 'middle-middle',
    offsetY: 110,
  });
  fade('body', { fadeInOut: 'in' });  
};



  // setTimeout(() => {
  // }, 500)
