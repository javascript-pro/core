import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// simple UA parser
function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase();
  let browser = 'Unknown';
  let os = 'Unknown';
  let deviceType = 'Desktop';

  // Browser detection
  if (
    lower.includes('chrome') &&
    !lower.includes('edge') &&
    !lower.includes('edg/')
  ) {
    browser = 'Chrome';
  } else if (lower.includes('safari') && !lower.includes('chrome')) {
    browser = 'Safari';
  } else if (lower.includes('firefox')) {
    browser = 'Firefox';
  } else if (lower.includes('edg/')) {
    browser = 'Edge';
  }

  // OS detection
  if (lower.includes('win')) os = 'Windows';
  else if (lower.includes('mac')) os = 'macOS';
  else if (lower.includes('android')) os = 'Android';
  else if (lower.includes('iphone') || lower.includes('ipad')) os = 'iOS';
  else if (lower.includes('linux')) os = 'Linux';

  // Device type
  if (/mobi|android|iphone|ipad/i.test(lower)) deviceType = 'Mobile';

  return { browser, os, deviceType, raw: ua };
}

export const ping =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const state = getState();
      const bouncer = state?.redux?.bouncer;
      const visitor = bouncer?.visitor;

      if (visitor && typeof visitor.lastUpdated === 'number') {
        const now = Date.now();
        const diff = now - visitor.lastUpdated;

        // current pathname
        const currentPathname =
          typeof window !== 'undefined' ? window.location.pathname : '';
        const previousPathname: string = visitor.currentPathname || '';

        // build device object
        const device =
          typeof navigator !== 'undefined'
            ? {
                userAgent: parseUserAgent(navigator.userAgent),
                platform: navigator.platform || null,
                language: navigator.language || null,
                languages: navigator.languages || null,
                vendor: navigator.vendor || null,
                hardwareConcurrency: navigator.hardwareConcurrency || null,
                maxTouchPoints: (navigator as any).maxTouchPoints || 0,
                cookieEnabled: navigator.cookieEnabled,
                online: navigator.onLine,
              }
            : null;

        // conditions
        const pathnameChanged = currentPathname !== previousPathname;
        const waitedLongEnough = diff > 5000;

        if (pathnameChanged || waitedLongEnough) {
          const updatedVisitor = {
            ...visitor,
            currentPathname,
            lastUpdated: now,
            device, // attach parsed device info
          };

          const updatedBouncer = {
            ...bouncer,
            visitor: updatedVisitor,
          };

          // ---- Firestore part ----
          const fingerprint: string | undefined = visitor?.fingerprint;
          if (fingerprint) {
            const visitorRef = doc(db, 'visitors', fingerprint);
            const snap = await getDoc(visitorRef);

            if (snap.exists()) {
              await updateDoc(visitorRef, {
                fingerprint,
                lastPinged: now,
                currentPathname,
                device,
              });
            } else {
              await setDoc(visitorRef, {
                fingerprint,
                ip: visitor.ip || null,
                geo: visitor.geo || null,
                currentPathname,
                lastPinged: now,
                device,
              });
            }
          }

          // ---- Redux update ----
          dispatch(setUbereduxKey({ key: 'bouncer', value: updatedBouncer }));
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
