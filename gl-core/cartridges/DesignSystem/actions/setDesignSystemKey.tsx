// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/actions/setDesignSystemKey.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const setDesignSystemKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // console.log('setPaywallKey', key, value);
      const current = getState().redux.paywall;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(setUbereduxKey({ key: 'designsystem', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
