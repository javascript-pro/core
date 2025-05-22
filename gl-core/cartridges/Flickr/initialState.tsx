import { TFlickrState } from './types';

export const initialState: TFlickrState = {
  cartridge: 'flickr',
  status: 'warning',
  message: 'Herding pandas',
  loading: false,
  loaded: false,
  search: null,
};
