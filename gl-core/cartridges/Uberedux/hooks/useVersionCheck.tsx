'use client';

import { useEffect, useRef } from 'react';
import pJSON from '../../../../package.json';
import { useSelector, useDispatch } from 'react-redux';
import { TRootState, resetUberedux } from '../store';

export function useVersionCheck() {
  const currentVersion = pJSON.version;
  const persistedVersion = useSelector(
    (state: TRootState) => state.redux.version,
  );
  const dispatch = useDispatch();
  const hasCheckedRef = useRef(false); // prevent double-execution

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    if (!persistedVersion || persistedVersion !== currentVersion) {
      const confirmed = window.confirm(
        `${pJSON.name} updated to v${currentVersion}. Reload and clear your saved data?`,
      );
      if (confirmed) {
        dispatch(resetUberedux());
        setTimeout(() => {
          window.location.reload(); // full reload to rehydrate clean
        }, 100);
      }
    }
  }, [persistedVersion, currentVersion, dispatch]);
}
