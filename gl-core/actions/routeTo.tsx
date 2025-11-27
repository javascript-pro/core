// core/gl-core/actions/routeTo.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core/types';
import { toggleLoading } from '../../gl-core/cartridges/DesignSystem';

export type TUbereduxState = {
  // define shape if needed
};

export const routeTo =
  (route: string, router: any) => async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(toggleLoading(true));
      router.push(route);
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
