// core/gl-core/actions/updateStatusMessage.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core/types';
import { store } from '../../gl-core/cartridges/Uberedux/store';
// import type { TUbereduxState } from '../../gl-core/types'; // Adjust if your type lives elsewhere

export type TUbereduxState = {
  status: {
    level: string;
    message: string;
    hidden: boolean;
  };
};

export const updateStatusLevel =
  (level: string) => async (dispatch: TUbereduxDispatch) => {
    try {
      const currentStatus = (store.getState() as unknown as TUbereduxState)
        .status;

      const updatedStatus = {
        ...currentStatus,
        level,
      };

      dispatch(
        setUbereduxKey({
          key: 'status',
          value: updatedStatus,
        }),
      );
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      dispatch(
        setUbereduxKey({
          key: 'error',
          value: {
            status: 'error',
            errorMessage,
          },
        }),
      );
    }
  };
