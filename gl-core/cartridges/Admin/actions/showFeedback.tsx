// core/gl-core/cartridges/Admin/actions/showFeedback.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core/cartridges/Uberedux';

export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type TFeedback = {
  severity?: TSeverity;
  title?: string;
  description?: string;
} | null;

export const showFeedback =
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
