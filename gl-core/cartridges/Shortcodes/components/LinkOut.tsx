// /Users/goldlabel/GitHub/example-app/gl-core/cartridges/Shortcodes/components/LinkOut.tsx
'use client';
import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Typography,
  Grid,
} from '@mui/material';
import { Icon } from '../../../../gl-core';

export default function LinkOut({
  url,
  title = 'No title provided',
  icon = 'link',
}: {
  url: string;
  title: string;
  icon?: string;
}) {
  const handleClick = () => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <CardHeader
              sx={{ alignItems: 'flex-start' }}
              avatar={
                <Box sx={{ mt: 0.5 }}>
                  <Icon icon={icon as any} color="primary" />
                </Box>
              }
              title={<Typography variant="h6">{title}</Typography>}
            />
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
