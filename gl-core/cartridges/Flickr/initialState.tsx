import { TFlickrState } from './types';

export const initialState: TFlickrState = {
  cartridge: 'flickr',
  status: 'info',
  message: 'Loading pandas',
  loading: false,
  loaded: false,
  search: null,
};
