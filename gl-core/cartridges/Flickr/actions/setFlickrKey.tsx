// core/gl-core/cartridges/Flickr/actions/setFlickrKey.tsx

import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export const setFlickrKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('setFlickrKey', key, value);
      const current = getState().redux.flickr;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(setUbereduxKey({ key: 'flickr', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
