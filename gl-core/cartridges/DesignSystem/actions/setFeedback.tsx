// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/actions/setFeedback.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';
import { TFeedback } from '../types';

export const setFeedback =
  (feedback: TFeedback): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.designSystem;
      const updated = {
        ...current,
        feedback,
      };
      dispatch(setUbereduxKey({ key: 'designSystem', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
