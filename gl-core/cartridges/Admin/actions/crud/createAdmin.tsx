// core/gl-core/cartridges/Admin/actions/crud/createAdmin.tsx
import { TUbereduxDispatch } from '../../../../';
import { setUbereduxKey } from '../../../../../gl-core';
import { TAdmin } from '../../types';

export const createAdmin =
  (fbId = 'abcd-1234-mnbv-0987', title = 'New Admin Title'): TAdmin =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('createAdmin', fbId, title);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
