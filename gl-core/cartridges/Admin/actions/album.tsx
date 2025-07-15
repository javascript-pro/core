// core/gl-core/cartridges/Fallmanager/actions/uploadFile.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback } from '../../../../gl-core';

export const album =
  (payload: { flickrId: string; mode?: 'create' | 'update' }) =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      // Send request to API
      const res = await fetch('/api/gl-api/flickr/albums/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flickrId: payload.flickrId }),
      });

      const data = await res.json();

      if (!res.ok || data.status !== 'success') {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'Album action failed',
            description: data.message || 'Unknown error',
          }),
        );
        return;
      }

      // Success feedback
      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Album Created',
          description: `Album ${payload.flickrId} was added successfully.`,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: 'Album action failed',
          description: msg,
        }),
      );
    }
  };
