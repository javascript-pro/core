import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core';
import { store } from '../../Uberedux/store';

export const fetchAlbum = () => async (dispatch: TUbereduxDispatch) => {
  try {
    console.log('fetchAlbum');
    const state = store.getState()
    const {flickr} = state.redux;
    const { loading } = flickr;
    if (loading) return;
    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...flickr,
          message: 'Loading Cartridge...',
          loading: true,
          status: 'info',
        },
      }),
    );
    setTimeout(() => {
      dispatch(
        setUbereduxKey({
          key: 'flickr',
          value: {
            ...flickr,
            message: 'Init has timed out',
            loading: false,
            status: 'error',
          },
        }),
      );


    }, 10000);

  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({ key: 'error', value: errorMessage }));
  }
};
