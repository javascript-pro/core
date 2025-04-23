'use client';
import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  CardHeader,
  CardContent,
  TextField,
} from '@mui/material';
import { Icon } from '../../';
// import { useSlice } from '../../cartridges/Uberedux';

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
  markdown: any;
};

export default function GoodFit() {
  
  // const goodfitState = useSlice();
  const [jobDescription, setJobDescription] = React.useState('');
  const [resume, setResume] = React.useState('');

  const onAnalyse = () => {
    console.warn('onAnalyse');
  };

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <CardHeader avatar={<Icon icon={'good-fit'} />} title={'Good fit?'} />

        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                value={resume}
                variant="filled"
                label="Resume"
                placeholder="Paste resume here..."
                multiline
                fullWidth
                rows={10}
                onChange={(e) => setResume(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Box
                sx={{
                  my: 5,
                }}
              >
                <Button variant="contained" onClick={onAnalyse}>
                  {/* <Box>
                    <Icon icon="openai" />
                  </Box> */}
                  <Box sx={{ mx: 1 }}>Analyse</Box>
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                value={jobDescription}
                variant="filled"
                label="Job Description"
                placeholder="Paste job description here..."
                multiline
                fullWidth
                rows={10}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>

        {/* <pre>goodfitState: {JSON.stringify(goodfitState, null, 2)}</pre> */}
      </Box>
    </>
  );
}
