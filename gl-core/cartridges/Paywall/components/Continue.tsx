// cartridges/Paywall/components/Continue.tsx
'use client';
import * as React from 'react';
import { Box, Typography, CardContent, Button, Grid } from '@mui/material';
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { Icon } from '../../../../gl-core';

export default function Continue() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);
  if (user) return null;

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleFacebook = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleGithub = async () => {
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleTwitter = async () => {
    try {
      await signInWithPopup(auth, new TwitterAuthProvider());
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Box sx={{}}>
      <Grid container spacing={1} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <CardContent>
            <Typography variant="body1" sx={{ mb: 3 }}>
              This content requires authentication. Please sign in using one of
              the providers below. If you need access but can't use these
              options, let us know
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={handleGoogle}
              startIcon={<Icon icon="google" />}
              sx={{ py: 1.6 }}
            >
              Google
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleGithub}
              startIcon={<Icon icon="github" />}
              sx={{ py: 1.6, mt: 2 }}
            >
              GitHub
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleTwitter}
              startIcon={<Icon icon="twitter" />}
              sx={{ py: 1.6, mt: 2 }}
            >
              Twitter
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}
