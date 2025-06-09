import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { store } from '../../Uberedux/store';

export const fetchAlbumList = () => async (dispatch: TUbereduxDispatch) => {
  const flickrState = store.getState().redux.flickr;

  try {
    // Start loading
    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...flickrState,
          albumList: {
            ...flickrState.albumList,
            loading: true,
            loaded: false,
            message: 'Fetching album list...',
          },
        },
      }),
    );

    const response = await fetch(`/api/gl-api/flickr/albums`);
    if (!response.ok) {
      throw new Error(`Flickr API error: ${response.status}`);
    }

    const json = await response.json();

    if (!json?.result || !Array.isArray(json.result)) {
      throw new Error('Invalid Flickr response format');
    }

    // Successful update
    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...flickrState,
          albumList: {
            list: json.result,
            lastLoad: Date.now(),
            loading: false,
            loaded: true,
            message: 'Album list fetched successfully.',
          },
        },
      }),
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);

    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...flickrState,
          albumList: {
            ...flickrState.albumList,
            loading: false,
            loaded: false,
            message: errorMessage,
          },
        },
      }),
    );
  }
};
