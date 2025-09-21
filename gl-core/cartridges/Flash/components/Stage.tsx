'use client';

import * as React from 'react';
import { Box, useTheme } from '@mui/material';
import { MacromediaMC, Presenter } from '../../Flash';
import { intro } from '../../Flash';
import { useDispatch } from '../../Uberedux';
import { setFlashKey, useFlash } from '../../Flash';

export type TStageProps = {
  movie?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  loop?: boolean;
  [key: string]: any;
};

export default function Stage({
  movie = 'intro',
  width = 300,
  height = 250,
  color = 'black',
  loop = false,
  ...rest
}: TStageProps) {
  const shapeRef = React.useRef<SVGCircleElement | null>(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const flash = useFlash();
  const { introDone } = flash;

  React.useEffect(() => {
    if (!shapeRef.current) return;

    let tl: gsap.core.Timeline | undefined;

    switch (movie) {
      case 'intro':
      default:
        tl = intro({
          target: shapeRef.current,
          color,
          loop,
          alreadyDone: introDone,
          onComplete: () => {
            dispatch(setFlashKey('introDone', true));
          },
        });
        break;
    }

    return () => {
      tl?.kill();
    };
  }, [movie, color, loop, introDone, dispatch]);

  return (
    <Box
      sx={{
        my: 2,
        height,
        width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...rest}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* background first */}
        <Presenter />
        {/* overlay animation centered */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <MacromediaMC ref={shapeRef} />
        </Box>
      </Box>
    </Box>
  );
}
