// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/index.tsx
import Flash from './Flash';
import { initialReduxFlash } from './initialReduxFlash';

import { Stage } from './components';
import { useFlash } from './hooks';
import { init, setFlashKey } from './actions';
import { intro } from './actionscript';
import Pingpongball from './movieclips/Pingpongball';
import MacromediaMC from './movieclips/MacromediaMC';
import Presenter from './movieclips/Presenter';

export { initialReduxFlash, Flash, Stage };
export { useFlash };
export { init, setFlashKey };
export { Pingpongball };
export { intro, MacromediaMC, Presenter };
