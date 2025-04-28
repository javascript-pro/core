'use client';

import * as React from 'react';
// import { 
//   Box,
//   Container,
// } from '@mui/material';
import { useRouter } from 'next/navigation';

export type TCore = {
  children: React.ReactNode;
  payload?: any;
};

export default function Core({
  children = <>Nothing to show</>,
  // payload = {
  //   no: "payload."
  // }
}: TCore ) {

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (

    <>
    
    heelo core
    
    {children}</>
  );
}

/* <ButtonBase onClick={handleClick} sx={{ textAlign: 'left' }}>
        <Alert severity="success">
          <AlertTitle>{ad.title}</AlertTitle>
          <Typography>{ad.description}</Typography>
        </Alert>
      </ButtonBase> */