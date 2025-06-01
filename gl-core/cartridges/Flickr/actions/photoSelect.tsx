import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export const photoSelect = (
  photo: any,
): any => async (dispatch: TUbereduxDispatch) => {
  try {
    dispatch(
      setUbereduxKey({
        key: 'flickr.photo',
        value: photo || null,
      })
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({ key: 'error', value: msg }));
  }
};
