// core/gl-core/actions/toggleLoading.tsx
import { TUbereduxDispatch } from '../../gl-core/types';
import { setUbereduxKey } from '../../gl-core';

export type TLoading = {
  status?: 'idle' | 'loading';
  message?: string;
};

export const toggleLoading =
  (loading: TLoading | null) => async (dispatch: TUbereduxDispatch) => {
    try {
      const value = loading === null ? null : { ...loading };
      dispatch(
        setUbereduxKey({
          key: 'loading',
          value,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
