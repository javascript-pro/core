// core/gl-core/cartridges/Fallmanager/actions/uploadToStorage.tsx

import { TUbereduxDispatch } from '../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../gl-core';

interface UploadArgs {
  file: File;
  slug: string;
}

export const uploadToStorage =
  ({ file, slug }: UploadArgs) =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // console.log('uploadToStorage');
      // console.log('file:', file);
      // console.log('slug:', slug);
      dispatch(
        toggleFeedback({
          title: 'Uploading file...',
        }),
      );
      // TODO: Implement the actual upload logic here.
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
