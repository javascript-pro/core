// core/gl-core/actions/forwardEmail.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core';

export const forwardEmail =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
        
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
