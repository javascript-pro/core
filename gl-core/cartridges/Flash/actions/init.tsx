// /Users/goldlabel/GitHub/flash/app/src/Flash/actions/init.tsx

import { TUbereduxDispatch } from '../types';
import { setUbereduxKey } from '../';

export const init =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.flash;
      const updated = {
        ...current,
        initted: true,
      };
      dispatch(setUbereduxKey({ key: 'flash', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
