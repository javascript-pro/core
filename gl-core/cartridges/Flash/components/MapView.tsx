'use client';
import * as React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, IconButton } from '@mui/material';
import { Icon } from '../../Theme';

export type TMapView = {
  id?: string;
  marker?: boolean;
  height?: number | string;
  center?: [number, number];
  zoom?: number;
};

export default function MapView({
  id = 'mapbox-map',
  marker = true,
  height = 400,
  center = [0, 0],
  zoom = 3,
}: TMapView) {
  const Mapbox = React.useMemo(
    () =>
      ReactMapboxGl({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string,
      }),
    [],
  );

  return (
    <Box
      id={id}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        width: '100%',
        height,
        position: 'relative',
      }}
    >
      <Mapbox
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        center={center}
        zoom={[zoom]}
      >
        {marker && (
          <Marker coordinates={center} anchor="bottom">
            {/* 👇 must wrap in a div so Mapbox can position it */}
            <div>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  boxShadow: 1,
                  '&:hover': { backgroundColor: 'white' },
                }}
              >
                <Icon icon="geo" color="primary" />
              </IconButton>
            </div>
          </Marker>
        )}
      </Mapbox>

      <Box
        sx={{
          position: 'absolute',
          bottom: 6,
          left: 8,
          bgcolor: 'rgba(255,255,255,0.8)',
          borderRadius: 1,
          px: 1,
          py: 0.25,
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Icon icon="geo" /> Mapbox
      </Box>
    </Box>
  );
}
