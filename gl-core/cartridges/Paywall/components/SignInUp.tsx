'use client';
import * as React from 'react';
import {
  Box,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useDispatch, Icon } from '../../../../gl-core';

export default function SignInUp() {
  const [user, setUser] = React.useState<User | null>(null);
  const dispatch = useDispatch();

  const [siEmail, setSiEmail] = React.useState('');
  const [siPassword, setSiPassword] = React.useState('');
  const [siErrors, setSiErrors] = React.useState<{ email?: string; password?: string }>({});

  React.useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);
  if (user) return null;

  const validateSignin = () => {
    const e: any = {};
    if (!siEmail.trim()) e.email = 'Please enter your email';
    if (!siPassword.trim()) e.password = 'Please enter your password';
    setSiErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignin()) return;
    try {
      await signInWithEmailAndPassword(auth, siEmail, siPassword);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {/* SIGN IN */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CardHeader
            title="Sign in"
            subheader="Access existing account.  
                If you're new, use Google to create one."
          />

          <form onSubmit={handleSignin} noValidate>
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                value={siEmail}
                onChange={(e) => setSiEmail(e.target.value)}
                error={Boolean(siErrors.email)}
                helperText={siErrors.email}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                value={siPassword}
                onChange={(e) => setSiPassword(e.target.value)}
                error={Boolean(siErrors.password)}
                helperText={siErrors.password}
                sx={{ mb: 2 }}
              />
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                endIcon={<Icon icon="signin" />}
              >
                Sign In
              </Button>
            </CardActions>
          </form>
        </Grid>

        {/* SIGN UP — GOOGLE + GITHUB */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CardHeader
            title="Sign Up"
            subheader="Create a new account using a provider."
          />

          <CardContent>
            <Button
              fullWidth
              variant="contained"
              onClick={handleGoogleSignup}
              startIcon={<Icon icon="google" />}
              sx={{ py: 1.5 }}
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleGithubSignup}
              startIcon={<Icon icon="github" />}
              sx={{ py: 1.5, mt: 2 }}
            >
              Continue with GitHub
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}
