// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/index.tsx
import Flash from './Flash';
import { initialState as initialStateFlash } from './initialState';
import { Stage } from './components';
import { useFlash } from './hooks';
import { init } from './actions';
import { pingpongball } from './actionscript';
import Pingpongball from './movieclips/Pingpongball';

export { initialStateFlash, Flash, Stage };
export { useFlash };
export { init };
export { pingpongball, Pingpongball };
