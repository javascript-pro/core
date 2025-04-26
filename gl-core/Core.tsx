'use client';

import * as React from 'react';
import { Box, Alert, AlertTitle, Typography, ButtonBase } from '@mui/material';
import { useRouter } from 'next/navigation';

export interface ICore {
  children: React.ReactNode;
  payload?: any;
}

export default function Core({
  children = <>Nothing to show</>,
  payload = {
    no: "payload."
  }
}: ICore ) {


  console.log("Core payload", payload)

  const router = useRouter();

  const ad = {
    title: 'Core Propaganda',
    icon: 'star',
    url: '/propaganda',
    description: 'Generator with Open Source AI',
    image: '/png/test.png',
  };

  const handleClick = () => {
    router.push(ad.url as string);
  };

  return (
    <>
      <ButtonBase onClick={handleClick} sx={{ textAlign: 'left' }}>
        <Alert severity="success">
          <AlertTitle>{ad.title}</AlertTitle>
          <Typography>{ad.description}</Typography>
        </Alert>
      </ButtonBase>

      <Box>
        {children}
      </Box>
    </>

  );
}
