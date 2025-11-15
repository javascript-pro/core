'use client';
import * as React from 'react';
import { Box, CardHeader, CardContent, Button, Grid } from '@mui/material';
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useDispatch, Icon } from '../../../../gl-core';

export default function SignInUp() {
  const [user, setUser] = React.useState<User | null>(null);
  const dispatch = useDispatch();

  React.useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);
  if (user) return null;

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
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

  const handleFacebook = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleTwitter = async () => {
    try {
      const provider = new OAuthProvider('twitter.com');
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Box sx={{}}>
      <Grid container spacing={1} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <CardHeader
            title="Paywall"
            subheader="Continue with one of our trusted providers"
          />

          <CardContent>
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

            {/* <Button
              fullWidth
              variant="contained"
              onClick={handleFacebook}
              startIcon={<Icon icon="facebook" />}
              sx={{ py: 1.6, mt: 2 }}
            >
              Continue with Facebook
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleTwitter}
              startIcon={<Icon icon="twitter" />}
              sx={{ py: 1.6, mt: 2 }}
            >
              Continue with Twitter
            </Button> */}
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}
