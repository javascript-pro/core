import pJSON from '../../../package.json';
import config from '../../config.json';
import { CVinitialState } from '../CV';
import { FlashinitialState } from '../Flash';
import { FlickrinitialState } from '../Flickr';
import { BouncerinitialState } from '../Bouncer';
import { NewCartridgeinitialState } from '../NewCartridge';
import { FallmanagerinitialState } from '../Fallmanager';
import { initialStateAdmin } from '../Admin';

export const initialState: any = {
  persisted: Date.now(),
  config,
  version: pJSON.version,
  themeMode: 'dark',
  admin: initialStateAdmin,
  cv: CVinitialState,
  flash: FlashinitialState,
  flickr: FlickrinitialState,
  bouncer: BouncerinitialState,
  newcartridge: NewCartridgeinitialState,
  fallmanager: FallmanagerinitialState,
};
