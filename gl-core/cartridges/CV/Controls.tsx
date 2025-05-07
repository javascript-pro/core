'use client';

import * as React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { MightyButton } from '../../';
import { marked } from 'marked';
import {templatePDF} from "./"

export type TControls = {
  markdown?: string;
};

export default function Controls({ markdown = 'No content' }: TControls) {
  const onDownloadClick = async () => {
    // Dynamically import html2pdf ONLY when the button is clicked
    const { default: html2pdf } = await import('html2pdf.js');
    const fullHTML = templatePDF(marked.parse(markdown) as string);

    const el = document.createElement('div');
    el.innerHTML = fullHTML;

    html2pdf()
      .from(el)
      .set({
        margin: 0,
        filename: 'Chris_Dorward_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .save();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'white',
        display: 'flex',
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <MightyButton
          icon="save"
          label="Save PDF"
          variant="outlined"
          color="secondary"
          onClick={onDownloadClick}
        />
      </Toolbar>
    </AppBar>
  );
}
