import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';
import { FlickrinitialState } from '../';

export const resetFlickr =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('reseting Flickr');
      dispatch(setUbereduxKey({ key: 'flickr', value: FlickrinitialState }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
