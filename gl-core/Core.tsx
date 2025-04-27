'use client';

import * as React from 'react';
import { 
  Box,
  Container,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export type TCore = {
  children: React.ReactNode;
  payload?: any;
};

export default function Core({
  children = <>Nothing to show</>,
  payload = {
    no: "payload."
  }
}: TCore ) {

  const router = useRouter();
  const ad = {
    title: 'Core Propaganda',
    icon: 'star',
    url: '/propaganda',
    description: 'Generated with Open Source AI',
    image: '/png/test.png',
  };

  const handleClick = () => {
    router.push(ad.url as string);
  };

  return (
    <>
      <Container 
          maxWidth={"md"} 
          sx={{
            mt: 3,
          }}>
        {children}
      </Container>
    </>
  );
}

/* <ButtonBase onClick={handleClick} sx={{ textAlign: 'left' }}>
        <Alert severity="success">
          <AlertTitle>{ad.title}</AlertTitle>
          <Typography>{ad.description}</Typography>
        </Alert>
      </ButtonBase> */