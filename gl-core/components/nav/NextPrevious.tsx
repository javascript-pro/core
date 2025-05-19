// NextPrevious.tsx

'use client';

import * as React from 'react';
import navJSON from '../../../public/globalNav.json';
import { useRouter } from 'next/navigation';
import { useTheme, Card } from '@mui/material';
import { MightyButton } from '../../../gl-core';

export default function NextPrevious() {
  const router = useRouter();
  const theme = useTheme();

  console.log('navJSON', navJSON);

  const navigateTo = (slug: string) => {
    router.push(slug);
  };
  let prevSlug = 'prev-slug';
  let nextSlug = 'next-slug';
  let upSlug = 'up-slug';

  return (
    <Card
      sx={{
        background: theme.palette.background.paper,
      }}
    >
      <MightyButton
        mode={'icon'}
        onClick={() => {
          navigateTo('/');
        }}
        label="Home"
        icon="home"
      />
      <MightyButton
        mode="noicon"
        onClick={() => {
          navigateTo(prevSlug);
        }}
        label="Previous"
        icon="left"
      />
      <MightyButton
        mode="noicon"
        onClick={() => {
          navigateTo(upSlug);
        }}
        label="Up"
        icon="up"
      />
      <MightyButton
        mode="noicon"
        onClick={() => {
          navigateTo(nextSlug);
        }}
        label="Next"
        icon="right"
      />
    </Card>
  );
}
