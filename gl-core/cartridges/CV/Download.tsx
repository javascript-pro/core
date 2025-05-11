'use client';
import React from 'react';
import { Box } from '@mui/material';
import { MightyButton } from '../../';

export type TDownload = {
  markdown?: string | null;
};

export default function Download({ markdown = null }: TDownload) {
  return (
    <Box>
      {/* <pre>markdown: {JSON.stringify(markdown, null, 2)}</pre> */}
      Download
    </Box>
  );
}

/*
          <MightyButton
            fullWidth
            onClick={onDownloadClick}
            color="secondary"
            label="Download PDF"
            variant="contained"
            icon="download"
          />
*/
