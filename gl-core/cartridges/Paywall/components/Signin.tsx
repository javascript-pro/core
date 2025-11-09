// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/Signin.tsx
import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import LoginIcon from '@mui/icons-material/Login';

export default function Signin() {
  const [user, setUser] = React.useState<User | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

  return (
    <Box>
      <TextField
        autoFocus
        sx={{ my: 1 }}
        fullWidth
        variant="filled"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        sx={{ my: 1 }}
        variant="filled"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        size="large"
        sx={{ my: 1 }}
        onClick={handleLogin}
        startIcon={<LoginIcon />}
        type="submit"
        variant="contained"
        fullWidth
      >
        Sign in
      </Button>
    </Box>
  );
}
