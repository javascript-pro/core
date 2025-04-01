'use client'

import * as React from 'react'
import Image from 'next/image'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { Sitemap } from '#/goldlabel'

type HomeProps = {
  open?: boolean
}

export default function Home({}: HomeProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box component="main" sx={{ px: 2, pb: 4 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: fullScreen ? 100 : 150,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Image
          src="/jpg/images/spade.jpg"
          alt="Spage cover"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>

      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        align="center"
      >
        Welcome to Goldlabel
      </Typography>

      <Typography variant="body1" sx={{}}>
        We build modern apps for a modern web. Explore our projects, tools, and ideas — all in one place.
      </Typography>

      {/* Optionally add sitemap or featured links here */}
      {/* <Sitemap globalNav={yourNavDataHere} /> */}
    </Box>
  )
}
