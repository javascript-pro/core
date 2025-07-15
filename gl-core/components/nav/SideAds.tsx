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
        icon="pdf"
        title={'AI PDF'}
        onClick={() => {
          dispatch(routeTo('/fallmanager', router));
        }}
      />

      {/* <Advert
        icon="openai"
        title={'C.V.'}
        onClick={() => {
          dispatch(routeTo('/work/cv', router));
        }}
      /> */}

      <Advert
        icon="flickr"
        title={'Flickr'}
        onClick={() => {
          dispatch(routeTo('/flickr', router));
        }}
      />

      <Advert
        icon="contact"
        title={'Contact'}
        onClick={() => {
          dispatch(routeTo('/work/company', router));
        }}
      />
    </Box>
  );
}
