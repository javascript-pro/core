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
}

export default function Main({
  body = "No body"
}: TMain) {
  
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>

        <Grid size={{
          "xs": 12,
          "sm": 6,
          "md": 3,
        }}>
          <Share />
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
