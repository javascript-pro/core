// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/setBouncerKey.tsx
import { TUbereduxDispatch } from '../Uberedux';
import { setUbereduxKey } from '../Uberedux';

export const setBouncerKey =
  (key: string, value: unknown) =>
  async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const current = state?.redux.bouncer;
      const prevVal = current?.[key];

      const mergedValue =
        typeof prevVal === 'object' &&
        prevVal !== null &&
        typeof value === 'object'
          ? { ...prevVal, ...(value as Record<string, unknown>) }
          : value;

      dispatch(
        setUbereduxKey({
          key: 'bouncer',
          value: { ...current, [key]: mergedValue },
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
