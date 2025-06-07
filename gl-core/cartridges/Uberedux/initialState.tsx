import config from '../../config.json';
import { CVinitialState } from '../CV';
import { FlashinitialState } from '../Flash';
import { FlickrinitialState } from '../Flickr';
import { BouncerinitialState } from '../Bouncer';

export const initialState: any = {
  app: config.app,
  persisted: Date.now(),
  cv: CVinitialState,
  flash: FlashinitialState,
  flickr: FlickrinitialState,
  bouncer: BouncerinitialState,
};
