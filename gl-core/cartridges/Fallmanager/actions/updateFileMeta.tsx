// core/gl-core/cartridges/Fallmanager/actions/updateFileMeta.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const updateFileMeta =
  (fileId: string, updates: Record<string, any>): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const state = getState().redux.fallmanager;
      const currentFile = state.files?.[fileId];

      if (!currentFile) return;

      const updatedFile = {
        ...currentFile,
        ...updates,
      };

      dispatch(
        setUbereduxKey({
          key: 'fallmanager',
          value: {
            ...state,
            files: {
              ...state.files,
              [fileId]: updatedFile,
            },
          },
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
