'use client';

import * as React from 'react';
import { Container, Typography } from '@mui/material';
import { Controls } from './';
import ReactMarkdown from 'react-markdown';
import { useSlice, useDispatch } from '../../';
import { updateCVKey } from './';

export type TCV = {
  original?: string | null;
};

export default function CV({ 
  original = null,
}: TCV) {
  const slice = useSlice();
  const dispatch = useDispatch();

  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

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

  React.useEffect(() => {
    const resume = slice.cv?.resume;

    if (!resume?.original && original) {
      const sections = extractSections(original);
      dispatch(updateCVKey('cv.resume', {
        original,
        tailored: original,
        sections,
      }));
    }
  }, [slice.cv?.resume, original, dispatch]);

  const resume = slice.cv?.resume || {};
  const visibleCV = resume.visible === true;
  const displayMarkdown = resume.tailored || resume.original || original;
  
  return (
    <Container maxWidth="md">
      <Controls markdown={displayMarkdown} />

      {visibleCV && (
        <Typography component="div" sx={{ mt: 4 }}>
          <ReactMarkdown>{displayMarkdown}</ReactMarkdown>
        </Typography>
      )}

      {/* <pre>
        resume: {JSON.stringify(resume, null, 2)}
      </pre> */}

    </Container>
  );
}
