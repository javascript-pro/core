// core/gl-core/cartridges/Fallmanager/actions/zuruecksetzen.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import { initialStateFallmanager } from '../../Fallmanager';

export const zuruecksetzen =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const language = getState().redux.fallmanager.language;

      dispatch(
        setUbereduxKey({
          key: 'fallmanager',
          value: {
            ...initialStateFallmanager,
          },
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
