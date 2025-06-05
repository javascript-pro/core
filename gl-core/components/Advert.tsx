'use client';
import * as React from 'react';
import {
  Stack,
  Typography,
  Alert,
  ButtonBase,
  IconButton,
} from '@mui/material';
import { Icon, useIsMobile } from '../../gl-core';
// import { toggleAdvert } from '../';

export type TAdvert = {
  title?: string | null;
  description?: string | null;
  onClick: any;
  icon?: string;
};

export default function Advert({
  icon = 'star',
  title = 'Default Title',
  description = 'description',
  onClick = () => {
    console.log('No onClick for advert');
  },
}: TAdvert) {
  const isMobile = useIsMobile();

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <ButtonBase sx={{ textAlign: 'left' }} onClick={onClick}>
          <Alert
            sx={{ width: '100%' }}
            severity="success"
            // variant="filled"
            icon={<Icon icon={icon as any} />}
          >
            <Typography variant="body1">{title}</Typography>
            {!isMobile && (
              <Typography variant="body2">{description}</Typography>
            )}
          </Alert>
        </ButtonBase>
      </Stack>
    </>
  );

  return (
    <>
      {/* <pre>Advert: {JSON.stringify(Advert, null, 2)}</pre> */}
      <Alert
        severity={'success'}
        variant="filled"
        // icon={<Icon icon="blokey" />}
        action={
          <IconButton onClick={() => {}} color="inherit" size="small">
            <Icon icon="right" />
          </IconButton>
        }
      >
        {title}
      </Alert>
    </>
  );
}
