'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Advert } from '../../../gl-core';

export type TSideAds = {
  children?: React.ReactNode;
  [key: string]: any;
};

export default function SideAds({ children = null }: TSideAds) {
  const router = useRouter();
  return (
    <Box sx={{}}>
      <Advert
        icon="clients"
        title={'Clients'}
        onClick={() => {
          router.push(`/clients`);
        }}
      />

      {/* <Advert
        icon="javascript"
        title={'NextJS'}
        onClick={() => {
          router.push(`/work/techstack/javascript/next-js`);
        }}
      />

      <Advert
        icon="design"
        title={'MUI Toolpad'}
        onClick={() => {
          router.push(`/work/techstack/design-sytem/toolpad`);
        }}
      /> */}

      <Advert
        icon="flickr"
        title={'Flickr'}
        onClick={() => {
          router.push(`/free/flickr`);
        }}
      />

      <Advert
        icon="openai"
        title={'C.V.'}
        onClick={() => {
          router.push(`/cv`);
        }}
      />
    </Box>
  );
}
