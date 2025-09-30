// /Users/goldlabel/GitHub/core/gl-core/initialState.tsx
// import { TCoreState } from './types';
import pJSON from '../package.json';
import config from './config.json';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
import { initialStateBouncer } from './cartridges/Bouncer';
import { initialStateFlash } from './cartridges/Flash';

export const initialState: any = {
  config,
  version: pJSON.version,
  persisted: Date.now(),
  themeMode: null,
  feedback: null,
  bouncer: initialStateBouncer,
  flash: initialStateFlash,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
  globalNav: null,
};
