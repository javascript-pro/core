// core/gl-core/cartridges/Fallmanager/actions/deleteUpload.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export type TUpload = {
  id: string;
};

export const deleteUpload =
  (id = 'notset'): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('deleteUpload', id);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
