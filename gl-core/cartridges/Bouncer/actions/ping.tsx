// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/ping.tsx
import { TUbereduxDispatch } from '../../Uberedux';
import { setUbereduxKey } from '../../Uberedux';
import { setBouncerKey } from '../';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const ping =
  () => async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const ping = state?.redux.bouncer?.ping;

      if (!ping?.id) {
        throw new Error('No ping id available');
      }

      const ref = doc(db, 'pings', ping.id);
      const snap = await getDoc(ref);

      const title = document?.title ?? '';
      const url = typeof window !== 'undefined' ? window.location.href : '';
      const historyEntry = {
        title,
        url,
        time: Date.now(),
      };

      if (snap.exists()) {
        const data = snap.data();
        const history = Array.isArray(data.history) ? data.history : [];
        const last = history[history.length - 1];

        const isDifferent =
          !last ||
          last.title !== historyEntry.title ||
          last.url !== historyEntry.url;

        if (isDifferent) {
          // 🔑 push manually instead of arrayUnion
          const newHistory = [...history, historyEntry];
          await updateDoc(ref, {
            updated: Date.now(),
            history: newHistory,
          });
        } else {
          await updateDoc(ref, {
            updated: Date.now(),
          });
        }

        dispatch(setBouncerKey('id', ping.id));
        dispatch(setBouncerKey('pinged', true));
      } else {
        await setDoc(ref, {
          ...ping,
          created: Date.now(),
          updated: Date.now(),
          history: [historyEntry],
        });

        dispatch(setBouncerKey('id', ping.id));
        dispatch(setBouncerKey('pinged', true));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
