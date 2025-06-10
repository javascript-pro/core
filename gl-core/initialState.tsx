import pJSON from '../package.json';
import config from './config.json';
import { CVinitialState } from './cartridges/CV';
import { FlashinitialState } from './cartridges/Flash';
import { FlickrinitialState } from './cartridges/Flickr';
import { initialStateFallmanager } from './cartridges/Fallmanager';
import { initialStateAdmin } from './cartridges/Admin';
import { initialStateBouncer } from './cartridges/Bouncer';

// TFeedback

export const initialState: any = {
  version: pJSON.version,
  persisted: Date.now(),
  config,
  feedbackHidden: false,
  feedback: null,
  feedback_: {
    title: 'Oh no',
    description: "Bollixing' bollix",
    severity: 'error',
  },
  admin: initialStateAdmin,
  bouncer: initialStateBouncer,
  fallmanager: initialStateFallmanager,
  cv: CVinitialState,
  flash: FlashinitialState,
  flickr: FlickrinitialState,
};
