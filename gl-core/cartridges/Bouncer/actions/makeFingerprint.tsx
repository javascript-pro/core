// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/actions/makeFingerprint.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const makeFingerprint =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const state = getState();
      const bouncer = state?.redux?.bouncer;
      const visitor = bouncer?.visitor || {};

      // 1. Generate fingerprint
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = `${window.location.hostname}_${result.visitorId}`;

      // 2. Look up IP + geo data
      const apiKey = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY;
      if (!apiKey) {
        throw new Error(
          'Missing NEXT_PUBLIC_IPGEOLOCATION_API_KEY in environment variables.',
        );
      }

      const geoRes = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`,
      );
      if (!geoRes.ok) {
        throw new Error(`Geo API error: ${geoRes.status} ${geoRes.statusText}`);
      }

      const geoData = await geoRes.json();

      // 3. Merge all info into visitor
      const now = Date.now();
      const updatedVisitor = {
        ...visitor,
        ready: true,
        lastUpdated: now,
        fingerprint,
        ip: geoData.ip || null,
        geo: {
          country: geoData.country_name || null,
          countryCode: geoData.country_code2 || null,
          region: geoData.state_prov || null,
          city: geoData.city || null,
          latitude: geoData.latitude || null,
          longitude: geoData.longitude || null,
          timezone: geoData.time_zone?.name || null,
        },
      };

      const updatedBouncer = {
        ...bouncer,
        visitor: updatedVisitor,
      };

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Visitor info ready.',
        }),
      );

      dispatch(setUbereduxKey({ key: 'bouncer', value: updatedBouncer }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
