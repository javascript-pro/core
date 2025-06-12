'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../../../gl-core/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import {
  Box,
  CircularProgress,
  Alert,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import { useDispatch, toggleFeedback, routeTo } from '../../../../../gl-core';
import {
  Icon,
  deleteUpload,
  CustomButton,
  useFileTypes,
  useFallmanager,
} from '../../../Fallmanager';

type UploadEditProps = {
  slug: string;
};

type UploadDoc = {
  id: string;
  name?: string;
  slug?: string;
  [key: string]: any;
};

export default function UploadEdit({ slug }: UploadEditProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [doc, setDoc] = React.useState<UploadDoc | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fileTypes = useFallmanager();

  const handleDelete = () => {
    if (doc?.id) dispatch(deleteUpload(doc?.id));
  };

  const handleClose = () => {
    dispatch(routeTo('/fallmanager', router));
  };

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

    const q = query(collection(db, 'uploads'), where('slug', '==', slug));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        setDoc({
          id: docSnap.id,
          ...docSnap.data(),
        });
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
          title={<Typography variant="h4">{doc.name || 'Untitled'}</Typography>}
          subheader={
            <Typography variant="body2">{doc.type || 'Untitled'}</Typography>
          }
          // avatar={
          //   <IconButton
          //     onClick={() => {
          //       dispatch(
          //         routeTo(
          //           `/fallmanager/uploads/?filter=${doc.extension}`,
          //           router,
          //         ),
          //       );
          //     }}
          //   >
          //     <Icon icon={doc.icon} />
          //   </IconButton>
          // }
          action={
            <>
              <CustomButton
                onClick={handleDelete as any}
                icon="delete"
                label="Delete"
                variant="outlined"
              />
              <CustomButton
                sx={{ ml: 1 }}
                onClick={handleClose as any}
                icon="save"
                label="Save & Close"
                variant="contained"
              />
            </>
          }
        />

        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
        </CardActions>

        <CardContent>
          <Typography variant="h1">{doc.extension}</Typography>
          <pre>{JSON.stringify(fileTypes, null, 2)}</pre>
          <pre>{JSON.stringify(doc, null, 2)}</pre>
        </CardContent>
      </Card>
    </Box>
  );
}
