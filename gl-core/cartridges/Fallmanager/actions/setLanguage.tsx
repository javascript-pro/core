// core/gl-core/cartridges/Lingua/actions/setLanguage.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { TLanguageCode } from '../types';
import { setUbereduxKey } from '../../../';

export const setLanguage =
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
