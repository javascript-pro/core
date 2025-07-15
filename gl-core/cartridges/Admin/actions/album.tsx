// core/gl-core/cartridges/Fallmanager/actions/uploadFile.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback } from '../../../../gl-core';

export const album =
  (payload: { flickrId: string; mode?: 'create' | 'update' }) =>
  async (dispatch: TUbereduxDispatch) => {
    try {
      const body = {
        flickrId: payload.flickrId,
        mode: payload.mode ?? 'create',
      };

      const res = await fetch('/api/gl-api/flickr/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || data.status !== 'success') {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'Album action failed',
            description: data.message || 'Unknown error occurred.',
          }),
        );
        return;
      }

      // Use API-provided message for success feedback
      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Album action complete',
          description: data.message, // direct from API
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
