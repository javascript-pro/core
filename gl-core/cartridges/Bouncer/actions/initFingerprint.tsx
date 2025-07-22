// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/actions/initFingerprint.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';
import { createDisplayName } from '../../Bouncer';

export type TFingerprint = {
  id: string;
  displayName?: string;
  avatar?: string; // new field for avatar path
  ip?: string;
  country_code?: string;
  country_name?: string;
  state_prov?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
  isp?: string;
  organization?: string;
  timezone_name?: string;
  timezone_offset?: number;
  current_time?: string;
  currency_code?: string;
  currency_symbol?: string;
  browser?: string;
  os?: string;
  isMobile?: boolean;
  platform?: string;
  vendor?: string;
  hardwareConcurrency?: number | null;
  deviceMemory?: number | null;
  languages?: string; // comma‑joined list
};

function getDeviceInfo() {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const vendor = navigator.vendor || '';

  // Simple mobile detection
  const isMobile = /Mobi|Android/i.test(ua);

  // Basic browser detection
  let browser = 'Unknown';
  if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (ua.indexOf('Edg') > -1) browser = 'Edge';
  else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1) browser = 'Safari';

  // Basic OS detection
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
    hardwareConcurrency: navigator.hardwareConcurrency || null,
    deviceMemory: (navigator as any).deviceMemory || null,
    languages: navigator.languages || [],
  };
}

export const initFingerprint =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    const state = getState();
    const bouncer = state?.redux?.bouncer;
    const visitor = bouncer?.visitor || {};

    // Guard: prevent running twice
    if (visitor?.inittingFingerprint) {
      console.log('initFingerprint already running, skipping');
      return;
    }

    try {
      // Mark as initting
      dispatch(
        setUbereduxKey({
          key: 'bouncer.visitor',
          value: { ...visitor, inittingFingerprint: true },
        }),
      );

      // 1. Generate fingerprint id
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const id = `${window.location.hostname}_${result.visitorId}`;

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
              toggleFeedback({
                severity: 'error',
                title: `Geo API error: ${geoRes.status} ${geoRes.statusText}`,
              }),
            );
          }
        } catch (geoErr) {
          console.error('Geo API fetch failed', geoErr);
        }
      }

      // 3. Device info
      const device = getDeviceInfo();

      // 4. Get display name & avatar (thunk call)
      const displayObj = await dispatch(
        createDisplayName(geoData.country_name, device.browser),
      );
      const displayName = displayObj?.name || 'NONAME';
      const avatar = displayObj?.avatar || '/svg/characters/default.svg';

      // 5. Flatten all into fingerprint
      const fingerprint: TFingerprint = {
        id,
        displayName,
        avatar,
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
      };

      // 6. Save to redux
      dispatch(
        setUbereduxKey({
          key: 'bouncer.visitor',
          value: {
            ...visitor,
            inittingFingerprint: false,
            fingerprint,
            ready: true,
          },
        }),
      );

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Fingerprint created',
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);

      // clear flag on error
      dispatch(
        setUbereduxKey({
          key: 'bouncer.visitor',
          value: { ...visitor, inittingFingerprint: false },
        }),
      );

      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
