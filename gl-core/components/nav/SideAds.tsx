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
        icon="github"
        title={'GitKraken'}
        onClick={() => {
          dispatch(routeTo('/work/techstack/git/gitkraken', router));
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
        icon="contact"
        title={'Contact Us'}
        onClick={() => {
          dispatch(routeTo('/work/company', router));
        }}
      />
    </Box>
  );
}
