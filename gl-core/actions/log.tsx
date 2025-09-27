// /Users/goldlabel/GitHub/core/gl-core/actions/log.tsx

import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core/types';

type TLog = {
  type: string;
  title: string;
  severity?: string;
  description?: string;
};

export const log = (payload: TLog) => async (dispatch: TUbereduxDispatch) => {
  try {
    const res = await fetch('/api/gl-api/logs', {
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
          title: `Logged: ${payload.title}`,
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
