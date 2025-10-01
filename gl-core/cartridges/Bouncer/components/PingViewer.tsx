// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/PingViewer.tsx
'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Icon } from '../../../../gl-core';
import { useBouncer } from '../../Bouncer';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function PingViewer() {
  const b = useBouncer();
  const id = b?.id ?? '';
  const [docData, setDocData] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (!id) {
      setDocData(null);
      return;
    }

    const ref = doc(db, 'pings', id);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        console.log("🔄 Document updated:", snap.data());
        setDocData(snap.data());
      } else {
        console.log("⚠️ Document does not exist");
        setDocData(null);
      }
    });

    return () => unsub();
  }, [id]);

  return (
    <Box>
      <Typography variant="subtitle2">Subscribed Ping Document</Typography>
      <pre style={{ fontSize: 10, background: '#111', color: '#0f0', padding: '8px' }}>
        {docData ? JSON.stringify(docData, null, 2) : 'No document loaded'}
      </pre>
    </Box>
  );
}
