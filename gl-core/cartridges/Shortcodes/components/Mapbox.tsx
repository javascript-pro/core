// /Users/goldlabel/GitHub/core/gl-core/cartridges/Shortcodes/components/Mapbox.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import Map from 'react-map-gl/mapbox';
// import { useBouncer } from '../../Bouncer';
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export default function Mapbox({ ping }: { ping: any }) {
  // const b = useBouncer();

  // const latitude = parseFloat(ping?.latitude ?? 0);
  // const longitude = parseFloat(ping?.longitude ?? 0);

  // if (!latitude || !longitude) {
  //   return <Box>No location available</Box>;
  // }

  return (
    <Box
      sx={{ height: 300, width: '100%', borderRadius: 2, overflow: 'hidden' }}
    >
      <pre style={{ fontSize: 10 }}>
        livePing: {JSON.stringify(false, null, 2)}
      </pre>

      {/* <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude,
          latitude,
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      ></Map> */}
    </Box>
  );
}
