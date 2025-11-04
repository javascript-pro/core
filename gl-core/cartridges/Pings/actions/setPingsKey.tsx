// /Users/goldlabel/GitHub/core/gl-core/cartridges/Pings/actions/setPingsKey.tsx
import { TUbereduxDispatch } from '../../Uberedux';
import { setUbereduxKey } from '../../Uberedux';

export const setPingsKey =
  (key: string, value: unknown) =>
  async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const current = state?.redux.pings;
      const prevVal = current?.[key];

      const mergedValue =
        typeof prevVal === 'object' &&
        prevVal !== null &&
        typeof value === 'object'
          ? { ...prevVal, ...(value as Record<string, unknown>) }
          : value;

      dispatch(
        setUbereduxKey({
          key: 'pings',
          value: { ...current, [key]: mergedValue },
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
