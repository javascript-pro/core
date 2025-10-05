// /Users/goldlabel/GitHub/core/gl-core/cartridges/Shortcodes/components/PrevNext.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid } from '@mui/material';
import { MightyButton, routeTo, useDispatch } from '../../../../gl-core';

export default function PrevNext({
  prev,
  next,
}: {
  prev: string;
  next: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  if (!prev && !next) return null;

  const handlePrev = () => {
    // console.log("handlePrev", prev);
    dispatch(routeTo(prev, router));
  };

  const handleNext = () => {
    // console.log("handleNext", next);
    dispatch(routeTo(next, router));
  };

  return (
    <Box sx={{}}>
      <Grid container>
        {prev && (
          <Grid size={next ? 6 : 12}>
            <MightyButton
              fullWidth
              label="Previous"
              icon="left"
              onClick={handlePrev}
            />
          </Grid>
        )}

        {next && (
          <Grid size={prev ? 6 : 12}>
            <MightyButton
              fullWidth
              label="Next"
              icon="right"
              iconPlacement="right"
              onClick={handleNext}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
