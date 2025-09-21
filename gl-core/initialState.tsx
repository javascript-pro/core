import pJSON from '../package.json';
import config from './config.json';
import { initialStateCV } from './cartridges/CV';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
import { initialStateBouncer } from './cartridges/Bouncer';
import { initialStateAdmin } from './cartridges/Admin';
import { initialStateFlash } from './cartridges/Flash';

export const initialState: any = {
  themeMode: 'light',
  bouncer: initialStateBouncer,
  cv: initialStateCV,
  flash: initialStateFlash,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
  admin: initialStateAdmin,
  version: pJSON.version,
  persisted: Date.now(),
  config,
  loading: null,
  feedback: null,
  hideImage: false,
};
