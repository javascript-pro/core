// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/PingViewer.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { usePings, MessageForm, MessageList } from '../../Pings';
// import { Mapbox } from '../../../../gl-core';

export default function PingViewer() {
  const b = usePings();

  return (
    <Box>
      {/* <Mapbox ping={b.livePing} /> */}
      <MessageList ping={b.livePing} />
      <MessageForm ping={b.livePing} />
      {/* Debug view: 
      <pre style={{ fontSize: 10 }}>
        livePing: {JSON.stringify(b.livePing, null, 2)}
      </pre> */}
    </Box>
  );
}
