// core/gl-core/cartridges/Fallmanager/components/cases/CaseDetail.tsx
'use client';

import * as React from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../gl-core/lib/firebase';
import { Box, Typography, CircularProgress } from '@mui/material';

type Props = {
  id: string;
};

export default function CaseDetail({ id }: Props) {
  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const ref = doc(db, 'fallmanager', id);
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setData({ id: snap.id, ...snap.data() });
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <Typography>No case found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">Case: {data.clientName}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        ID: {data.id}
      </Typography>
      {/* Extend this with more case info */}
    </Box>
  );
}
