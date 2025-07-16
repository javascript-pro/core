// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/components/UsersAdmin.tsx
'use client';

import * as React from 'react';
import {
  CssBaseline,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  CircularProgress,
} from '@mui/material';
import { MightyButton, Icon, useDispatch } from '../../../../gl-core';
import { useRouter } from 'next/navigation';
import {
  collection,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../../../gl-core/lib/firebase'; // adjust import if your firebase config lives elsewhere

type TUserDoc = {
  id: string;
  [key: string]: any;
};

export default function UsersAdmin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [users, setUsers] = React.useState<TUserDoc[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // subscribe to Firestore users collection
    const colRef = collection(db, 'users');
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        const data: TUserDoc[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...doc.data(),
          }),
        );
        setUsers(data);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore subscription error:', error);
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Users
      </Typography>

      {loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 3 }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && users.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No users found.
        </Typography>
      )}

      {!loading && users.length > 0 && (
        <List>
          {users.map((user) => (
            <ListItemButton key={user.id}>
              <ListItemIcon>
                <Icon icon="user" />{' '}
                {/* replace with a relevant icon from your Icon set */}
              </ListItemIcon>
              <ListItemText
                primary={user.email || user.name || user.id}
                secondary={user.role ? `Role: ${user.role}` : undefined}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
