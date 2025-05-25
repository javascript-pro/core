// core/gl-core/actions/routeTo.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core';
// import { store } from '../../gl-core/cartridges/Uberedux/store';

export type TUbereduxState = {
  // define shape if needed
};

export const routeTo =
  (route: string, router: any) => async (dispatch: TUbereduxDispatch) => {
    try {
      router.push(route);
      // console.log('routeTo', route, router);
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
