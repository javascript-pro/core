'use client';
import * as React from 'react';
import { Box, Button } from '@mui/material';
import { Icon } from '../../../gl-core'
/*
  this component is generic and should be well typed
  it should accept certain props, like id, which will 
  become the id of the field.
  
  It should return a clean, perfectly standards compliant
  html element which is a simple file select element
  
*/

export type TFieldUplaod = {
  id?: string;
}

export default function FieldUpload() {



  return <Box sx={{ p: 1, border: '1px solid blue' }}>
            <Box>
              <Icon icon="upload" />
              Field
            </Box>
            <Button>Upload Now</Button>
          </Box>;
}
