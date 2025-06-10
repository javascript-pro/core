// core/gl-core/cartridges/Bouncer/actions/updateFeedback.tsx

/*
    Takes a TFeedback typed object || null
    Updates bouncer.feedback
    Always sets hidden: false
*/

import { TUbereduxDispatch } from '../../gl-core/types';
import { setUbereduxKey } from '../../gl-core';
import { TFeedback } from '../types';

export const updateFeedback =
  (feedback: TFeedback | null) => async (dispatch: TUbereduxDispatch) => {
    try {
      const updated = {...(feedback || {})};
      dispatch(
        setUbereduxKey({
          key: 'feedback',
          value: updated,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
