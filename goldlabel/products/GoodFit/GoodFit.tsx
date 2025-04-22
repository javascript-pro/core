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
import { 
  Icon,
} from '../../';

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

  const [jobDescription, setJobDescription] = React.useState('');
  const [resume, setResume] = React.useState('');

  const onAnalyse = () => {
    console.warn("onAnalyse")
  }

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <CardHeader
          avatar={<Icon icon={"good-fit"} />}
          title={"Good fit?"}
        />

        <CardContent>
          <Grid container spacing={1}>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                sx={{ background: 'white', mb: 2 }}
                variant="outlined"
                label="Resume"
                placeholder="Paste resume here..."
                multiline
                fullWidth
                rows={10}
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                sx={{ background: 'white', mb: 2 }}
                variant="outlined"
                label="Job Description"
                placeholder="Paste job description here..."
                multiline
                fullWidth
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button 
                variant="contained" 
                onClick={ onAnalyse }>
                <Icon icon="openai" />
                <Box sx={{ mx: 1 }}>
                  Analyse
                </Box>
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        {/* <pre>tags: {JSON.stringify(tags, null, 2)}</pre> */}

      </Box>
    </>
  );
}
