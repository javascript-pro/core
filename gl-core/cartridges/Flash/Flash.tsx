// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/Flash.tsx
'use client';
import * as React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Stage, useFlash, setFlashKey } from '../Flash';
import { MightyButton } from '../../../gl-core';
import { useDispatch } from '../Uberedux';

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
  height = 250,
  color = 'black',
  loop = false,
  ...rest
}: TFlashProps) {
  const flashStore = useFlash();
  const dispatch = useDispatch();
  const loopNormalized =
    typeof loop === 'string' ? loop.toLowerCase() === 'true' : loop;

  const handleReplay = () => {
    // console.log('Replay pressed');
    dispatch(setFlashKey('introDone', false));
  };

  return (
    <>
      <Stage
        movie={movie}
        width={width}
        height={300}
        color={color}
        loop={loopNormalized}
        {...rest}
      />

      {/* Toolbar */}
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <MightyButton
          fullWidth
          color="primary"
          label="Replay"
          icon="reset"
          iconPlacement="right"
          onClick={handleReplay}
        />
      </Toolbar>

      {/* <pre>flashStore: {JSON.stringify(flashStore, null, 2)}</pre> */}
    </>
  );
}
