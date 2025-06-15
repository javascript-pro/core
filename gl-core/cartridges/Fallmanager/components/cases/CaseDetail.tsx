'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../gl-core/lib/firebase';
import { 
  Card,
  CardHeader,
  CardContent,
  Box, 
  Typography, CircularProgress, 
  IconButton} from '@mui/material';
import { useDispatch, routeTo } from '../../../../../gl-core';
import { useUser } from '../../../Bouncer';
import { closeCase, CustomButton, Icon } from '../../../Fallmanager';

export type TCaseDatail = {
  id: string;
};

export default function CaseDetail({ id }: TCaseDatail) {
  const dispatch = useDispatch();
    const router = useRouter();
  const user = useUser();
  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  const handleBack = async () => {
    await dispatch(routeTo('/fallmanager', router));
  };

  const handleCloseCase = async () => {
    if (data?.id && user?.uid) {
      await dispatch(closeCase(data.id, user));
    }
  };

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

  if (loading) return <CircularProgress />;
  if (!data) return <Typography>No case found.</Typography>;

  const { clientName, caseClosed, closedAt, closedBy } = data;

  return (
    <Card>

      <CardHeader 
        title={clientName}
        avatar={<IconButton onClick={handleBack}><Icon icon="left" /></IconButton>}
      />
      

      {caseClosed && closedAt && closedBy && (
        <>
          <Typography sx={{ my: 2 }} variant="h6">
            Case closed on{' '}
            {new Date(closedAt.seconds * 1000).toLocaleString()} by {closedBy.email}
          </Typography>
        </>
      )}

      {!caseClosed && (
        <CustomButton
          sx={{ my: 2 }}
          mode="button"
          variant="contained"
          label="Close case"
          icon="caseclosed"
          onClick={handleCloseCase}
        />
      )}

      <pre>data: {JSON.stringify(data, null, 2)}</pre>
    </Card>
  );
}
