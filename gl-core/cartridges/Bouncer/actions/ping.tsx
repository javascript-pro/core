import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';
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

        if (diff > 10000) {
          // grab current pathname on the client
          const currentPathname =
            typeof window !== 'undefined' ? window.location.pathname : '';

          // merge into visitor
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
              // update existing doc
              await updateDoc(visitorRef, {
                fingerprint, // ensure fingerprint stays in sync
                lastPinged: now,
                currentPathname,
              });
            } else {
              // create new doc
              await setDoc(visitorRef, {
                fingerprint,
                ip: visitor.ip || null,
                geo: visitor.geo || null,
                currentPathname,
                lastPinged: now,
              });
            }
          }

          // ---- Redux feedback and state update ----
          // dispatch(
          //   toggleFeedback({
          //     severity: 'success',
          //     title: 'Pinged',
          //   }),
          // );

          dispatch(setUbereduxKey({ key: 'bouncer', value: updatedBouncer }));
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
