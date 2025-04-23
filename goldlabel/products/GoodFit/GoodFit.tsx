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
  markdown: any;
};

export default function GoodFit() {
  
  const goodfitState = useKey("goodfitState");
  const {
    examples,
  } = goodfitState[0]

  const [jobDescription, setJobDescription] = React.useState('');
  const [resume, setResume] = React.useState('');

  const [valid, setValid] = React.useState(false);

  const onUpdateFields = () => {
    console.warn('oonUpdateFields');
  };

  const onAnalyse = () => {
    console.warn('onAnalyse');
  };

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <CardHeader avatar={<Icon icon={'good-fit'} />} title={'Good fit?'} />

        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>

              <Box sx={{ mb: 2 }}>
                <Button 
                  fullWidth
                  // disabled={ valid ? false : true }
                  // variant= { valid ? "contained" : "outlined" }
                  variant= { "contained" }
                  onClick={onAnalyse}>
                  <Box sx={{ mt: 1 }}>
                    <Icon icon={'down'} />
                  </Box>
                  <Box sx={{ mx: 1 }}>
                    Example Resume
                  </Box>
                </Button>
              </Box>

              <TextField
                sx={{
                  background: "#F7F7F7",
                }}
                value={resume}
                label="Paste Resume"
                multiline
                fullWidth
                rows={7}
                onChange={(e) => {
                  setResume(e.target.value);
                  onUpdateFields();
                }}
              />
            </Grid>

            

            <Grid size={{ xs: 12, md: 6 }}>

              <Box sx={{ mb: 2 }}>
                <Button 
                  fullWidth
                  
                  // disabled={ valid ? false : true }
                  // variant= { valid ? "contained" : "outlined" }
                  variant= { "contained" }
                  onClick={onAnalyse}>
                  <Box sx={{ mt: 1 }}>
                    <Icon icon={'down'} />
                  </Box>
                  <Box sx={{ mx: 1 }}>
                    Example Job Description
                  </Box>
                </Button>
              </Box>

              <TextField
                sx={{
                  background: "#F7F7F7",
                }}
                value={jobDescription}
                label="Paste Job Description"
                multiline
                fullWidth
                rows={7}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  onUpdateFields();
                }}
              />
            </Grid>

            <Grid size={{ xs: 12}}>
              <Box sx={{ m: 0 }}>
                <Button 
                  fullWidth
                  disabled={ valid ? false : true }
                  variant= { valid ? "contained" : "outlined" }
                  onClick={onAnalyse}
                >
                  <Box sx={{ mx: 1 }}>
                    <Icon icon={'good-fit'} />
                  </Box>
                  <Box sx={{ mx: 1 }}>Analyse fit</Box>
                </Button>
              </Box>

            </Grid>


          </Grid>
        </CardContent>

        <pre>examples: {JSON.stringify(examples, null, 2)}</pre>
      </Box>
    </>
  );
}
