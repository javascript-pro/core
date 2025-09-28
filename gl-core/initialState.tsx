// /Users/goldlabel/GitHub/core/gl-core/initialState.tsx
// import { CoreState } from './types';
import pJSON from '../package.json';
import config from './config.json';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
// import { initialStateAdmin } from './cartridges/Admin';
import { initialStateFlash } from './cartridges/Flash';

export const initialState: any = {
  config,
  version: pJSON.version,
  persisted: Date.now(),
  themeMode: 'dark',
  loading: null,
  feedback: null,
  flash: initialStateFlash,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
  // admin: initialStateAdmin,
};
