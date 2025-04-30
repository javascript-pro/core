'use client';
import React from 'react';
import { 
  Container, Grid
} from '@mui/material';
import {
  Share,
} from "../";

export type TMain = {
  body?: string;
  frontmatter?: any;
}

export default function Main({
  body = "No body",
  frontmatter = null,
}: TMain) {
  
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>

        <Grid size={{
          "xs": 12,
          "sm": 6,
          "md": 3,
        }}>
          <Share frontmatter={frontmatter} />
        </Grid>

        <Grid size={{
          "xs": 12,
          "sm": 6,
          "md": 3,
        }}>
          {body}
        </Grid>
        
      </Grid>
    </Container>
  );
};
