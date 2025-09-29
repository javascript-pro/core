// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/PingViewer.tsx
'use client';
import * as React from 'react';
import { Box, CardHeader, CardContent, Grid, Typography } from '@mui/material';
import { Icon } from '../../../../gl-core';
import { useBouncer } from '../../Bouncer';

export default function PingViewer() {
  const b = useBouncer();
  const ping = b?.ping ?? {};

  const deviceFields: { key: keyof typeof ping; label: string }[] = [
    { key: 'browser', label: 'Browser' },
    { key: 'os', label: 'OS' },
    // { key: 'isMobile', label: 'Mobile' },
  ];

  const geoFields: { key: keyof typeof ping; label: string }[] = [
    { key: 'ip', label: 'IP' },
    { key: 'country_name', label: 'Country' },
    { key: 'state_prov', label: 'State/Province' },
    { key: 'city', label: 'City' },
    { key: 'timezone_name', label: 'Timezone' },
    { key: 'current_time', label: 'Local Time' },
  ];

  return (
    <>
      {/* Device & Browser */}
      <CardContent>
        <Box sx={{ display: 'flex'}}>
          {deviceFields.map(({ key, label }, i) => {
            const value = ping[key];
            if (value == null) return null;

            const icon = String(value).toLowerCase();

            return (
              <Box
                key={`deviceinfo_${i}`}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Icon icon={icon as any} />
                <Typography sx={{ mx: 2 }} variant="body2">
                  {key === 'isMobile'
                    ? value
                      ? 'mobile'
                      : 'desktop'
                    : String(value)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>

      {/* Geo Info */}
      <CardHeader 
        avatar={<Icon icon={'geolocator'} />}
        title="Geo Information" />
      <CardContent>
        <Grid container spacing={2}>
          {geoFields.map(({ key, label }, i) => {
            const value = ping[key];
            if (value == null) return null;

            return (
              <Grid
                size={12}
                key={`geo_${i}`}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                
                <Typography sx={{ ml: 1 }} variant="body2">
                  <strong>{label}:</strong> {String(value)}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>

      {/* <pre style={{ fontSize: 10 }}>
        b.ping: {JSON.stringify(b.ping, null, 2)}
      </pre> */}
    </>
  );
}
