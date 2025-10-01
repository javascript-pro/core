// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/ping.tsx
import { TUbereduxDispatch } from '../../Uberedux';
import { setUbereduxKey } from '../../Uberedux';
import { setBouncerKey } from '../';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

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

      // Grab current title + url
      const title = document?.title ?? '';
      const url = typeof window !== 'undefined' ? window.location.href : '';
      const historyEntry = {
        title,
        url,
        time: Date.now(),
      };

      if (snap.exists()) {
        console.log('Updating ping/', ping.id);

        // ✅ Add to history (arrayUnion will append new entry without overwriting)
        await updateDoc(ref, {
          updated: Date.now(),
          history: arrayUnion(historyEntry),
        });

        dispatch(setBouncerKey('id', ping.id));
        dispatch(setBouncerKey('pinged', true));
      } else {
        console.log('Creating new ping in Firestore', ping.id);

        await setDoc(ref, {
          ...ping,
          created: Date.now(),
          updated: Date.now(),
          history: [historyEntry], // start with first record
        });

        dispatch(setBouncerKey('id', ping.id));
        dispatch(setBouncerKey('pinged', true));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
