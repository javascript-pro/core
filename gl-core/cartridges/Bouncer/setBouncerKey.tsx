// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/setBouncerKey.tsx
import { TUbereduxDispatch } from '../Uberedux';
import { setUbereduxKey } from '../Uberedux';

export const setBouncerKey =
  (key: string, value: unknown) =>
  async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const current = state?.redux.bouncer;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(
        setUbereduxKey({
          key: 'bouncer',
          value: updated,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(
        setUbereduxKey({
          key: 'error',
          value: msg,
        }),
      );
    }
  };
