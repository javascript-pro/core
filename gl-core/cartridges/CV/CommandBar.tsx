'use client';
import React from 'react';
import {
Container,
AppBar,Toolbar,
} from '@mui/material';
import { MightyButton } from '../../';


export default function CommandBar() {
  return (
    <AppBar
        position="fixed"
        color="secondary"
        sx={{
          // background: 0,
          // boxShadow: 0,
          top: 'auto',
          bottom: 0,
          p: 1,
        }}
      >
        <Container maxWidth="md">
          <Toolbar>
            CommandBar
          </Toolbar>
        </Container>
      </AppBar>
  );
}



/*
          <MightyButton
            fullWidth
            onClick={onDownloadClick}
            color="secondary"
            label="Download PDF"
            variant="contained"
            icon="download"
          />


          

      
*/
