// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/Bouncer.tsx
'use client';
import React from 'react';
import {
  Box,
} from '@mui/material';
import { 
    MightyButton,
} from '../../../gl-core';
import {
  useBouncer,
  setBouncerKey,
} from '../Bouncer';

export type TBouncer = {
};

export type TPing = {
  fingerprint: string;
  time: number;
};

export default function Bouncer({}: TBouncer) {

  const bouncer = useBouncer();

  const handleBtnClick = () => {
    console.log('Bouncer button clicked');
  };

  const ping: TPing = {
    fingerprint: '97e1wkhfsakhfhkas',
    time: Date.now(),
  }

  return (
    <>
      <MightyButton 
        label="Bouncer" 
        icon="bouncer"
        onClick={handleBtnClick}
      />
      <Box>
        <pre>ping: {JSON.stringify(ping, null, 2)}</pre>
        <pre>bouncer: {JSON.stringify(bouncer, null, 2)}</pre>
      </Box>

      
    </>
  );
}
