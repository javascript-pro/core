import { setUbereduxKey } from '../../gl-core';
import { TUbereduxDispatch } from '../../gl-core/types';

const safeSet = (
  dispatch: TUbereduxDispatch,
  key: string | string[],
  value: any,
) => {
  const finalKey = Array.isArray(key) ? key.join('.') : key;
  if (typeof finalKey !== 'string') {
    console.warn('[setUbereduxKey] Invalid key:', key);
    return;
  }
  dispatch(setUbereduxKey({ key: finalKey, value }));
};

export const forwardEmail = ({
  subject,
  text,
  to = 'goldlabel.apps@gmail.com',
}: {
  subject: string;
  text: string;
  to?: string;
}) => {
  return async (dispatch: TUbereduxDispatch) => {
    try {
      const res = await fetch('/api/gl-api/forwardemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_EMAIL_SECRET || '',
        },
        body: JSON.stringify({ subject, text, to }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send email');

      console.log('Email sent');

      safeSet(dispatch, ['email', 'status'], 'success');
    } catch (err) {
      console.error('Email error:', err);
      safeSet(dispatch, ['email', 'status'], 'error');
    }
  };
};
