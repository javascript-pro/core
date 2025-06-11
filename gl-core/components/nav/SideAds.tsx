'use client';
import React from 'react';
import { Box } from '@mui/material';
import { Advert, useDispatch, navigateTo } from '../../../gl-core';

export type TSideAds = {
  children?: React.ReactNode;
  [key: string]: any;
};

export default function SideAds() {
  const dispatch = useDispatch();

  return (
    <Box sx={{}}>
      <Advert
        icon="home"
        title={'Home'}
        onClick={() => {
          dispatch(navigateTo('/'));
        }}
      />

      <Advert
        icon="flash"
        title={'Flash'}
        onClick={() => {
          dispatch(navigateTo('/free/flash'));
        }}
      />

      <Advert
        icon="fallmanager"
        title={'Fallmanager'}
        onClick={() => {
          dispatch(navigateTo('/fallmanager'));
        }}
      />

      <Advert
        icon="flickr"
        title={'Flickr'}
        onClick={() => {
          dispatch(navigateTo('/free/flickr'));
        }}
      />
      <Advert
        icon="openai"
        title={'C.V.'}
        onClick={() => {
          dispatch(navigateTo('/cv'));
        }}
      />
      <Advert
        icon="food"
        title={'Lemonading'}
        onClick={() => {
          dispatch(navigateTo('/life/food/lemon-meringue-pie'));
        }}
      />

      <Advert
        icon="dog"
        title={'dog'}
        onClick={() => {
          dispatch(navigateTo('/balance/puppy-thing'));
        }}
      />

      <Advert
        icon="contact"
        title={'Contact Us'}
        onClick={() => {
          dispatch(navigateTo('/work/company'));
        }}
      />
    </Box>
  );
}
