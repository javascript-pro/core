'use client';

import * as React from 'react';
import { Box, Button, Grid, CardHeader, CardMedia, CardContent, TextField, Typography,

} from '@mui/material';
import { 
  Icon,
  MarkdownPopup,
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


export default function GoodFit({
  markdown,
}: GoodFitProps) {

  const [jobDescription, setJobDescription] = React.useState('');

  const {
    frontmatter,
    content,
  } = markdown

  const {
    title,
    description,
    image,
    // tags,
    icon,
  } = frontmatter
  
  return (
    <>
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        
        <CardHeader
          avatar={<Icon icon={icon} />}
          title={title}
          subheader={description}
        />

        <CardContent>
          <Grid container spacing={2}>

            <Grid size={{xs: 12 }}>
            <Typography>
              {content}
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

              <MarkdownPopup 
                title="Our CV (Resume)" 
                icon="doc"
                markdown="e thing, here's a draft of the **SpeakWrite** landing page copy, in clean "
              />

            </Grid>

            <Grid size={{xs: 12, md: 4 }}>

              <CardMedia 
                src={image}
                component={"img"}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={() => {}}
              >
                <Icon icon="openai" />
                <Box sx={{ mx: 1 }}>
                  Good Fit?
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
