'use client';
import * as React from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Button, useTheme } from '@mui/material';
import { usePings } from '../../Pings';
// import {} from

export type TMapView = {
  id?: string;
  marker?: boolean;
  height?: number | string;
  zoom?: number;
  center?: [number, number]; // [longitude, latitude]
};

export default function MapView({
  id = 'mapbox-map',
  marker = true,
  height = 400,
  zoom = 3,
}: TMapView) {
  const b = usePings();
  const themeMode = useTheme().palette.mode;
  const mapStyle =
    themeMode === 'dark'
      ? 'mapbox://styles/listingslab/cm64vcspm00ai01s70639614u' // dark
      : 'mapbox://styles/listingslab/cm64umn9t001i01sa2ym45wfp'; // light

  return (
    <Box
      id={id}
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        width: '100%',
        height,
        position: 'relative',
      }}
    >
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: b.livePing?.longitude || 0,
          latitude: b.livePing?.latitude || 0,
          zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
      >
        {marker && (
          <Marker
            longitude={b.livePing?.longitude || 0}
            latitude={b.livePing?.latitude || 0}
            anchor="center"
          >
            <Button variant="contained">{b.livePing?.city || ''}</Button>
          </Marker>
        )}
      </Map>
    </Box>
  );
}
