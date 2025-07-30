// core/gl-core/cartridges/Admin/actions/init.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { showFeedback } from '../../Admin';

export const init = () => async (dispatch: TUbereduxDispatch) => {
  try {
    dispatch(
      showFeedback({
        severity: 'success',
        title: 'Admin Initted.',
      }),
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    dispatch(
      showFeedback({
        severity: 'error',
        title: 'Album action failed',
        description: msg,
      }),
    );
  }
};
