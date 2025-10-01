import React from 'react';
import { Box, Dialog, CardHeader, Badge } from '@mui/material';
import { MightyButton, useDispatch, Icon, useIsMobile } from '../../../gl-core';
import {
  PingViewer,
  useBouncer,
  setBouncerKey,
  createPing,
  ping,
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

  // 3. Subscribe to ping document for unseen message count
  React.useEffect(() => {
    if (!b?.id) {
      setUnseenCount(0);
      return;
    }

    const ref = doc(db, 'pings', b.id);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const count = Array.isArray(data.messages)
          ? data.messages.filter((m: any) => !m.seen).length
          : 0;

        setUnseenCount(count);

        // ✅ Play sound when going from 0 → >0
        if (prevCount.current === 0 && count > 0) {
          play('success');
        }
        prevCount.current = count;
      } else {
        setUnseenCount(0);
        prevCount.current = 0;
      }
    });

    return () => unsub();
  }, [b?.id, play]);

  const handleClose = () => dispatch(setBouncerKey('dialogOpen', false));
  const handleBtnClick = () => dispatch(setBouncerKey('dialogOpen', true));

  return (
    <>
      <Badge color="primary" badgeContent={unseenCount > 0 ? unseenCount : null}>
        <MightyButton
          mode="icon"
          label="Bouncer"
          icon="bouncer"
          onClick={handleBtnClick}
        />
      </Badge>

      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        open={b.dialogOpen}
        onClose={handleClose}
      >
        <CardHeader
          avatar={<Icon icon="bouncer" />}
          title="Bouncer"
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
