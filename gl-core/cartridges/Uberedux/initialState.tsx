import config from '../../config.json';
import { CVinitialState } from '../CV';

export const initialState: any = {
  app: config.app,
  persisted: Date.now(),
  modalNav: false,
  modalShare: false,
  cv: CVinitialState,
};
