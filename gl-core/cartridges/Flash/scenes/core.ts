// scenes/core.ts

/**
 * This is the scene manager for the Flash runtime.
 * It defines layout and actions for the initial scene using ActionScript helpers.
 */

import { setPosition, fade, setOpacity } from '../ActionScript';

const clips = [
  'redux',
  'rehydrate-ad',
  'flash-main',
];

export const init = (divId: string) => {
//   console.log(`[core.ts] inits: ${divId}`);
  setScene();
};

const setScene = () => {

  
  setPosition('flash-main', { 
            screenPosition: 'middle-middle',
        });
  setOpacity('flash-main', { opacity: 1 });

  setPosition('rehydrate-ad', { 
            screenPosition: 'middle-middle',
            offsetX: 35,
            offsetY: 35,
        });
  setOpacity('rehydrate-ad', { opacity: 1 });
  fade('rehydrate-ad', { fadeInOut: 'out'});
  
};
