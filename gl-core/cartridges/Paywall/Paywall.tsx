// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';
import * as React from 'react';
import { useDispatch } from '../../../gl-core';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { setPaywallKey, UserDialog } from '../Paywall';

export default function Paywall() {
  const dispatch = useDispatch();
  // const user = useUser();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      dispatch(setPaywallKey('user', user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <>
          <UserDialog />
        </>;
}
