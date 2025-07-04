import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';
import { initialStateFlickr, initFlickr } from '../';

export const resetFlickr =
  (flickrId: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      dispatch(setUbereduxKey({ key: 'flickr', value: initialStateFlickr }));
      dispatch(initFlickr(flickrId));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
