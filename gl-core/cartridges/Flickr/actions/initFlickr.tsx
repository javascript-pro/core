import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core';
import { store } from '../../Uberedux/store';
import { fetchAlbum } from './fetchAlbum';

export const initFlickr =
  (albumId: string) => async (dispatch: TUbereduxDispatch) => {
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

            loading: true,
            status: 'success',
            albumId,
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
              albumId,
            },
          }),
        );
      }, 10000);

      // Await album fetch
      await dispatch(fetchAlbum(albumId));

      clearTimeout(timeoutId); // Clear timeout if fetchAlbum succeeded

      // Update success state
      const updatedState = store.getState().redux.flickr;
      dispatch(
        setUbereduxKey({
          key: 'flickr',
          value: {
            ...updatedState,
            message: 'Album fetched OK',
            loading: false,
            status: 'success',
            albumId,
          },
        }),
      );
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: errorMessage }));
    }
  };
