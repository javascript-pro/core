// core/gl-core/cartridges/Flickr/actions/setLatest.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

// latest will be an arr of Photos. 100 of them
export interface ILatest {}

export const setLatest =
  (latest: any): any =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(
        setUbereduxKey({
          key: 'flickr.latest',
          value: latest || null,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
