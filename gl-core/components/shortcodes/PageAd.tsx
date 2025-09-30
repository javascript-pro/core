// /Users/goldlabel/GitHub/core/gl-core/components/shortcodes/PageAd.tsx
import React from 'react';
import { Box } from '@mui/material';

export default function PageAd({ slug = '/' }: { slug: string }) {
  return <Box sx={{ border: '1px solid red' }}>PageAd {slug}</Box>;
}
