// core/gl-core/cartridges/Flickr/actions/setLatestIndex.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const setLatestIndex =
  (latestIndex: number): any =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(
        setUbereduxKey({
          key: 'flickr.latestIndex',
          value: latestIndex || 0,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
