import pJSON from '../../../package.json';
import config from '../../config.json';
import { CVinitialState } from '../CV';
import { FlashinitialState } from '../Flash';
import { FlickrinitialState } from '../Flickr';

import { initialStateFallmanager } from '../Fallmanager';
import { initialStateAdmin } from '../Admin';
import { initialStateBouncer } from '../Bouncer';

export const initialState: any = {
  persisted: Date.now(),
  config,
  version: pJSON.version,
  themeMode: 'light',
  admin: initialStateAdmin,
  bouncer: initialStateBouncer,
  fallmanager: initialStateFallmanager,
  cv: CVinitialState,
  flash: FlashinitialState,
  flickr: FlickrinitialState,
};
