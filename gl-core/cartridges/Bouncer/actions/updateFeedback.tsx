// core/gl-core/cartridges/Bouncer/actions/updateFeedback.tsx
/*
    Takes a TFeedback typed object || null
    Updates bouncer.feedback
    Always sets hidden: false
*/
import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../../gl-core';
import { TFeedback } from '../types';

export const updateFeedback = (
  feedback: TFeedback,
): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // console.log('updateFeedback', feedback);
      const currentBouncer = getState().redux.bouncer;
      const updated = {
        ...currentBouncer,
        feedback: {
          hidden: false,
          ...feedback,
        },
      };
      dispatch(setUbereduxKey({ key: 'bouncer', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
