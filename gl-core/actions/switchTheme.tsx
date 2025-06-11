// core/gl-core/actions/switchTheme.tsx

import { TUbereduxDispatch } from '../../gl-core/types';
import { setUbereduxKey } from '../../gl-core';
import { TFeedback } from '../types';

export const switchTheme =
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
