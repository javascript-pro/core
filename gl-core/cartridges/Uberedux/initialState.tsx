import config from '../../config.json';

export const initialState: any = {
  app: config.app,
  persisted: Date.now(),
  modalNav: false,
  modalShare: true,
};
