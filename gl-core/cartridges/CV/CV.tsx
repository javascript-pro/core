'use client';

import * as React from 'react';
import { Container, Typography } from '@mui/material';
import { Controls } from './';
import ReactMarkdown from 'react-markdown';

import { useSlice, useDispatch } from '../../';
import { setUbereduxKey } from '../../';
import { updateCVKey } from './';

export type TCV = {
  markdown?: string;
};

export default function CV({ markdown = 'No content' }: TCV) {
  const slice = useSlice();
  const {cv} = slice;
  const dispatch = useDispatch();

  // Slugify helper for section IDs
  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

  // Extract ## section headings from markdown
  const extractSections = (md: string) =>
    md
      .split('\n')
      .filter((line) => line.startsWith('## '))
      .map((line) => {
        const title = line.replace(/^## /, '').trim();
        return {
          id: slugify(title),
          title,
          visible: true,
        };
      });

  // Initialize cv.resume once
  React.useEffect(() => {
    const resume = slice.cv?.resume;

    if (!resume?.markdown && markdown) {
      const sections = extractSections(markdown);
      dispatch(updateCVKey('cv.resume', {
        markdown,
        sections,
      }));
    }
  }, [slice.cv?.resume, markdown, dispatch]);

  const resume = slice.cv?.resume || {};
  const visible = resume.visible === true;
  const displayMarkdown = resume.markdown || markdown;
  
  return (
    <Container maxWidth="md">
      <Controls markdown={displayMarkdown} />
      <pre style={{ marginTop: '2rem' }}>
        resume: {JSON.stringify(resume, null, 2)}
      </pre>

      {visible && (
        <Typography component="div" sx={{ mt: 4 }}>
          <ReactMarkdown>{displayMarkdown}</ReactMarkdown>
        </Typography>
      )}

      
    </Container>
  );
}
