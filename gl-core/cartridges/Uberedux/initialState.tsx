import config from '../../config.json';
import { CVinitialState } from '../CV';
import { FlashinitialState } from '../Flash';
import { FlickrinitialState } from '../Flickr';
// PingpongintialSlice from

export const initialState: any = {
  app: config.app,
  persisted: Date.now(),
  themeMode: 'light',
  modalNav: false,
  modalShare: false,
  cv: CVinitialState,
  flash: FlashinitialState,
  flickr: FlickrinitialState,
};
