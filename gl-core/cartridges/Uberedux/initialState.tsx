import config from '../../config.json';
import { CVinitialState } from '../CV';
import { FlashinitialState } from '../Flash';
// PingpongintialSlice from

export const initialState: any = {
  app: config.app,
  persisted: Date.now(),
  themeMode: 'dark',
  modalNav: false,
  modalShare: false,
  cv: CVinitialState,
  flash: FlashinitialState,
};
