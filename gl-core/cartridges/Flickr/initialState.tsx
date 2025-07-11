// import { TFlickrState } from './types';

export type TFlickrState = {
  cartridge?: string;
  feedback: {
    severity: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  };
  latest: {
    fetching: boolean;
    fetched: boolean;
  } | null;
};

export const initialState: TFlickrState = {
  cartridge: 'flickr',
  feedback: {
    severity: 'success',
    title: 'All OK',
    message: 'Thanks for asking',
  },
  latest: null,
};
