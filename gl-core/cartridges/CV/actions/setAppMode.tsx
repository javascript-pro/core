// core/gl-core/cartridges/CV/actions/setAppMode.tsx
import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';
import { CVinitialState } from '../';

export const setAppMode =
  (value: 'cv' | 'jd' | 'pristine'): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.cv;
      const updated = {
        ...current,
        appMode: value,
      };
      dispatch(setUbereduxKey({ key: 'cv', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
