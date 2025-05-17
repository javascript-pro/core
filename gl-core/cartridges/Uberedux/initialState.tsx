import config from '../../config.json';
import { CVinitialState } from '../CV';
import { FlashinitialState } from '../Flash';

export const initialState: any = {
  app: config.app,
  persisted: Date.now(),
  themeMode: "light",
  modalNav: false,
  modalShare: false,
  cv: CVinitialState,
  flash: FlashinitialState,
};
