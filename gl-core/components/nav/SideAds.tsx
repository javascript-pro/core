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
        icon="fallmanager"
        title={'Fallmanager'}
        onClick={() => {
          router.push(`/fallmanager`);
        }}
      />

      <Advert
        icon="cartridge"
        title={'New Cartridge'}
        onClick={() => {
          router.push(`/cartridges/new-cartridge`);
        }}
      />

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
      <Advert
        icon="food"
        title={'Lemon Meringue Pie'}
        onClick={() => {
          router.push(`/life/food/lemon-meringue-pie`);
        }}
      />
    </Box>
  );
}
