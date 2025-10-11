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
  PingChip,

} from '../Bouncer';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useSounds } from '../Theme';

export default function Bouncer() {
  const b = useBouncer();
  const dispatch = useDispatch();
  const startedRef = React.useRef(false);
  const isMobile = useIsMobile();
  const [unseenCount, setUnseenCount] = React.useState(0);
  const prevCount = React.useRef(0);
  const { play } = useSounds();

  // 1. Create ping on first mount
  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (!b?.ping) {
      dispatch(createPing());
    }
  }, [dispatch, b?.ping]);

  // 2. Once we have a ping but haven't pinged yet → ping
  React.useEffect(() => {
    dispatch(ping());
  }, [dispatch]);

  // 3. Subscribe to ping document (livePing + unseenCount)
  React.useEffect(() => {
    if (!b?.id) {
      setUnseenCount(0);
      dispatch(setBouncerKey('livePing', null));
      return;
    }

    const ref = doc(db, 'pings', b.id);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        dispatch(setBouncerKey('livePing', data));

        const count = Array.isArray(data.messages)
          ? data.messages.filter((m: any) => !m.seen).length
          : 0;
        setUnseenCount(count);

        if (prevCount.current === 0 && count > 0) play('success');
        prevCount.current = count;
      } else {
        setUnseenCount(0);
        prevCount.current = 0;
        dispatch(setBouncerKey('livePing', null));
      }
    });

    return () => unsub();
  }, [b?.id, dispatch, play]);

  const handleClose = () => dispatch(setBouncerKey('dialogOpen', false));
  const handleBtnClick = () => dispatch(setBouncerKey('dialogOpen', true));

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PingChip unseenCount={unseenCount} onClick={handleBtnClick} />
      </Box>

      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
        open={b.dialogOpen}
        onClose={handleClose}
      >
        <CardHeader
          avatar={<PingChip disabled />}
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
