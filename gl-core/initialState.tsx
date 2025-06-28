import pJSON from '../package.json';
import config from './config.json';
import { initialStateCV } from './cartridges/CV';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateLingua } from './cartridges/Lingua';
import { initialStateFallmanager } from './cartridges/Fallmanager';
import { initialStateBouncer } from './cartridges/Bouncer';

export const initialState: any = {
  bouncer: initialStateBouncer,
  fallmanager: initialStateFallmanager,
  cv: initialStateCV,
  flickr: initialStateFlickr,
  lingua: initialStateLingua,
  version: pJSON.version,
  persisted: Date.now(),
  config,
  themeMode: 'dark',
  loading: null,
  feedback: null,
};
