import pJSON from '../package.json';
import config from './config.json';
import { initialStateCV } from './cartridges/CV';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
import { initialStateBouncer } from './cartridges/Bouncer';
import { initialStateAdmin } from './cartridges/Admin';
// import { initialReduxFlash } from './cartridges/Flash/initialReduxFlash';

export const initialState: any = {
  config,
  version: pJSON.version,
  persisted: Date.now(),
  themeMode: 'light',
  loading: null,
  feedback: null,
  hideImage: false,
  bouncer: initialStateBouncer,
  cv: initialStateCV,
  // flash: initialReduxFlash,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
  admin: initialStateAdmin,
};
