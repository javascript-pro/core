// core/gl-core/cartridges/CV/actions/setCVKey.tsx
import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export const setCVKey = (
  key: string,
  value: any,
): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log("setCVKey", key, value)
      const current = getState().redux.cv;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(setUbereduxKey({ key: 'cv', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
