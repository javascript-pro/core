// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/createPing.tsx
import { TUbereduxDispatch } from '../../Uberedux';
import { setUbereduxKey } from '../../Uberedux';
import { setBouncerKey } from '../';

// bring in FingerprintJS dynamically (client-side only)
const loadFingerprint = async () => {
  const FingerprintJS = (await import('@fingerprintjs/fingerprintjs')).default;
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return `${window.location.hostname}_${result.visitorId}`;
};

function getDeviceInfo() {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const vendor = navigator.vendor || '';
  const isMobile = /Mobi|Android/i.test(ua);

  let browser = 'Unknown';
  if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua)) browser = 'Safari';

  let os = 'Unknown';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac/i.test(ua)) os = 'MacOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

  return {
    browser,
    os,
    isMobile,
    platform,
    vendor,
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,
    deviceMemory: (navigator as any).deviceMemory ?? null,
    languages: navigator.languages ?? [],
  };
}

export const createPing =
  () => async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const current = state?.redux.bouncer;

      // avoid re-creating if already ready
      if (current?.pingReady) return;

      // 1. Generate fingerprint id
      const id = await loadFingerprint();

      // 2. Geo data
      const apiKey = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY;
      let geoData: any = {};
      if (apiKey) {
        try {
          const geoRes = await fetch(
            `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`,
          );
          if (geoRes.ok) {
            geoData = await geoRes.json();
          } else {
            dispatch(
              setUbereduxKey({
                key: 'error',
                value: `Geo API error: ${geoRes.status} ${geoRes.statusText}`,
              }),
            );
          }
        } catch (geoErr) {
          console.error('Geo API fetch failed', geoErr);
        }
      }

      // 3. Device info
      const device = getDeviceInfo();

      // 4. Build ping object
      const ping = {
        id,
        hostname: window.location.hostname,
        pathname: window.location.pathname,
        ip: geoData.ip,
        country_code: geoData.country_code2,
        country_name: geoData.country_name,
        state_prov: geoData.state_prov,
        city: geoData.city,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        isp: geoData.isp,
        organization: geoData.organization,
        timezone_name: geoData.time_zone?.name,
        timezone_offset: geoData.time_zone?.offset,
        current_time: geoData.time_zone?.current_time,
        currency_code: geoData.currency?.code,
        currency_symbol: geoData.currency?.symbol,
        browser: device.browser,
        os: device.os,
        isMobile: device.isMobile,
        platform: device.platform,
        vendor: device.vendor,
        hardwareConcurrency: device.hardwareConcurrency,
        deviceMemory: device.deviceMemory,
        languages: Array.isArray(device.languages)
          ? device.languages.join(',')
          : '',
        created: Date.now(),
      };

      // 5. Dispatch into bouncer slice
      dispatch(setBouncerKey('ping', ping));
      dispatch(setBouncerKey('pingReady', true));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
