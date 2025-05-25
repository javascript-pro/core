// core/gl-core/actions/toggleAdvert.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core';
import { store } from '../../gl-core/cartridges/Uberedux/store';
// import type { TUbereduxState } from '../../gl-core/types'; // Adjust if your type lives elsewhere

export type TUbereduxState = {
  Advert: {
    level: string;
    message: string;
    hidden: boolean;
  };
};

export const toggleAdvert =
  (hidden: boolean) => async (dispatch: TUbereduxDispatch) => {
    try {
      const currentAdvert = (store.getState() as unknown as TUbereduxState)
        .Advert;

      const updatedAdvert = {
        ...currentAdvert,
        hidden,
      };

      dispatch(
        setUbereduxKey({
          key: 'Advert',
          value: updatedAdvert,
        }),
      );
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      dispatch(
        setUbereduxKey({
          key: 'error',
          value: {
            Advert: 'error',
            errorMessage,
          },
        }),
      );
    }
  };
