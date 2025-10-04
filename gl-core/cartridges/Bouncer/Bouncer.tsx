// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/Bouncer.tsx
import React from 'react';
import { Box, Dialog, CardHeader, Badge, Typography } from '@mui/material';
import { MightyButton, useDispatch, Icon, useIsMobile } from '../../../gl-core';
import {
  MapView,
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

        // ✅ save entire doc into Redux
        dispatch(setBouncerKey('livePing', data));

        // ✅ count unseen messages
        const count = Array.isArray(data.messages)
          ? data.messages.filter((m: any) => !m.seen).length
          : 0;
        setUnseenCount(count);

        // ✅ play sound on transition 0 → >0
        if (prevCount.current === 0 && count > 0) {
          play('success');
        }
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
      <Box sx={{ display: 'flex' }}>
        {b?.ping?.displayName && (
          <Typography sx={{ mt: 0.5, mr: 2 }} variant="h6">
            {b.ping.displayName}
          </Typography>
        )}
        <Badge
          color="primary"
          badgeContent={unseenCount > 0 ? unseenCount : null}
        >
          <MightyButton
            mode="icon"
            label="Bouncer"
            icon="bouncer"
            onClick={handleBtnClick}
          />
        </Badge>
      </Box>

      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        open={b.dialogOpen}
        onClose={handleClose}
      >
        <CardHeader
          avatar={<Icon icon="bouncer" color="primary" />}
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
          {/* PingViewer is now dumb: just reads b.livePing from Redux */}
          <PingViewer />
        </Box>

        <Box sx={{ m: 2 }}>
          <MapView id="livePingMap" marker height={250} zoom={3.5} />
        </Box>
      </Dialog>
    </>
  );
}
