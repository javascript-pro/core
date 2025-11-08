// /Users/goldlabel/GitHub/core/gl-core/initialState.tsx

import pJSON from '../package.json';
import config from './config.json';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
import { initialStatePings } from './cartridges/Pings';
import { initialStateFlash } from './cartridges/Flash';
import { initialStatePaywall } from './cartridges/Paywall';

export const initialState: any = {
  config,
  version: pJSON.version,
  persisted: Date.now(),
  globalNav: null,
  themeMode: null,
  feedback: null,
  pings: initialStatePings,
  flash: initialStateFlash,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
  paywall: initialStatePaywall,
};
