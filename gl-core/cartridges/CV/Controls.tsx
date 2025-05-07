'use client';
import * as React from 'react';
import { 
  Search,
  MightyButton,
} from '../../';
import {
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';
// import ReactMarkdown from 'react-markdown';

export type TControls = {
  body?: string;
}

export default function Controls({
  // body = "No content",
}: TControls) {

  return  <AppBar 
            position="sticky" 
            color="default" 
            sx={{
              display: "flex",
              boxShadow: 0,
            }}
            
          >
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MightyButton 
                icon="save"
                label="Save PDF"
                variant="outlined"
                color="secondary"
              />
            </Toolbar>
          </AppBar>
}
