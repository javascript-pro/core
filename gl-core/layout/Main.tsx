'use client';
import React from 'react';
import { 
  Container, 
  Grid,
  Typography,
} from '@mui/material';
import {
  Share,
  useIsMobile,
  MainMenu,
} from "../";
import ReactMarkdown from 'react-markdown';

export type TMain = {
  body?: string;
  frontmatter?: any;
}

export default function Main({
  body = "No body",
  frontmatter = null,
}: TMain) {

  const isMobile = useIsMobile();
  
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>

        <Grid size={{
          "xs": 12,
          "sm": 4,
          "md": 3,
        }}>
          <Share frontmatter={frontmatter} />
          {!isMobile ? <MainMenu /> : null}
        </Grid>

        <Grid size={{
          "xs": 12,
          "sm": 8,
          "md": 9,
        }}>
          <Typography variant="body1">
            <ReactMarkdown>
              {body}
            </ReactMarkdown>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
