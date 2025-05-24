import { TFlickrState } from './types';

export const initialState: TFlickrState = {
  cartridge: 'flickr',
  status: 'warning',
  message: 'Flickr is not ready',
  album: {photos: []},
  loading: false,
  loaded: false,
  search: null,
};
