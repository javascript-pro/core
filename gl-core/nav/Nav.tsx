'use client';

import * as React from 'react';
import {
  Box,
  IconButton,
} from '@mui/material';
import { 
  useSlice,
  useDispatch,
  setUbereduxKey,
  Icon,
} from '../';

export type TNav = {
  title?: string | null;
}

export default function Nav({
}: TNav) {
  const dispatch = useDispatch();
  const slice = useSlice();
  const {navOpen} = slice;
  
  const onMenuClick = () => {
    if (!navOpen){}
      dispatch (setUbereduxKey({ navOpen: !navOpen})
    );
  }
  

  return <Box>
          <IconButton
            color="inherit"
            onClick={onMenuClick}
            
          >
            <Icon icon="menu" />
          </IconButton>
        </Box>
}
