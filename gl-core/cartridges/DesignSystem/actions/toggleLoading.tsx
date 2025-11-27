// /Users/goldlabel/GitHub/example-app/gl-core/cartridges/DesignSystem/actions/toggleLoading.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import { setDesignSystemKey } from '../../DesignSystem';

export const toggleLoading =
  (value: boolean) => async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(
        setDesignSystemKey('loading', value),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
