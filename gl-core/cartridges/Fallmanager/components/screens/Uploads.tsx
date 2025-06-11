'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Uploads.tsx
import * as React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  Typography,
} from '@mui/material';
import { useDispatch } from '../../../../../gl-core';
import { incomingChange, useFallmanager } from '../../../Fallmanager';
import { db } from '../../../../../gl-core/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

export default function Uploads() {
  const dispatch = useDispatch();
  const slice = useFallmanager();
  const uploads = slice?.uploads || [];

  React.useEffect(() => {
    const q = query(
      collection(db, 'uploads'),
      where('cartridge', '==', 'fallmanager'),
      orderBy('uploadedAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("data", data)
      dispatch(incomingChange('uploads', data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Recent Uploads (Fallmanager)
      </Typography>
      <List dense>
        {uploads.length === 0 && (
          <ListItem>
            <ListItemText primary="No uploads yet." />
          </ListItem>
        )}
        {uploads.map((upload: any) => {
          const timeAgo = upload.uploadedAt?.seconds
            ? formatDistanceToNow(new Date(upload.uploadedAt.seconds * 1000), {
                addSuffix: true,
              })
            : 'just now';

          return (
            <ListItem key={upload.id} disableGutters>
              <ListItemText
                primary={
                  <Link href={upload.url} target="_blank" rel="noopener">
                    {upload.name}
                  </Link>
                }
                secondary={`${upload.type} – uploaded ${timeAgo}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
