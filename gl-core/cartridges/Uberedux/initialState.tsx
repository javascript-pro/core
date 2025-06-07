import config from '../../config.json';
import { CVinitialState } from '../CV';
import { FlashinitialState } from '../Flash';
import { FlickrinitialState } from '../Flickr';
// PingpongintialSlice from

export const initialState: any = {
  app: config.app,
  status: {
    level: 'success',
    feedback: 'Everything is working just fine',
    hidden: false,
  },
  persisted: Date.now(),
  themeMode: config.themeMode,
  modalNav: false,
  modalShare: false,
  cv: CVinitialState,
  flash: FlashinitialState,
  flickr: FlickrinitialState,
};
