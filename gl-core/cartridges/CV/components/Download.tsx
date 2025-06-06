'use client';
import React from 'react';
import { marked } from 'marked';
import { Box } from '@mui/material';
import { MightyButton, useDispatch, forwardEmail } from '../../../../gl-core';
import { templatePDF } from '../';

export default function Download(cv: any) {
  const dispatch = useDispatch();

  const onDownloadClick = async () => {
    // console.log('cv.cv', cv.cv);
    const { default: html2pdf } = await import('html2pdf.js');
    const html = `
      <h2>Chris Dorward</h2>
      <h4>
        <a href="https://goldlabel.pro">goldlabel.pro</a> | 
        <a href="mailto:goldlabel.apps@gmail.com">goldlabel.apps@gmail.com</a> |
        <a href="https://wa.me/447745763122">+44 07745763122</a>
      </h4>
    ${marked.parse(cv.cv || '') as string}`;
    const fullHTML = templatePDF(html);

    const el = document.createElement('div');
    el.innerHTML = fullHTML;

    dispatch(
      forwardEmail({
        subject: 'CV Downloaded',
        text: `Someone downloaded the CV at ${new Date().toISOString()}.`,
      }),
    );

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
        onClick={onDownloadClick}
        variant="outlined"
        label="Download"
        icon="download"
      />
    </Box>
  );
}
