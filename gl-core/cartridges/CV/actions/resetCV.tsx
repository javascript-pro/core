import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';
import { initialStateCV } from '../';

export const resetCV =
  (cvMarkdown: string | null = null): any =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      const resetState = {
        ...initialStateCV,
        cvMarkdown: cvMarkdown || '',
      };

      dispatch(setUbereduxKey({ key: 'cv', value: resetState }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
