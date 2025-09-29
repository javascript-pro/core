// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/Bouncer.tsx
'use client';
import React from 'react';
import { Box, Dialog, CardHeader } from '@mui/material';
import { MightyButton, useDispatch, Icon, useIsMobile } from '../../../gl-core';
import {
  PingViewer,
  useBouncer,
  setBouncerKey,
  createPing,
  ping,
} from '../Bouncer';

export default function Bouncer() {
  const b = useBouncer();
  const dispatch = useDispatch();
  const startedRef = React.useRef(false);
  const isMobile = useIsMobile();

  // 1. Create ping on first mount
  React.useEffect(() => {
    if (startedRef.current) return; // prevent double-run in StrictMode
    startedRef.current = true;

    if (!b?.ping) {
      dispatch(createPing());
    }
  }, [dispatch, b?.ping]);

  // 2. Once we have a ping but haven't checked yet → fingerprint
  React.useEffect(() => {
    if (b?.ping && !b?.checked) {
      dispatch(ping());
    }
  }, [b?.ping, b?.checked, dispatch]);

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
      <Dialog
        fullWidth
        fullScreen={isMobile}
        open={b.dialogOpen}
        onClose={handleClose}
      >
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
          <PingViewer />
        </Box>
      </Dialog>
    </>
  );
}
