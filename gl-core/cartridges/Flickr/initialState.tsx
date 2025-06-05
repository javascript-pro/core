import { TFlickrState } from './types';

export const initialState: TFlickrState = {
  cartridge: 'flickr',
  status: 'warning',
  message: 'Flickr is not ready',
  albumList: {
    lastLoad: Date.now(),
    loading: false,
    loaded: false,
    list: [],
  },
  album: { photos: [] },
  photo: null,
  loading: false,
  loaded: false,
  search: null,
};
