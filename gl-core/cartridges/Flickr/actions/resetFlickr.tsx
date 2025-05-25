import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';
import { FlickrinitialState, initFlickr } from '../';

export const resetFlickr =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      dispatch(setUbereduxKey({ key: 'flickr', value: FlickrinitialState }));
      dispatch(initFlickr('72177720326317140'));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
