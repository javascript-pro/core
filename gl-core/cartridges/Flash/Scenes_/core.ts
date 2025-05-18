// scenes/core.ts

import { setPosition, fade, setOpacity } from '../ActionScript';

export const init = () => {
  setScene();
};

const setScene = () => {
  fade('content', { fadeInOut: 'in' });
  setPosition('click-here', { screenPosition: 'bottom-right' });
  fade('click-here', { fadeInOut: 'in' });
};
