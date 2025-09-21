import * as React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

export type TPresenter = {
  [key: string]: any;
};

export default function Presenter({ ...props }: TPresenter) {
  return (
    <Box
      sx={{
        scale: 0.5,
        position: 'absolute',
        top: 0,
        left: -200,
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: 358,
        height: 530,
      }}
      {...props}
    >
      <Image
        src="/png/presenter.png"
        alt="Presenter"
        fill
        style={{ objectFit: 'contain' }}
        priority={false}
      />
    </Box>
  );
}
