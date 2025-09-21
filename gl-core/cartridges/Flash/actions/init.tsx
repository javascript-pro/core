// core/gl-core/cartridges/Lingua/actions/setLang.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

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
