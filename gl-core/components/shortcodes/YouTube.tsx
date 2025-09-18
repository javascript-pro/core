// core/gl-core/components/shortcodes/YouTube.tsx
import React from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@mui/material';

export default function YouTube({ src }: { src: string }) {
  if (!src) return null;

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <ReactPlayer
        src={src}
        controls
        width="100%"
        height="auto"
        style={{ aspectRatio: '16/9' }}
      />
    </Box>
  );
}

/*
config={{
          youtube: {
            start: 60,
          },
        }}
*/
