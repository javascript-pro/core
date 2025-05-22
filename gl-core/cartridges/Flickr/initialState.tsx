import { TFlickrState } from './types';

export const initialState: TFlickrState = {
  cartridge: 'flickr',
  status: 'warning',
  message: 'Flickr is not ready',
  loading: false,
  loaded: false,
  search: null,
};
