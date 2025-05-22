import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core';
import { store } from '../../Uberedux/store';
import { fetchAlbum } from './fetchAlbum';

export const initFlickr = () => async (dispatch: TUbereduxDispatch) => {
  try {
    const state = store.getState();
    const { flickr } = state.redux;
    const { loading } = flickr;

    if (loading) return;

    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...flickr,
          message: 'Booting Flickr Cartridge',
          // loading: true,
          status: 'success',
        },
      }),
    );

    // Timeout fallback
    const timeoutId = setTimeout(() => {
      dispatch(
        setUbereduxKey({
          key: 'flickr',
          value: {
            ...flickr,
            message: 'Flickr init timed out',
            loading: false,
            status: 'error',
          },
        }),
      );
    }, 10000);

    // Await album fetch
    await dispatch(fetchAlbum());

    clearTimeout(timeoutId); // Clear timeout if fetchAlbum succeeded

    // Update success state
    const updatedState = store.getState().redux.flickr;
    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...updatedState,
          message: 'Fetched album',
          loading: false,
          status: 'success',
        },
      }),
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({ key: 'error', value: errorMessage }));
  }
};
