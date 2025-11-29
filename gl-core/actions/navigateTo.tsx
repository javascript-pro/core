// core/gl-core/actions/navigateTo.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core/types';
import { toggleLoading } from '../../gl-core/cartridges/DesignSystem';

export type TUbereduxState = {
  // define shape if needed
};

export const navigateTo =
  (url: string, target?: '_self' | '_blank') =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(toggleLoading(true));
      const resolvedTarget =
        typeof target !== 'undefined'
          ? target
          : url.startsWith('/')
            ? '_self'
            : url.startsWith('http')
              ? '_blank'
              : '_self';
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
