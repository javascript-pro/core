// /Users/goldlabel/GitHub/core/gl-core/cartridges/Theme/Sound.tsx
'use client';

import React, { createContext, useContext, useRef } from 'react';
import useSound from 'use-sound';

type SoundKeys = 'ding' | 'error' | 'success';

type SoundContextType = {
  play: (sound: SoundKeys) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // --- Load sounds once ---
  const [playDing] = useSound('/mp3/new-notification.mp3', { volume: 0.7 });
  const [playError] = useSound('/mp3/error.mp3', { volume: 0.7 });
  const [playSuccess] = useSound('/mp3/success.mp3', { volume: 0.7 });

  // --- throttle plays to avoid spam ---
  const lastPlayed = useRef<Record<SoundKeys, number>>({
    ding: 0,
    error: 0,
    success: 0,
  });

  const play = (sound: SoundKeys) => {
    const now = Date.now();
    const last = lastPlayed.current[sound];
    // only allow once every 300ms per sound
    if (now - last < 300) return;
    lastPlayed.current[sound] = now;

    switch (sound) {
      case 'ding':
        playDing();
        break;
      case 'error':
        playError();
        break;
      case 'success':
        playSuccess();
        break;
    }
  };

  return (
    <SoundContext.Provider value={{ play }}>{children}</SoundContext.Provider>
  );
}

export function useSounds() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSounds must be used within SoundProvider');
  return ctx;
}
