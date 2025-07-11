import pJSON from '../package.json';
import config from './config.json';
import { initialStateCV } from './cartridges/CV';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
import { initialStateBouncer } from './cartridges/Bouncer';
import { initialStateFallmanager } from './cartridges/Fallmanager';

export const initialState: any = {
  themeMode: 'light',
  fallmanager: initialStateFallmanager,
  bouncer: initialStateBouncer,
  cv: initialStateCV,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
  version: pJSON.version,
  persisted: Date.now(),
  config,
  loading: null,
  feedback: null,
  hideImage: true,
};
