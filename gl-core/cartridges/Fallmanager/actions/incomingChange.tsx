// core/gl-core/cartridges/Fallmanager/actions/incomingChange.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const incomingChange = (
    key: string, 
    value: any,
): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
    //   const current = getState().redux.fallmanager;
    //   const updated = {
    //     ...current,
    //     [key]: value,
    //   };
    //   dispatch(setUbereduxKey({ key: 'fallmanager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
