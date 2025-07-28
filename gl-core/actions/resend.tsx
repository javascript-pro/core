// core/gl-core/actions/resend.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core/types';

type TResendPayload = {
  to: string;
  subject: string;
  body: string;
};

export const resend =
  (payload: TResendPayload) => async (dispatch: TUbereduxDispatch) => {
    try {
      const res = await fetch('/api/gl-api/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Unknown error from resend');
      }

      await res.json();

      dispatch(
        setUbereduxKey({
          key: 'feedback',
          value: {
            status: 'success',
            title: `Email sent successfully to ${payload.to}`,
          },
        }),
      );
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      dispatch(
        setUbereduxKey({
          key: 'feedback',
          value: {
            status: 'error',
            title: `Failed to send email: ${errorMessage}`,
          },
        }),
      );
    }
  };
