'use client';
import * as React from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../gl-core/lib/firebase';
import {
  Box,
  CircularProgress,
  Alert,
  CardHeader,
  CardActions,
  CardContent,
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
  url?: string;
  extension?: string;
  type?: string;
  size?: number;
  uploadedAt?: {
    seconds: number;
    nanoseconds: number;
  };
  [key: string]: any;
};

export default function UploadEdit({ slug }: UploadEditProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [doc, setDoc] = React.useState<UploadDoc | null>(null);
  const [loading, setLoading] = React.useState(true);

  const handleDelete = async () => {
    if (doc?.id) {
      await dispatch(deleteUpload(doc.id));
      dispatch(routeTo('/fallmanager/uploads', router));
    }
  };

  const handleCopy = () => {
    if (doc?.url) {
      navigator.clipboard
        .writeText(doc.url)
        .then(() => {
          dispatch(
            toggleFeedback({
              severity: 'success',
              title: 'Link copied to clipboard',
            }),
          );
        })
        .catch((err) => {
          dispatch(
            toggleFeedback({
              severity: 'error',
              title: 'Failed to copy link',
              description: err.message,
            }),
          );
        });
    } else {
      dispatch(
        toggleFeedback({
          severity: 'warning',
          title: 'No link available to copy',
        }),
      );
    }
  };

  const handleClose = () => {
    dispatch(routeTo('/fallmanager', router));
  };

  const handleDownload = () => {
    if (doc?.url) {
      window.open(doc.url, '_blank');
    } else {
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: 'No download URL found for this document.',
        }),
      );
    }
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
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!doc) {
    return (
      <Box>
        <Alert severity="warning">
          No document loaded. Please check the slug.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <CardHeader
        title={<Typography variant="h6">{doc.name || 'Untitled'}</Typography>}
        avatar={
          <>
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(routeTo(`/fallmanager`, router));
              }}
            >
              <Icon icon={'home'} />
            </IconButton>
            <IconButton
              color="secondary"
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
          </>
        }
      />
      <CardContent>
        <Typography variant="body2">{formatFileSize(doc.size)}</Typography>
        <Typography variant="body2">{doc.type}</Typography>
        <Typography variant="body2">
          Uploaded {moment(doc.uploadedAt?.seconds * 1000).fromNow()}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton
          sx={{ ml: 1 }}
          onClick={handleDelete as any}
          icon="delete"
          label="Delete"
        />
        <CustomButton
          sx={{ ml: 1 }}
          label="View"
          icon="link"
          onClick={handleDownload}
        />
        <CustomButton
          sx={{ ml: 1 }}
          label="Copy link"
          icon="copy"
          onClick={handleCopy}
        />
        {/* <CustomButton
          sx={{ ml: 1 }}
          onClick={handleClose}
          icon="save"
          label="Save & Close"
        /> */}
      </CardActions>
    </Box>
  );
}
