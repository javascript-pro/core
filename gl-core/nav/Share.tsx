'use client';

import * as React from 'react';
import {
  Button,
} from '@mui/material';
import { 
  MightyButton,
} from '../';

export type TShare = {
  label?: string | null;
}

export default function Share({
    label = null,
}: TShare) {

  const onShareClick = () => {
    console.log("onShareClick");
  }

  return <>

          <MightyButton 
            label="Share"
            icon="share"
            variant="outlined"
            onClick={onShareClick}
          />

        </>
}
