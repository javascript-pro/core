'use client';
import React from 'react';
import { Box } from '@mui/material';
import { Advert, useDispatch, routeTo } from '../../../gl-core';
import { useRouter } from 'next/navigation';

export type TSideAds = {
  children?: React.ReactNode;
  [key: string]: any;
};

export default function SideAds() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Box sx={{}}>
      <Advert
        icon="home"
        title={'Home'}
        onClick={() => {
          dispatch(routeTo('/', router));
        }}
      />

      <Advert
        icon="flash"
        title={'Flash'}
        onClick={() => {
          dispatch(routeTo('/free/flash', router));
        }}
      />

      <Advert
        icon="fallmanager"
        title={'Fallmanager'}
        onClick={() => {
          dispatch(routeTo('/fallmanager', router));
        }}
      />

      <Advert
        icon="flickr"
        title={'Flickr'}
        onClick={() => {
          dispatch(routeTo('/free/flickr', router));
        }}
      />
      <Advert
        icon="openai"
        title={'C.V.'}
        onClick={() => {
          dispatch(routeTo('/cv', router));
        }}
      />
      <Advert
        icon="food"
        title={'Lemonading'}
        onClick={() => {
          dispatch(routeTo('/life/food/lemon-meringue-pie', router));
        }}
      />

      <Advert
        icon="dog"
        title={'dog'}
        onClick={() => {
          dispatch(routeTo('/balance/puppy-thing', router));
        }}
      />

      <Advert
        icon="contact"
        title={'Contact Us'}
        onClick={() => {
          dispatch(routeTo('/work/company', router));
        }}
      />

      <Advert
        icon="dog"
        title={'dog'}
        onClick={() => {
          router.push(`/balance/puppy-thing`);
        }}
      />
    </Box>
  );
}
