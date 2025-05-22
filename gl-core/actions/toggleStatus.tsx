// core/gl-core/actions/toggleStatus.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core';
import { store } from '../../gl-core/cartridges/Uberedux/store';
// import type { TUbereduxState } from '../../gl-core/types'; // Adjust if your type lives elsewhere

export type TUbereduxState = {
  status: {
    level: string;
    message: string;
    hidden: boolean;
  };
};

export const toggleStatus =
  (hidden: boolean) => async (dispatch: TUbereduxDispatch) => {
    try {
      const currentStatus = (store.getState() as unknown as TUbereduxState)
        .status;

      const updatedStatus = {
        ...currentStatus,
        hidden,
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
