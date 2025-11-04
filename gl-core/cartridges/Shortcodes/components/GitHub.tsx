// /Users/goldlabel/GitHub/core/gl-core/cartridges/Shortcodes/components/PageAd.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Alert,
  Typography,
} from '@mui/material';
import { useGlobalNav, Icon } from '../../../../gl-core';

export default function GitHub({ url = 'https://', label = '' }) {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  // console.log("url", url)

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <CardHeader
          sx={{
            alignItems: 'flex-start',
          }}
          avatar={
            <Box sx={{}}>
              <Icon icon={'github'} color="primary" />
            </Box>
          }
          title={<Typography variant="body1">{label}</Typography>}
        />
      </CardActionArea>
    </Card>
  );
}
