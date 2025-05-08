'use client';

import * as React from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { Controls } from './';
import ReactMarkdown from 'react-markdown';
import { useSlice, useDispatch, MightyButton } from '../../';
import { updateCVKey } from './';

export type TCV = {
  original?: string | null;
};

export default function CV({ original = null }: TCV) {
  const slice = useSlice();
  const { cv } = slice;
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

  // Initialize resume
  React.useEffect(() => {
    const resume = cv?.resume;
    if (!resume?.original && original) {
      const sections = extractSections(original);
      dispatch(
        updateCVKey('cv.resume', {
          original,
          tailored: original,
          sections,
        })
      );
    }
  }, [cv?.resume, original, dispatch]);

  const onJDCancel = () => {
    dispatch(updateCVKey('cv.resume', { visible: true }));
    dispatch(updateCVKey('cv.jd', { visible: false }));
  }

  const onAnalyse = () => {
    console.log("onAnalyse");
  }
  

  const resume = cv?.resume || {};
  const jd = cv?.jd || {};
  const visibleCV = resume.visible === true;
  const visibleJD = jd.visible === true;
  const displayMarkdown = resume.tailored || resume.original || original;

  return (
    <Container maxWidth="md">
      <Controls markdown={displayMarkdown} />

      {/* <pre>
        cv: {JSON.stringify(cv, null, 2)}
      </pre>  */}


      {visibleCV && (
        <Typography component="div" sx={{ mt: 4 }}>
          <ReactMarkdown>{displayMarkdown}</ReactMarkdown>
        </Typography>
      )}

      {visibleJD && (
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Paste the job description here"
            defaultValue={jd.markdown || ''}
            onChange={(e) => {
              dispatch(
                updateCVKey('cv.jd', {
                  markdown: e.target.value,
                })
              );
            }}
            onPaste={(e) => {
              const pasted = e.clipboardData.getData('text');
              dispatch(
                updateCVKey('cv.jd', {
                  markdown: pasted,
                })
              );
            }}
          />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>

            <MightyButton
              sx={{mx: 1}}
              icon="left"
              label="Back"
              variant="outlined"
              color="secondary"
              onClick={ onJDCancel }
            />

            <MightyButton
              icon="openai"
              label="Analyse"
              variant="outlined"
              color="secondary"
              onClick={ onAnalyse }
            />

          </Box>
        </Box>
      )}
    </Container>
  );
}
