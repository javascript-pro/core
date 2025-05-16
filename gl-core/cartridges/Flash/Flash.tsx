'use client';

import * as React from 'react';
import { Stage, MovieClip } from '../Flash';

export type TFlash = {
  id: string | null;
  children?: React.ReactNode;
};

export default function Flash({ id = null, children }: TFlash) {
  // Future: flash state machine, playhead, timeline, etc.

  return (
    <Stage id={id}>
      {children}
    </Stage>
  );
}
