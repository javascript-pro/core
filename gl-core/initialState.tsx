// /Users/goldlabel/GitHub/core/gl-core/initialState.tsx

import pJSON from '../package.json';
import config from './config.json';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
import { initialStateFlash } from './cartridges/Flash';

export const initialState: any = {
  config,
  version: pJSON.version,
  persisted: Date.now(),
  globalNav: null,
  themeMode: null,
  feedback: null,
  flash: initialStateFlash,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
};
