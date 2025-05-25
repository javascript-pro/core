import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';
import { CVinitialState } from '../';

export const resetCV =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('reseting CV');
      dispatch(setUbereduxKey({ key: 'cv', value: CVinitialState }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
