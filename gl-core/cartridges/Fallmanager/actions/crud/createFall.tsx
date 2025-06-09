// core/gl-core/cartridges/Fallmanager/actions/crud/createFall.tsx
import { TUbereduxDispatch } from '../../../../';
import { setUbereduxKey } from '../../../../../gl-core';
import { TFall } from '../../types';

export const createFall =
  (fbId = 'abcd-1234-mnbv-0987', title = 'New Fall Title'): TFall =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('createFall', fbId, title);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
