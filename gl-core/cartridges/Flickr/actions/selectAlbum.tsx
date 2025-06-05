// core/gl-core/cartridges/Flickr/actions/selectAlbum.tsx

import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export const selectAlbum =
  (album: any): any =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(
        setUbereduxKey({
          key: 'flickr.album',
          value: album || null,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
