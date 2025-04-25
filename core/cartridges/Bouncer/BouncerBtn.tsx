'use client';
import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../';
// import { useKey } from '../../cartridges/Uberedux';

export interface IBouncerBtn {
  anyKey?: any;
  tooltip: string;
}

export default function BouncerBtn({ tooltip }: IBouncerBtn) {
  // const [authModalOpen, setAuthModalOpen] = useKey('authModalOpen');

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton
          onClick={() => {
            console.log('bouncer click');
          }}
        >
          <Icon icon="bouncer" />
        </IconButton>
      </Tooltip>
    </>
  );
}
