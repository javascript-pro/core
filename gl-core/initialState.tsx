import pJSON from '../package.json';
import config from './config.json';
import { initialStateCV } from './cartridges/CV';
import { initialStateFlickr } from './cartridges/Flickr';
import { initialStateFallmanager } from './cartridges/Fallmanager';
import { initialStateBouncer } from './cartridges/Bouncer';

export const initialState: any = {
  bouncer: initialStateBouncer,
  fallmanager: initialStateFallmanager,
  cv: initialStateCV,
  flickr: initialStateFlickr,
  version: pJSON.version,
  persisted: Date.now(),
  config,
  isLoading: false,
  themeMode: 'light',
  feedbackHidden: false,
  feedback: null,
};
