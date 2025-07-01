// core/gl-core/cartridges/Fallmanager/actions/setzeSprache.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { TLanguageCode } from '../types';
import { setUbereduxKey } from '../../../../gl-core';

export const setzeSprache =
  (language: TLanguageCode): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.fallmanager;
      const updated = {
        ...current,
        language,
      };
      dispatch(setUbereduxKey({ key: 'fallmanager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
