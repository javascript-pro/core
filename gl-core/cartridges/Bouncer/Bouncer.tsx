// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/Bouncer.tsx
'use client';
import React from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Box, Dialog, CardHeader } from '@mui/material';
import { MightyButton, useDispatch, Icon } from '../../../gl-core';
import { useBouncer, setBouncerKey } from '../Bouncer';

export default function Bouncer() {
  const b = useBouncer();
  const dispatch = useDispatch();
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (startedRef.current) return; // prevent double-run in StrictMode
    startedRef.current = true;
    console.log('// run only once on mount');
  }, [dispatch]);

  const handleClose = () => dispatch(setBouncerKey('dialogOpen', false));
  const handleBtnClick = () => dispatch(setBouncerKey('dialogOpen', true));

  return (
    <>
      <MightyButton
        mode="icon"
        label="Bouncer"
        icon="bouncer"
        onClick={handleBtnClick}
      />
      <Dialog open={b.dialogOpen} onClose={handleClose}>
        <CardHeader
          avatar={<Icon icon="bouncer" />}
          title="Bouncer"
          subheader="Your name's not down, mate."
          action={
            <MightyButton
              mode="icon"
              label="Close"
              icon="cancel"
              onClick={handleClose}
            />
          }
        />
        <Box>
          <pre>b.ping: {JSON.stringify(b.ping, null, 2)}</pre>
        </Box>
      </Dialog>
    </>
  );
}
