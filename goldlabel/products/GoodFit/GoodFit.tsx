'use client';

import * as React from 'react';
import { Box, Button, Grid, CardHeader, CardContent, TextField, Typography } from '@mui/material';
import { Icon, VoiceRecorder } from '../../';

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


export default function GoodFit({
  markdown,
}: GoodFitProps) {

  const [jobDescription, setJobDescription] = React.useState('');
  const showVoice = false

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <pre>markdown: {JSON.stringify(markdown, null, 2)}</pre>
        
        <CardHeader
          avatar={<Icon icon="good-fit" color="primary" />}
          title="Good Fit?"
          subheader="Find out in seconds"
        />

        <CardContent>
          <Grid container spacing={2}>

            <Grid size={{xs: 12 }}>
            <Typography>
              This simple AI tool will tell you in seconds. Paste in a job description and our AI will judge if it's a good match. If it is, you’ll get a tailored CV you can download instantly. If not, all the best
            </Typography>
            </Grid>

            <Grid size={{xs: 12, md: 8 }}>
              
              <TextField
                sx={{background: 'white', mb: 2,}}
                label="Job Description"
                placeholder="Paste your job description here..."
                multiline
                fullWidth
                rows={10}
                variant="outlined"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              {showVoice ? <VoiceRecorder product="goodfit"/> : null }
              This is our most up to date CV, which will be compared to your JD to judge suitability
            </Grid>

            <Grid size={{xs: 12, md: 4 }}>
              <Button
                disabled
                variant="contained"
                onClick={() => {}}
              >
                <Icon icon="openai" />
                <Box sx={{ ml: 1, mr: 2 }}>Is it a good fit?</Box>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Box>      
    </>
  );
}
