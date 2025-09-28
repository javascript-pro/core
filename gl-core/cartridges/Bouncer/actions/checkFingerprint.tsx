// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/checkFingerprint.tsx
import { TUbereduxDispatch } from '../../Uberedux';
import { setUbereduxKey } from '../../Uberedux';
// import { setBouncerKey } from '../';

export const checkFingerprint =
  () => async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      console.log("checkFingerprint")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
