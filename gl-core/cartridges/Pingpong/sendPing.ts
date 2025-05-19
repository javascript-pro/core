import { PingPayload } from './types';

export async function sendPing(payload: PingPayload) {
  try {
    await fetch('/api/gl-api/pingpong', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Pingpong error:', err);
  }
}
