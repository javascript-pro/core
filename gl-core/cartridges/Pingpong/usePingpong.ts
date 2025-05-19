'use client';

import * as React from 'react';
import { initPingpong } from './index';

export function usePingpong(enabled = true) {
  React.useEffect(() => {
    if (!enabled) return;
    initPingpong();
  }, [enabled]);
}
