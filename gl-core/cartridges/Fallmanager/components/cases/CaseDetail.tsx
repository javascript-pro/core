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
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  CardActions,
} from '@mui/material';
import { useDispatch, routeTo } from '../../../../../gl-core';
import { useUser } from '../../../Bouncer';
import {
  closeCase,
  reopenCase,
  CustomButton,
  Icon,
  EditableTextField,
} from '../../../Fallmanager';

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

  const handleReopen = async () => {
    await dispatch(reopenCase(data.id, user));
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

  const { caseName, caseClosed, closedAt, closedBy, createdAt } = data;

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">{caseName}</Typography>}
        subheader={
          caseClosed && closedAt && closedBy ? (
            <Typography variant="caption">
              Case closed on{' '}
              {new Date(closedAt.seconds * 1000).toLocaleString()} by{' '}
              {closedBy.email}
            </Typography>
          ) : createdAt ? (
            <Typography variant="caption">
              Case opened on{' '}
              {new Date(createdAt.seconds * 1000).toLocaleString()}
            </Typography>
          ) : null
        }
        avatar={
          <IconButton onClick={handleBack}>
            <Icon icon="home" />
          </IconButton>
        }
      />

      <CardContent>
        <Grid container spacing={1}>
          <Grid size={{xs:6}}>
            {caseClosed ? (
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Party 1
                </Typography>
                <Typography variant="subtitle1">
                  {data?.party1 || '—'}
                </Typography>
              </Box>
            ) : (
              <EditableTextField
                id="case-party1"
                sx={{ my: 2 }}
                label="Party 1"
                value={data?.party1}
                onSave={(newValue) => {
                  console.log('save party1', newValue);
                  // dispatch(updateCaseField(data.id, 'party1', newValue));
                }}
              />
            )}
          </Grid>

          <Grid size={{xs:6}}>
            {caseClosed ? (
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Party 2
                </Typography>
                <Typography variant="subtitle1">
                  {data?.party2 || '—'}
                </Typography>
              </Box>
            ) : (
              <EditableTextField
                id="case-party2"
                sx={{ my: 2 }}
                label="Party 2"
                value={data?.party2}
                onSave={(newValue) => {
                  console.log('save party2', newValue);
                  // dispatch(updateCaseField(data.id, 'party2', newValue));
                }}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        {caseClosed ? (
          <Box>
            <CustomButton
              sx={{ my: 2 }}
              mode="button"
              variant="outlined"
              label="Reopen case"
              icon="case"
              onClick={handleReopen}
            />
          </Box>
        ) : (
          <CustomButton
            sx={{ my: 2 }}
            mode="button"
            variant="outlined"
            label="Close case"
            icon="caseclosed"
            onClick={handleCloseCase}
          />
        )}
      </CardActions>
    </Card>
  );
}
