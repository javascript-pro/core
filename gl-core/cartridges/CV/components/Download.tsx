'use client';
import React from 'react';
import { marked } from 'marked';
import { Box } from '@mui/material';
import { MightyButton, useSlice } from '../../../';
import { templatePDF } from '../';

export default function Download() {
  const slice = useSlice();
  const { resume } = slice.cv;

  const onDownloadClick = async () => {
    const { default: html2pdf } = await import('html2pdf.js');
    const fullHTML = templatePDF(marked.parse(resume || '') as string);

    const el = document.createElement('div');
    el.innerHTML = fullHTML;

    html2pdf()
      .from(el)
      .set({
        margin: 0,
        filename: 'Chris_Dorward_CV.pdf',
        image: { type: 'jpeg', quality: 0.4 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .save();
  };

  return (
    <Box>
      {/* <pre>markdown: {JSON.stringify(markdown, null, 2)}</pre> */}
      <MightyButton
        fullWidth
        onClick={onDownloadClick}
        color="secondary"
        label="Download"
        variant="contained"
        icon="download"
      />
    </Box>
  );
}
