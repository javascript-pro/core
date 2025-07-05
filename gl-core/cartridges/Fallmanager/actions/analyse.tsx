// core/gl-core/cartridges/Fallmanager/actions/analyse.tsx
'use client';

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';

export const analyse =
  (id: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      dispatch(
        toggleFeedback({
          severity: 'info',
          title: 'Analysing...',
        }),
      );

      const res = await fetch('/api/gl-api/fallmanager/ki', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unknown error');
      }

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'AI analysis done',
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: msg,
        }),
      );
    }
  };
