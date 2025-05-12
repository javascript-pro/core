'use client';
import React from 'react';
import { Box } from '@mui/material';
import { MightyButton } from '../../../';

export default function Download() {
  return (
    <Box>
      {/* <pre>markdown: {JSON.stringify(markdown, null, 2)}</pre> */}
      <MightyButton
        fullWidth
        onClick={() => {}}
        color="secondary"
        label="Download CV"
        variant="contained"
        icon="download"
      />
    </Box>
  );
}

/*

*/
