import { TUbereduxDispatch, setUbereduxKey } from '../../../../gl-core';

export const initFlickr = () => async (dispatch: TUbereduxDispatch) => {
  try {
    console.log('initFlickr');
    /*
      Take a look in the getState().flickr

      the initial state is ... 
      import {TFlickrState} from './types';
      
      export const initialState: TFlickrState = {
        cartridge: 'flickr',
        status: "success",
        message: "ok",
        albums: [],
      };
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
