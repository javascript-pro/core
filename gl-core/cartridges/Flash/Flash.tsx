'use client';

import * as React from 'react';
import { Stage } from '../Flash';

export type TFlash = {
  id: string;
  children?: React.ReactNode;
  scene?: string;
};

export default function Flash({
  id = 'flash-',
  scene = 'core',
  children,
}: TFlash) {
  React.useEffect(() => {
    const loadScene = async () => {
      try {
        const scene = await import('./Scenes/core');
        setTimeout(() => {
          scene.init();
        }, 1);
      } catch (err) {
        console.error('Failed to load core scene', err);
      }
    };

    loadScene();
  }, []);

  return <Stage id={id}>{children}</Stage>;
}
