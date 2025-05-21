import { TUbereduxDispatch, setUbereduxKey  } from '../../../../gl-core';

export const initFlickr = () => async (dispatch: TUbereduxDispatch) => {
  try {
    console.log('initFlickr');

    /*
      Take a look in the getState().flickr

      it looks like this

      {
  cartridge: 'flickr',
  initting: false,
  initComplete: false,
  albums: [
    {
      flickrId: '72177720324245676',
      fetching: false,
      fetched: false,
      result: [],
    },
  ],
  photos: [
    {
      flickrId: '54534952165',
      fetching: false,
      fetched: false,
      result: null,
    },
  ],
}

    */

    dispatch(setUbereduxKey({ key: 'initFlickr', value: true }));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(setUbereduxKey({ key: 'error', value: e.message }));
    } else {
      dispatch(setUbereduxKey({ key: 'error', value: String(e) }));
    }
  }
};
