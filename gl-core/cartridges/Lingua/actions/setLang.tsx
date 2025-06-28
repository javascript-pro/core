// core/gl-core/cartridges/Lingua/actions/setLang.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const setLang =
  (lang: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.lingua;
      const updated = {
        ...current,
        lang
      };
      dispatch(setUbereduxKey({ key: 'lingua', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
