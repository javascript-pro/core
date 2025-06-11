'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Uploads.tsx
import * as React from 'react';
import { Box } from '@mui/material';
import {
  useDispatch,
} from '../../../../../gl-core';
import {incomingChange} from '../../../Fallmanager';


export default function Uploads() {
  console.log('Uploads');
  const dispatch = useDispatch();

  const onFirebaseUpdate = () => {
    dispatch(incomingChange("uploads", []));
  }

  return <Box sx={{ p: 1, border: '1px solid green' }}>
    
    This component subscribes to the uploads collection with a filter 
    fo slug==="fallmanager"

    when an update comes in it dispatches the action incomingChange as 
    in onFirebaseUpdate. Make the uploads an array of upload docs 
  </Box>;
}
