// scenes/core.ts

import { setPosition, fade, setOpacity } from '../ActionScript';

export const init = () =>
  {
    setScene();
  };

const setScene = () => {

  setOpacity('ad', { opacity: 1 });
  fade('ad', { fadeInOut: 'out' });
  fade('content', { fadeInOut: 'in' });

  setPosition('click-here', { screenPosition: 'bottom-right'});
  fade('click-here', { fadeInOut: 'in' });
};
