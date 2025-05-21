import { TUbereduxDispatch, setUbereduxKey  } from '../../../../gl-core';

export type TAction = {
  payload: any;
};

export const initFlickr = (): any => async (dispatch: TUbereduxDispatch) => {
  try {
    console.log('initFlickr');
    
    dispatch(setUbereduxKey({ key: 'initFlickr', value: true }));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(setUbereduxKey({ key: 'error', value: e.message }));
    } else {
      dispatch(setUbereduxKey({ key: 'error', value: String(e) }));
    }
  }
};
