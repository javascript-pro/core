// /Users/goldlabel/GitHub/flash/app/src/Flash/actions/setSystemKey.tsx 
import { TUbereduxDispatch } from '../types';
import { setUbereduxKey } from '../';

/**
 * Updates or creates system by key in the Uberedux store.
 * If the key exists, it is updated. If not, it is created.
 * Ensures that critical default keys are always present.
 */
export const setSystemKey =
  (key: string, value: unknown) =>
  async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      // grab current settings from store
      const state = getState();
      // provide defaults if settings are missing
      const currentSettings = state?.redux.system;

      // build a new settings object with the updated or new key
      const updatedSettings = {
        ...currentSettings,
        [key]: value,
      };

      // persist back to store
      dispatch(
        setUbereduxKey({
          key: 'system',
          value: updatedSettings,
        })
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(
        setUbereduxKey({
          key: 'error',
          value: msg,
        })
      );
    }
  };
