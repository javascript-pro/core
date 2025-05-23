import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core';
import { store } from '../../Uberedux/store';

export const fetchAlbum = (albumId: string) => async (dispatch: TUbereduxDispatch) => {
  try {
    dispatch(setUbereduxKey({
      key: 'flickr',
      value: {
        ...store.getState().redux.flickr,
        loading: true,
        status: 'loading',
        message: 'Fetching album...',
      },
    }));

    const response = await fetch(`/api/gl-api/flickr?album=${encodeURIComponent(albumId)}`);
    if (!response.ok) {
      throw new Error(`Flickr API error: ${response.status}`);
    }

    const json = await response.json();

    if (!json?.result || typeof json.result !== 'object') {
      throw new Error('Invalid Flickr response format');
    }

    dispatch(setUbereduxKey({
      key: 'flickr',
      value: {
        ...store.getState().redux.flickr,
        album: json.result,
        message: 'Album fetched successfully',
        status: 'success',
        loading: false,
      },
    }));
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({
      key: 'flickr',
      value: {
        ...store.getState().redux.flickr,
        loading: false,
        status: 'error',
        message: errorMessage,
      },
    }));
  }
};
