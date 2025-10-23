// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/index.tsx
import { initialState as initialStateFlash } from './initialState';
import Flash from './Flash';
import System from './lib/System';
import Trace from './lib/Trace';

import MovieClip from './lib/MovieClip';
import Stage from './components/Stage';
import Controls from './components/Controls';

// Movies
import { Logo } from './movies/Logo';
import { Pingpong } from './movies/Pingpong';
import { Timemachine } from './movies/Timemachine';

// State
import { useFlash } from './hooks/useFlash';
import { setFlashKey } from './actions/setFlashKey';

// optional
import { setSystemKey } from './actions/setSystemKey';
import { subMUITheme } from './lib/subMUITheme';
import Icon from './lib/Icon';
import { setUbereduxKey } from './lib/store';
import UbereduxProvider from './lib/UbereduxProvider';
import { useRedux } from './hooks/useRedux';
import { useConfig } from './hooks/useConfig';
import { useSystem } from './hooks/useSystem';
import { useDispatch } from './hooks/useDispatch';
import { useIsMobile } from './hooks/useIsMobile';
import { usePrefersColorScheme } from './hooks/usePrefersColorScheme';

export { Logo, Pingpong, Timemachine };

export { initialStateFlash, Flash, System, Trace, Stage, MovieClip, Controls };
// optional
export {
  setUbereduxKey,
  Icon,
  subMUITheme,
  UbereduxProvider,
  setSystemKey,
  useRedux,
  useSystem,
  useDispatch,
  useIsMobile,
  useConfig,
  usePrefersColorScheme,
  useFlash,
  setFlashKey,
};
