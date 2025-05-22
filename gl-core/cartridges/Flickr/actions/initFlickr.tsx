import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core';
import { store } from '../../Uberedux/store';
import { TFlickrState } from '../types';

// Safe helper with unknown → type cast
const getFlickrState = (): TFlickrState => {
  return (store.getState() as unknown as { flickr: TFlickrState }).flickr;
};

export const initFlickr = () => async (dispatch: TUbereduxDispatch) => {
  try {
    console.log('initFlickr');

    const oldFlickr = getFlickrState();

    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...oldFlickr,
          loading: true,
          status: 'loading',
          message: 'initialising flickr...',
        },
      }),
    );

    // Do more async stuff here if needed...

    // dispatch(
    //   setUbereduxKey({
    //     key: 'flickr',
    //     value: {
    //       ...oldFlickr,
    //       loading: false,
    //       status: 'success',
    //       message: 'flickr init complete',
    //     },
    //   }),
    // );

    // dispatch(setUbereduxKey({ key: 'initFlickr', value: true }));

    
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);

    const oldFlickr = getFlickrState();

    dispatch(
      setUbereduxKey({
        key: 'flickr',
        value: {
          ...oldFlickr,
          loading: false,
          status: 'error',
          message: errorMessage,
        },
      }),
    );

    dispatch(setUbereduxKey({ key: 'error', value: errorMessage }));
  }
};
