// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/Flash.tsx
'use client';
import * as React from 'react';
import { Toolbar } from '@mui/material';
import { Stage, useFlash } from '../Flash';
import { MightyButton } from '../../../gl-core';

export type TFlashProps = {
  movie?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  loop?: boolean | string; // might arrive as string from Markdown
  [key: string]: any; // catch-all for future shortcode props
};

export default function Flash({
  movie = 'default_movie',
  width = 300,
  height = 200,
  color = 'dodgerblue',
  loop = false,
  ...rest
}: TFlashProps) {
  const flashStore = useFlash();
  const loopNormalized =
    typeof loop === 'string' ? loop.toLowerCase() === 'true' : loop;

  const handleReplay = () => console.log('Replay pressed');

  return (
    <>
      <Stage
        movie={movie}
        width={width}
        height={height}
        color={color}
        loop={loopNormalized}
        {...rest}
      />

      {/* Toolbar */}
      <Toolbar>
        <MightyButton label="Replay" icon="flash" onClick={handleReplay} />
      </Toolbar>

      <pre>flashStore: {JSON.stringify(flashStore, null, 2)}</pre>
    </>
  );
}
