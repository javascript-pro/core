import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export const updateCVKey =
  (key: string, payload: Record<string, any>): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // Step 1: get existing value at nested key path
      const state = getState().redux;
      const keys = key.split('.');
      let current = state;
      for (const k of keys) {
        if (current?.[k] == null) {
          current = {};
          break;
        }
        current = current[k];
      }

      // Step 2: merge current + payload (shallow merge)
      const updated = {
        ...current,
        ...payload,
      };

      // Step 3: dispatch merged value
      dispatch(
        setUbereduxKey({
          key,
          value: updated,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
