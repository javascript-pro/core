'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  IconButton,
  CircularProgress,
  Alert,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import {
  Icon,
  useDispatch,
  toggleFeedback,
} from '../../../../../gl-core';
import { db } from '../../../../../gl-core/lib/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore';

type UploadEditProps = {
  slug: string;
};

export default function UploadEdit({ slug }: UploadEditProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [doc, setDoc] = React.useState<DocumentData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!slug) {
      dispatch(
        toggleFeedback({
          severity: 'warning',
          title: 'No document found - missing slug',
        }),
      );
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'uploads'),
      where('slug', '==', slug),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setDoc(snapshot.docs[0].data());
      } else {
        dispatch(
          toggleFeedback({
            severity: 'warning',
            title: 'No document found with that slug',
          }),
        );
        setDoc(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug, dispatch]);

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!doc) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          No document loaded. Please check the slug.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardHeader 
          title={<Typography variant="h6">
                  {doc.name || 'Untitled'}
                </Typography>}
          avatar={<IconButton onClick={() => router.back()}>
                    <Icon icon="left"/>
                  </IconButton>}
        />
        <CardContent>
          <pre>{JSON.stringify(doc, null, 2)}</pre>
        </CardContent>
      </Card>
    </Box>
  );
}
