'use client';
import * as React from 'react';
import {
  Typography,
  Alert,
  ButtonBase,
  IconButton,
} from '@mui/material';
import { Icon, useIsMobile } from '../../gl-core';

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
  const showTagline = false;

  return (
    <>
      <ButtonBase 
        sx={{ 
          textAlign: 'left', 
          mb: 1,
          width: "100%",
        }} 
        onClick={onClick}>
        <Alert
          sx={{ width: '100%' }}
          severity="success"
          variant="standard"
          icon={<Icon icon={icon as any} />}
        >
          <Typography variant="body1">{title}</Typography>
          {!isMobile && showTagline && (
            <Typography variant="body2">{description}</Typography>
          )}
        </Alert>
      </ButtonBase>
    </>
  );
}
