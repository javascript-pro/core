'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/UploadList.tsx
import * as React from 'react';
import { db } from '../../../../../gl-core/lib/firebase';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useDispatch } from '../../../../../gl-core';
import { incomingChange, useFallmanager } from '../../../Fallmanager';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

export default function UploadList() {
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
      dispatch(incomingChange('uploads', data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleItemClick = (item: any) => {
    console.log('handleItemClick', item);
  };

  return (
    <Box>
      <List dense>
        {uploads.length === 0 && (
          <ListItem>
            <ListItemText primary="No uploads yet." />
          </ListItem>
        )}
        {uploads.map((upload: any, i: number) => {
          const timeAgo = upload.uploadedAt?.seconds
            ? formatDistanceToNow(new Date(upload.uploadedAt.seconds * 1000), {
                addSuffix: true,
              })
            : 'just now';

          return (
            <ListItemButton
              key={`upload_${i}`}
              onClick={() => {
                handleItemClick(upload);
              }}
            >
              <ListItemText
                primary={upload.name}
                secondary={`Uploaded ${timeAgo}`}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
