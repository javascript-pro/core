// /app/src/Flash/Flash.tsx
import React from 'react';
import { Box } from '@mui/material';
import { TFlashConfig } from './types';
import {
  Stage,
  MovieClip,
  Controls,
  useFlash,
  setFlashKey,
  useDispatch,
} from '../Flash';
import ActionScript from './actionscript';
import { Logo } from './movieclips/Logo';

export default function Flash({ config = {} }: { config?: TFlashConfig }) {
  const { width = 300, height = 200 } = config;
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { resetRequested } = useFlash();

  // run once on mount
  React.useEffect(() => {
    const flash = new ActionScript(stageRef.current);
    flash.setup('mc_bolt', { speed: 3 });
  }, []);

  // listen for reset requests
  React.useEffect(() => {
    if (resetRequested) {
      const flash = new ActionScript(stageRef.current);
      flash.setup('mc_bolt', { speed: 3 });
      dispatch(setFlashKey('resetRequested', false)); // clear flag
    }
  }, [resetRequested, dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Stage id="intro" width={width} height={height} ref={stageRef}>
        <MovieClip id="mc_controls" height={50} zIndex={15}>
          <Controls />
        </MovieClip>

        <Logo id="flash_logo" />
      </Stage>
    </Box>
  );
}
