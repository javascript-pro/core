// goldlabel/components/Sitemap.tsx

import React from 'react'
import {
  Box,
} from '@mui/material'
// import { Icon } from '#/goldlabel'

export type SitemapProps = {
  globalNav?: any
}

export default function Sitemap({ globalNav }: SitemapProps) {

  return (
    <Box sx={{}}>
      <pre>globalNav: {JSON.stringify(globalNav, null, 2)}</pre>
    </Box>
  )
}
