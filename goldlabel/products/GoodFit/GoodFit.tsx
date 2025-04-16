'use client';

import * as React from 'react';
import { Box, Button, Grid, Card, CardHeader, CardContent, TextField, Typography } from '@mui/material';
import { Icon, VoiceRecorder } from '../../';

export default function GoodFit() {

  const [jobDescription, setJobDescription] = React.useState('');


  return (
    <>
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
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

            <Grid size={{xs: 12, md: 6 }}>
              
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
              <VoiceRecorder product="goodfit"/>
            </Grid>

            <Grid size={{xs: 12, md: 6 }}>
              <Button
                variant="contained"
                onClick={() => {}}
              >
                <Icon icon="openai" />
                <Box sx={{ ml: 1, mr: 2 }}>Analyse This</Box>
                
              </Button>
            </Grid>

          </Grid>
        </CardContent>

      </Card>
      
    </>
  );
}
