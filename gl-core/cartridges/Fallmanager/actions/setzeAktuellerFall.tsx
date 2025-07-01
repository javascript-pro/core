// core/gl-core/cartridges/Fallmanager/actions/setzeAktuellerFall.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const setzeAktuellerFall =
  (aktuellerFall: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.fallmanager;
      const updated = {
        ...current,
        aktuellerFall,
      };
      dispatch(setUbereduxKey({ key: 'fallmanager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
