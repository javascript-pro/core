'use client';
import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  CardContent,
  TextField,
  Alert,
  AlertTitle,
  Typography,
} from '@mui/material';
import { Icon } from '../../';
import { useKey } from '../../cartridges/Uberedux';

export type Frontmatter = {
  order?: number;
  title?: string;
  description?: string;
  slug?: string;
  icon?: string;
  image?: string;
  tags?: string[];
  excerpt?: string;
};

export type GoodFitProps = {
  markup: any;
};

export default function GoodFit() {
  const goodfitState = useKey('goodfitState');
  const { examples } = goodfitState[0];

  const [jd, setJD] = React.useState('');
  const [resume, setResume] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const [message, setMessage] = React.useState('Paste a Resume or JD');
  const [error, setError] = React.useState(false);

  const validate = () => {
    setTimeout(() => {
      if (resume.length < 9 && jd.length < 9) {
        setMessage('More detail needed');
        setError(false);
        setValid(false);
        return;
      }

      // if (resume.length < 9) {
      //   setMessage("Resume needs 100 characters at least");
      //   setError(true);
      //   setValid(false);
      //   return;
      // }

      // if (jd.length < 9) {
      //   setMessage("The JD needs 100 characters at least");
      //   setError(true);
      //   setValid(false);
      //   return;
      // }

      // If both are valid
      setMessage('Analayse when ready');
      setError(false);
      setValid(true);
    }, 200);
  };

  const onUpdateFields = () => {
    validate();
  };

  const onPasteClick = (field: string) => {
    if (field === 'jd') {
      setJD(examples.jd);
      validate();
    }
    if (field === 'resume') {
      setResume(examples.resume);
      validate();
    }
  };

  const onAnalyse = () => {
    // console.warn('onAnalyse');
  };

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        {/* <CardHeader avatar={<Icon icon={'good-fit'} />} title={'Good fit?'} /> */}

        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                sx={{
                  background: '#F7F7F7',
                }}
                value={resume}
                label="Resume"
                multiline
                fullWidth
                rows={7}
                onChange={(e) => {
                  setResume(e.target.value);
                  onUpdateFields();
                }}
              />

              <Box sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  // disabled={ valid ? false : true }
                  // variant= { valid ? "contained" : "outlined" }
                  variant={'contained'}
                  onClick={() => {
                    onPasteClick('resume');
                  }}
                >
                  <Box sx={{ mt: 1 }}>
                    <Icon icon={'up'} />
                  </Box>
                  <Box sx={{ mx: 1 }}>Example Resume</Box>
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                sx={{
                  background: '#F7F7F7',
                }}
                value={jd}
                label="Job Description"
                multiline
                fullWidth
                rows={7}
                onChange={(e) => {
                  setJD(e.target.value);
                  onUpdateFields();
                }}
              />

              <Box sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  // disabled={ valid ? false : true }
                  // variant= { valid ? "contained" : "outlined" }
                  variant={'contained'}
                  onClick={() => {
                    onPasteClick('jd');
                  }}
                >
                  <Box sx={{ mt: 1 }}>
                    <Icon icon={'up'} />
                  </Box>
                  <Box sx={{ mx: 1 }}>Example JD</Box>
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Alert severity={!error ? 'info' : 'warning'} sx={{ mb: 2 }}>
                <AlertTitle>{message}</AlertTitle>
              </Alert>
              <Box sx={{ m: 0 }}>
                <Button
                  fullWidth
                  disabled={valid ? false : true}
                  variant={valid ? 'contained' : 'outlined'}
                  onClick={onAnalyse}
                >
                  <Box sx={{ mx: 1 }}>Analyse</Box>
                  <Box sx={{ mx: 1 }}>
                    <Icon icon={'right'} />
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        {/* <pre>examples: {JSON.stringify(examples, null, 2)}</pre> */}
      </Box>
    </>
  );
}
