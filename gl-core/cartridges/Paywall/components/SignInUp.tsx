// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/SignInUp.tsx
'use client';
import * as React from 'react';
import {
  CardHeader,
  Card,
  CardContent,
  Button,
  TextField,
  CardActions,
  Container,
} from '@mui/material';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useDispatch, Icon } from '../../../../gl-core';
import { usePaywall, setPaywallKey } from '../../Paywall';

export default function SignInUp() {
  const [user, setUser] = React.useState<User | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const dispatch = useDispatch();

  const paywall = usePaywall();
  const { mode = 'signin' } = paywall; // default to signin

  React.useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const toggleMode = (newMode: 'signin' | 'signup') => {
    dispatch(setPaywallKey('mode', newMode));
    setErrors({});
    setEmail('');
    setPassword('');
  };

  if (user) return null;

  return (
    <Container maxWidth="xs">
      <Card>
        <CardHeader
          title={mode === 'signin' ? 'Sign in' : 'Sign up'}
        />
        <form onSubmit={handleSubmit} noValidate>
          <CardContent>
            <TextField
              autoFocus
              fullWidth
              variant="filled"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{ my: 2 }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ my: 2 }}
            />
          </CardContent>
          <CardActions>
            {mode === 'signin' ? (
              <>
              <Button
                onClick={() => toggleMode('signup')}
                startIcon={<Icon icon="tick" />}
                variant="outlined"
              >
                Sign up
              </Button>
              </>
            ) : (
              <Button
                onClick={() => toggleMode('signin')}
                startIcon={<Icon icon="left" />}
                variant="outlined"
              >
                Sign in
              </Button>
            )}
            <Button
              type="submit"
              endIcon={<Icon icon={mode === 'signin' ? 'signin' : 'right'} />}
              variant="contained"
            >
              {mode === 'signin' ? 'Sign in' : 'Sign up'}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
