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
  Typography,
} from '@mui/material';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useDispatch, Icon } from '../../../../gl-core';

export default function SignInUp() {
  const [user, setUser] = React.useState<User | null>(null);
  const dispatch = useDispatch();

  // Sign-in fields
  const [siEmail, setSiEmail] = React.useState('');
  const [siPassword, setSiPassword] = React.useState('');
  const [siErrors, setSiErrors] = React.useState<{ email?: string; password?: string }>({});

  // Sign-up fields
  const [suEmail, setSuEmail] = React.useState('');
  const [suPassword, setSuPassword] = React.useState('');
  const [suConfirm, setSuConfirm] = React.useState('');
  const [suErrors, setSuErrors] = React.useState<{
    email?: string;
    password?: string;
    confirm?: string;
  }>({});

  React.useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);
  if (user) return null;

  // Validation
  const validateSignin = () => {
    const e: any = {};
    if (!siEmail.trim()) e.email = 'Please enter your email';
    if (!siPassword.trim()) e.password = 'Please enter your password';
    setSiErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateSignup = () => {
    const e: any = {};
    if (!suEmail.trim()) e.email = 'Email required';
    if (!suPassword.trim()) e.password = 'Password required';
    if (!suConfirm.trim()) e.confirm = 'Please confirm your password';
    if (suPassword && suConfirm && suPassword !== suConfirm) {
      e.confirm = 'Passwords do not match';
    }
    setSuErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handlers
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignin()) return;
    try {
      await signInWithEmailAndPassword(auth, siEmail, siPassword);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    try {
      await createUserWithEmailAndPassword(auth, suEmail, suPassword);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {/* SIGN IN */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CardHeader title="Sign in" />

          <form onSubmit={handleSignin} noValidate>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Access your existing account.  
                If you're new, use the form on the right to create one.
              </Typography>

              <TextField
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
              <Button type="submit" variant="contained" endIcon={<Icon icon="signin" />}>
                Sign In
              </Button>
            </CardActions>
          </form>
        </Grid>

        {/* SIGN UP */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CardHeader title="Create an account" />

          <form onSubmit={handleSignup} noValidate>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Create a new account.  
                Password should be at least 6 characters.
              </Typography>

              <TextField
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                value={suEmail}
                onChange={(e) => setSuEmail(e.target.value)}
                error={Boolean(suErrors.email)}
                helperText={suErrors.email}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                value={suPassword}
                onChange={(e) => setSuPassword(e.target.value)}
                error={Boolean(suErrors.password)}
                helperText={suErrors.password}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Confirm password"
                type="password"
                value={suConfirm}
                onChange={(e) => setSuConfirm(e.target.value)}
                error={Boolean(suErrors.confirm)}
                helperText={suErrors.confirm}
                sx={{ mb: 2 }}
              />
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" endIcon={<Icon icon="right" />}>
                Sign Up
              </Button>
            </CardActions>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
