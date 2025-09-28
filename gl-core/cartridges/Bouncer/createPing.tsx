// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/createPing.tsx
import { TUbereduxDispatch } from '../Uberedux';
import { setUbereduxKey } from '../Uberedux';
import { setBouncerKey } from './';

export const createPing =
  () => async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const current = state?.redux.bouncer.ping;

      dispatch(
        setBouncerKey('ping', {
          kdfhasf: 123,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
