// /Users/goldlabel/GitHub/core/gl-core/cartridges/Pings/Pings.tsx
'use client';
import React from 'react';
import { Box, Dialog, CardHeader } from '@mui/material';
import { MightyButton, useDispatch, useIsMobile } from '../../../gl-core';
import {
  PingViewer,
  usePings,
  setPingsKey,
  createPing,
  ping,
  PingChip,
  PersonHeader,
} from '../Pings';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useSounds } from '../Theme';

export default function Pings() {
  const b = usePings();
  const dispatch = useDispatch();
  const startedRef = React.useRef(false);
  const isMobile = useIsMobile();
  const [unseenCount, setUnseenCount] = React.useState(0);
  const prevCount = React.useRef(0);
  const { play } = useSounds();

  // 1️⃣ Create ping on first mount (only if id missing)
  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    console.log('🟡 [Pings] Initialising ping system…');
    if (!b?.id) {
      console.log('🟢 [Pings] No ping ID found → dispatching createPing()');
      dispatch(createPing());
    } else {
      console.log('⚪ [Pings] Existing ping ID found →', b.id);
    }
  }, [dispatch, b?.id]);

  // 2️⃣ Once we have a ping id → perform ping
  React.useEffect(() => {
    if (b?.id) {
      console.log('🟢 [Pings] Ping ID detected → dispatching ping()', b.id);
      dispatch(ping());
    } else {
      console.log('⚪ [Pings] Waiting for ping ID…');
    }
  }, [dispatch, b?.id]);

  // 3️⃣ Subscribe to ping document (livePing + unseenCount)
  React.useEffect(() => {
    if (!b?.id) {
      console.log('⚪ [Pings] No ping ID yet → not subscribing');
      setUnseenCount(0);
      dispatch(setPingsKey('livePing', null));
      return;
    }

    console.log('🟣 [Pings] Subscribing to Firestore doc:', b.id);
    const ref = doc(db, 'pings', b.id);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        console.log('🟢 [Pings] Firestore snapshot update', data);
        dispatch(setPingsKey('livePing', data));

        const count = Array.isArray(data.messages)
          ? data.messages.filter((m: any) => !m.seen).length
          : 0;
        setUnseenCount(count);

        if (prevCount.current === 0 && count > 0) {
          console.log('🔔 [Pings] New unseen message(s) → playing sound');
          play('success');
        }
        prevCount.current = count;
      } else {
        console.log(
          '🟠 [Pings] Snapshot missing → ping doc deleted or missing',
        );
        setUnseenCount(0);
        prevCount.current = 0;
        dispatch(setPingsKey('livePing', null));
      }
    });

    return () => {
      console.log('⚫ [Pings] Unsubscribing from Firestore doc:', b.id);
      unsub();
    };
  }, [b?.id, dispatch, play]);

  const handleClose = () => {
    console.log('❎ [Pings] Closing dialog');
    dispatch(setPingsKey('dialogOpen', false));
  };

  const handleBtnClick = () => {
    console.log('🟢 [Pings] Opening dialog');
    dispatch(setPingsKey('dialogOpen', true));
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PingChip unseenCount={unseenCount} onClick={handleBtnClick} />
      </Box>

      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
        open={b?.dialogOpen}
        onClose={handleClose}
      >
        <CardHeader
          avatar={<PersonHeader />}
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
