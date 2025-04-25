'use client';

import * as React from 'react';
import { Alert, AlertTitle, Typography, ButtonBase } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Icon } from '../';
export interface IAdvert {
  title?: string;
  url?: string;
  description?: string;
  icon?: string;
  image?: string;
}

export default function Advert() {
  const router = useRouter();
  const hide = true;
  if (hide) return null;

  const ad: IAdvert = {
    title: 'SpeakWrite Propaganda ',
    icon: 'star',
    url: '/work/examples/speakwrite',
    description: 'Generator with Open Source AI ',
    image: '/jpg/speakwrite.jpg',
  };

  const handleClick = () => {
    router.push(ad.url as string);
  };

  return (
    <ButtonBase onClick={handleClick} sx={{ textAlign: 'left' }}>
      <Alert severity="success" icon={<Icon icon={ad.icon as any} />}>
        <AlertTitle>{ad.title}</AlertTitle>
        <Typography>{ad.description}</Typography>
      </Alert>
    </ButtonBase>
  );
}
