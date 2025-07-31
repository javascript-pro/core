// core/gl-core/cartridges/Admin/actions/reset.tsx

import { TUbereduxDispatch } from '../../gl-core/types';
import {
  resetUberedux,
  setUbereduxKey,
} from '../../gl-core/cartridges/Uberedux';

/**
 * Resets the entire Uberedux slice back to initialState,
 * then waits 333ms and redirects the browser to "/admin".
 */
export const reset = () => async (dispatch: TUbereduxDispatch) => {
  try {
    // reset  Uberedux
    dispatch(resetUberedux());

    // after 333ms, redirect to "/admin"
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.replace('/');
      }
    }, 333);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({ key: 'error', value: msg }));
  }
};
