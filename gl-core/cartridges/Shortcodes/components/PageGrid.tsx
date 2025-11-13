// /Users/goldlabel/GitHub/core/gl-core/cartridges/Shortcodes/components/PageGrid.tsx
import React from 'react';
import { Box } from '@mui/material';
import {useIsMobile} from '../../../../gl-core';
export default function PageGrid({ pages }: { pages: string }) {
  
  const isMobile = useIsMobile();

  return <Box>

          <pre>pages: {JSON.stringify(pages, null, 2)}</pre>
          <pre>isMobile: {JSON.stringify(isMobile, null, 2)}</pre>
        </Box>;
}
