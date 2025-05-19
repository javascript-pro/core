'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { MightyButton } from '../../../gl-core';

export type TShareThis = {
  title?: string;
  description?: string;
  excerpt?: string;
  body?: string;
  image?: string;
  url?: string;
};

export default function ShareThis(
  {
    // title = "Title",
  }: TShareThis,
) {
  // console.log("ShareThis");
  const onShareClick = () => {};

  return (
    <>
      <MightyButton
        mode="icon"
        color="secondary"
        label="Share"
        icon="share"
        onClick={onShareClick}
      />
    </>
  );
}
