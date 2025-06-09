// core/gl-core/cartridges/Flickr/actions/resetAlbum.tsx
import { setUbereduxKey } from '../../../';
import { TUbereduxDispatch } from '../../../../gl-core/types';

const API_ENDPOINT = '/api/gl-api/flickr';

export const resetAlbum =
  (flickrId: string): any =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(setUbereduxKey({ key: 'loading', value: true }));

      const res = await fetch(`${API_ENDPOINT}?album=${flickrId}`);
      const json = await res.json();

      if (json.status !== 'success') {
        console.warn(json.message || 'Failed to load album');
      }

      dispatch(setUbereduxKey({ key: 'album', value: json.result }));
      dispatch(setUbereduxKey({ key: 'loaded', value: true }));
      dispatch(setUbereduxKey({ key: 'loading', value: false }));
      dispatch(setUbereduxKey({ key: 'status', value: 'success' }));
      dispatch(
        setUbereduxKey({ key: 'message', value: `Loaded album ${flickrId}` }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      dispatch(setUbereduxKey({ key: 'loading', value: false }));
    }
  };
