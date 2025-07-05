'use client';

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';

export const analyse =
  (id: string) =>
  async (dispatch: TUbereduxDispatch, getState: () => any): Promise<void> => {
    try {
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid ID for analysis');
      }

      // Fetch new endpoint instead
      const res = await fetch('/api/gl-api/fallmanager/pdf-co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'PDF.co analysis failed');
      }

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'AI-Analysed',
        }),
      );

      // Optional: forward result into Redux
      // dispatch(setUbereduxKey({ key: 'docData', value: data.result }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unbekannter Fehler';
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: msg,
        }),
      );
    }
  };
