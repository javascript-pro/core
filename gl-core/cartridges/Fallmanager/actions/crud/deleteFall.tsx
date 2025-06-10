// core/gl-core/cartridges/Fallmanager/actions/crud/deleteFall.tsx
import { TUbereduxDispatch } from '../../../../../gl-core/types';
import { setUbereduxKey } from '../../../../../gl-core';
import { TFall } from '../../types';

export const deleteFall =
  (fbId = 'abcd-1234-mnbv-0987', title = 'New Fall Title'): TFall =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('deleteall', fbId, title);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
