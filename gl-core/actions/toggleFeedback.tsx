// core/gl-core/cartridges/Bouncer/actions/toggleFeedback.tsx

/*
    Takes a TFeedback typed object || null
    Updates redux.feedback
*/

import { TUbereduxDispatch } from '../../gl-core/types';
import { setUbereduxKey } from '../../gl-core';
import { TFeedback } from '../types';

export const toggleFeedback =
  (feedback: TFeedback | null) => async (dispatch: TUbereduxDispatch) => {
    try {
      const value = feedback === null ? null : { ...feedback };
      dispatch(
        setUbereduxKey({
          key: 'feedback',
          value,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
