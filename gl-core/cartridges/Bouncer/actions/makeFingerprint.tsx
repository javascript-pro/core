// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/actions/makeFingerprint.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { ping } from './ping'; // make sure this path is correct

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

      // 3. Gather device/browser info
      const device = {
        userAgent: navigator.userAgent || null,
        platform: navigator.platform || null,
        language: navigator.language || null,
        languages: navigator.languages || null,
        vendor: navigator.vendor || null,
        hardwareConcurrency: navigator.hardwareConcurrency || null,
        maxTouchPoints: (navigator as any).maxTouchPoints || 0,
        cookieEnabled: navigator.cookieEnabled,
        online: navigator.onLine,
      };

      // 4. Figure out if lastUpdated was < 10 seconds ago
      const now = Date.now();
      let status: string | undefined;
      if (visitor.lastUpdated && typeof visitor.lastUpdated === 'number') {
        const secondsSinceLastUpdate = (now - visitor.lastUpdated) / 1000;
        if (secondsSinceLastUpdate < 10) {
          status = 'online';
        }
      }

      // 5. Merge all info into visitor
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
        device, // NEW device info
        ...(status ? { status } : {}), // only add status if online
      };

      const updatedBouncer = {
        ...bouncer,
        visitor: updatedVisitor,
      };

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Ping ready',
        }),
      );

      dispatch(setUbereduxKey({ key: 'bouncer', value: updatedBouncer }));

      // 6. Once ready is true, dispatch ping
      if (updatedVisitor.ready) {
        dispatch(ping());
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
