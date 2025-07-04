// core/gl-core/cartridges/Fallmanager/actions/resetTranslations.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import { lingua, languages } from '../lingua';

export const resetTranslations =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log("resetTranslations")
      const current = getState().redux.fallmanager;
      const updated = {
        ...current,
        languages,
        lingua,
      };
      dispatch(setUbereduxKey({ key: 'fallmanager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
