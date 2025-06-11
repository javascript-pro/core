// core/gl-core/actions/navigateTo.tsx

import { setUbereduxKey, toggleLoading } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core/types';

export type TUbereduxState = {
  // define shape if needed
};

export const navigateTo =
  (url: string, target?: '_self' | '_blank') =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      const resolvedTarget =
        typeof target !== 'undefined'
          ? target
          : url.startsWith('/')
            ? '_self'
            : url.startsWith('http')
              ? '_blank'
              : '_self';

      /*
        dispatch(
          toggleLoading({
            status: 'loading',
            message: `to... ${url}`,
          }),
        );
        setTimeout(() => {
          window.open(url, resolvedTarget);
        }, 1000);
      */
      window.open(url, resolvedTarget);
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
