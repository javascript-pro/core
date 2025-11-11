// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/Signin.tsx
import * as React from 'react';
import {
  CardHeader,
  Card,
  CardContent,
  Button,
  TextField,
  CardActions,
} from '@mui/material';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useDispatch, Icon } from '../../../../gl-core';
import { usePaywall, useUser, setPaywallKey } from '../../Paywall';

export default function Signin() {
  const [user, setUser] = React.useState<User | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleClose = () => {
    dispatch(setPaywallKey('dialogOpen', false));
  };

  const handleRegister = () => {
    dispatch(setPaywallKey('registering', true));
  };

  if (user) return null;

  return (
    <Card sx={{}}>
      <CardContent>
        <TextField
          autoFocus
          sx={{ my: 2 }}
          fullWidth
          variant="filled"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          sx={{ my: 2 }}
          variant="filled"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick={handleRegister}
          startIcon={<Icon icon="paywall" />}
          type="submit"
          variant="outlined"
        >
          Sign up
        </Button>
        <Button
          onClick={handleLogin}
          endIcon={<Icon icon="signin" />}
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
      </CardActions>
    </Card>
  );
}
