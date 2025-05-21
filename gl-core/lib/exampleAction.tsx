import { TUbereduxDispatch } from '../';
import { setUbereduxKey } from '../';

export type TAction = {
  payload: any;
};

export const exampleAction = (): any => async (dispatch: TUbereduxDispatch) => {
  try {
    console.log('exampleAction');
    dispatch(setUbereduxKey({ key: 'exampleAction', value: true }));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(setUbereduxKey({ key: 'error', value: e.message }));
    } else {
      dispatch(setUbereduxKey({ key: 'error', value: String(e) }));
    }
  }
};
