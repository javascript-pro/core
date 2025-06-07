'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx
import * as React from 'react';
import { IconButton, Tooltip, Typography, Card} from '@mui/material';
import { Icon } from '../../../gl-core';
import { TBouncer } from '../Bouncer';

export default function Bouncer({}: TBouncer) {
  // const [authModalOpen, setAuthModalOpen] = useKey('authModalOpen');

  return (
    <Card>
    <Typography>
      clients
    </Typography>
      <Tooltip title={'tooltip'}>
        <IconButton
          onClick={() => {
            console.log('bouncer click');
          }}
        >
          <Icon icon="clients" />
        </IconButton>
      </Tooltip>
    </Card>
  );
}
