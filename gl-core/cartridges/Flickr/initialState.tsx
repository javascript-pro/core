import { TFlickrState } from './types';

export const initialState: TFlickrState = {
  cartridge: 'flickr',
  defaultId: "72177720326317140",
  status: 'warning',
  message: 'Flickr is not ready',
  loading: false,
  loaded: false,
  search: null,
};
