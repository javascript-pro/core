// core/gl-core/cartridges/Fallmanager/actions/toggleNewCaseOpen.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

import { updateKey } from '../../Fallmanager';

export const toggleNewCaseOpen =
  (open: boolean): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // console.log("toggleNewCaseOpen")
      dispatch(updateKey('newCaseOpen', open));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
