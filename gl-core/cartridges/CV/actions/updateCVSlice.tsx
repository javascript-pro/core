// updateCVSlice.ts
import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export type TAction = {
  payload: string; // markdown content
};

export const updateCVSlice = (markdown: string): any => async (dispatch: TUbereduxDispatch) => {
  try {
    console.log('updateCVSlice', markdown);
    dispatch(setUbereduxKey({ key: 'cv.originalCV', value: markdown }));
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({ key: 'error', value: msg }));
  }
};
