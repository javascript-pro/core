'use client';
import * as React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export default function Signout() {
  const [user, setUser] = React.useState<User | null>(auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('✅ Signed out successfully');
    } catch (err) {
      console.error('Sign-out error:', err);
      alert((err as Error).message);
    }
  };

  if (!user) {
    return (
      <Typography variant="body2" sx={{ textAlign: 'center', p: 2 }}>
        You’re not signed in.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 2,
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <Avatar
          src={user.photoURL || '/svg/avatar-placeholder.svg'}
          alt={user.displayName || user.email || 'User'}
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="h6">{user.displayName || user.email}</Typography>

        <Button
          size="large"
          color="error"
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleSignOut}
          sx={{ mt: 1 }}
        >
          Sign out
        </Button>
      </Stack>
    </Box>
  );
}
