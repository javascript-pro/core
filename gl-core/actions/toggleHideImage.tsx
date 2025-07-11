// core/gl-core/actions/toggleHideImage.tsx

import { TUbereduxDispatch } from '../../gl-core/types';
import { setUbereduxKey } from '../../gl-core';

export const toggleHideImage =
  (hideImage: boolean) => async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(
        setUbereduxKey({
          key: 'hideImage',
          value: hideImage,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
