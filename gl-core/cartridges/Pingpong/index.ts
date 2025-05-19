import { getFingerprint } from './getFingerprint';
import { getIPData } from './getIPData';
import { sendPing } from './sendPing';
import { PingPayload } from './types';

export async function initPingpong() {
  const [fingerprint, ipData] = await Promise.all([
    getFingerprint(),
    getIPData(),
  ]);

  const payload: PingPayload = {
    fingerprint,
    userAgent: navigator.userAgent,
    ip: ipData.ip,
    location: ipData.location,
    timestamp: Date.now(),
  };

  await sendPing(payload);
}
