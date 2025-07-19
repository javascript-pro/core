import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export const ping =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const state = getState();
      const bouncer = state?.redux?.bouncer;
      const visitor = bouncer?.visitor;

      if (visitor && typeof visitor.lastUpdated === 'number') {
        const now = Date.now();
        const diff = now - visitor.lastUpdated;

        // check current pathname
        const currentPathname =
          typeof window !== 'undefined' ? window.location.pathname : '';
        const previousPathname: string = visitor.currentPathname || '';

        // conditions:
        const pathnameChanged = currentPathname !== previousPathname;
        const waitedLongEnough = diff > 5000;

        // if pathname changed OR waited > 10 seconds
        if (pathnameChanged || waitedLongEnough) {
          const updatedVisitor = {
            ...visitor,
            currentPathname,
            lastUpdated: now,
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
              });
            } else {
              await setDoc(visitorRef, {
                fingerprint,
                ip: visitor.ip || null,
                geo: visitor.geo || null,
                currentPathname,
                lastPinged: now,
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
