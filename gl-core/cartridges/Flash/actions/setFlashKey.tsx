// /Users/goldlabel/GitHub/flash/app/src/Flash/actions/setFlashKey.tsx 
import { TUbereduxDispatch } from '../types';
import { setUbereduxKey } from '../';

export const setFlashKey =
  (key: string, value: unknown) =>
  async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const current = state?.redux.flash;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(
        setUbereduxKey({
          key: 'flash',
          value: updated,
        })
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(
        setUbereduxKey({
          key: 'error',
          value: msg,
        })
      );
    }
  };
