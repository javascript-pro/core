// core/gl-core/cartridges/Uberedux/hooks/useVersionCheck.ts
'use client';

import { useEffect } from 'react';
import pJSON from '../../../../package.json';
import { useSelector } from 'react-redux';
import { TRootState, resetUberedux } from '../store';
import { useDispatch } from 'react-redux';

export function useVersionCheck() {
  const currentVersion = pJSON.version;
  const persistedVersion = useSelector(
    (state: TRootState) => state.redux.version,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!persistedVersion || persistedVersion !== currentVersion) {
      const confirmed = window.confirm(
        `This app has updated to v${currentVersion}. Click OK to reload and clear your saved data.`,
      );
      if (confirmed) {
        dispatch(resetUberedux());
        window.location.reload(); // full reload to rehydrate clean
      }
    }
  }, [persistedVersion, currentVersion, dispatch]);
}
