import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core';
import { store } from '../../Uberedux/store';

export const fetchAlbum = (albumId: string) => async (dispatch: TUbereduxDispatch) => {
  try {

    console.log("fetching", `/api/gl-api/flickr?album=${encodeURIComponent(albumId)}`);

    const response = await fetch(`/api/gl-api/flickr?album=${encodeURIComponent(albumId)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();

    const state = store.getState();
    const { flickr } = state.redux;

    if (!json?.result || !Array.isArray(json.result)) {
      throw new Error('Invalid Flickr response format');
    }

    const latestAlbum = json.result[0];

    const updatedState = {
      ...flickr,
      album: latestAlbum,
      message: 'Album fetched successfully',
      status: 'success',
      loading: false,
    };

    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: updatedState,
      }),
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({ key: 'error', value: errorMessage }));
  }
};
