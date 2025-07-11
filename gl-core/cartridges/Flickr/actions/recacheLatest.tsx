import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { store } from '../../Uberedux/store';

export const recacheLatest =
  () => async (dispatch: TUbereduxDispatch) => {
    try {
      const response = await fetch(`/api/gl-api/flickr/latest/update`);
      if (!response.ok) {
        dispatch(
          toggleFeedback({
            severity: 'warning',
            title: 'gl-api/flickr/latest/update/route.ts',
            description: response.toString(),
          }),
        );
        throw new Error('gl-api/flickr/latest/update/route.ts');
      }
      const json = await response.json();

      if (!json?.result || typeof json.result !== 'object') {
        dispatch(
          toggleFeedback({
            severity: 'warning',
            title: 'gl-api/flickr/latest/update/route.ts',
            description: 'Invalid Flickr response format',
          }),
        );
        throw new Error('Invalid Flickr response format');
      }

      dispatch(
        setUbereduxKey({
          key: 'flickr',
          value: {
            ...store.getState().redux.flickr,
            lastRecached: Date.now(),
          },
        }),
      );

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Done',
        }),
      );
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);

      dispatch(
        toggleFeedback({
          severity: 'error',
          title: 'Flickr/actions/recacheLatest.tsx',
          description: errorMessage,
        }),
      );

      dispatch(
        setUbereduxKey({
          key: 'flickr',
          value: {
            ...store.getState().redux.flickr,
            loading: false,
            status: 'error',
            message: errorMessage,
          },
        }),
      );
    }
  };
