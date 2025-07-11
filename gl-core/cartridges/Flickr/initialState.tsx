// import { TFlickrState } from './types';

export type TFlickrState = {
  cartridge?: string;
  feedback: {
    severity: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  };
  latestIndex: number;
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
  latestIndex: 0,
  latest: null,
};
