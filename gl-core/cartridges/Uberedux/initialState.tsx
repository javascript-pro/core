import config from '../../config.json';

export const initialState: any = {
  app: config.app,
  persisted: Date.now(),
  // navOpen: false,
  // cartridges: ['Bouncer'],
};
