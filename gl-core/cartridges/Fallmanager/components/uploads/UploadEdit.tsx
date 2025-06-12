'use client';
import * as React from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { db } from '../../../../../gl-core/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import {
  Box,
  CircularProgress,
  Alert,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';
import { useDispatch, toggleFeedback, routeTo } from '../../../../../gl-core';
import {
  Icon,
  deleteUpload,
  CustomButton,
  formatFileSize,
  getIconByExtension,
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
  // const fileTypes = useFileTypes();

  const handleDelete = () => {
    if (doc?.id) dispatch(deleteUpload(doc?.id));
  };

  const handleClose = () => {
    dispatch(routeTo('/fallmanager', router));
  };

  const handleDownload = () => {
    console.log('handleDownload');
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

  const icon = getIconByExtension(doc?.extension || '');

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
      <>
        <CardHeader
          title={<Typography variant="h6">{doc.name || 'Untitled'}</Typography>}
          subheader={
            <>
              <Typography variant="body2">
                {formatFileSize(doc.size)},{doc.type || ''}
              </Typography>
              <Typography variant="body2">
                Uploaded {moment(doc.uploadedAt.seconds * 1000).fromNow()}
              </Typography>
            </>
          }
          avatar={
            <IconButton
              onClick={() => {
                dispatch(
                  routeTo(
                    `/fallmanager/uploads/?filter=${doc.extension}`,
                    router,
                  ),
                );
              }}
            >
              <Icon icon={icon.icon as any} />
            </IconButton>
          }
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
                label="Download"
                variant="outlined"
                icon="download"
                onClick={handleDownload}
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
      </>
      <pre style={{ fontSize: 14 }}>icon: {JSON.stringify(icon, null, 2)}</pre>
    </Box>
  );
}
