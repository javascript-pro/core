'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Icon, MightyButton, useDispatch } from '../../../../gl-core';
import { TAuthForm } from '../../../types';
import { firebaseAuth } from '../../Bouncer';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuthForm({ frontmatter }: TAuthForm) {
  const dispatch = useDispatch();
  const router = useRouter();
  const canResetPassword = false;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {
    icon = 'signin',
    title = 'Sign in to your account',
    description = 'Enter your email and password',
  } = frontmatter || {};

  const isFormValid = React.useMemo(() => {
    return isValidEmail(email) && password.length >= 6;
  }, [email, password]);

  const onSignIn = () => {
    dispatch(
      firebaseAuth('signin', {
        email,
        password,
      }),
    );
  };

  const handleBack = () => {
    router.back();
  };

  React.useEffect(() => {
    if (!email && !password) {
      // Feedback: waiting for input
    } else if (!isValidEmail(email)) {
      // Feedback: invalid email
    } else if (password.length < 6) {
      // Feedback: weak password
    } else {
      // Feedback: null
    }
  }, [email, password, dispatch]);

  return (
    <Card>
      <CardHeader
        avatar={
          <IconButton onClick={handleBack}>
            <Icon icon="left" />
          </IconButton>
        }
        title={<Typography variant="h6">{title}</Typography>}
        subheader={<Typography variant="body2">{description}</Typography>}
      />
      <CardContent>
        <TextField
          autoFocus
          label="Email"
          type="email"
          variant="filled"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="filled"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
        />
      </CardContent>

      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        {canResetPassword && (
          <Box>
            <Button onClick={() => console.log('Password?')}>Password?</Button>
          </Box>
        )}

        <MightyButton
          sx={{ mx: 1, mb: 1 }}
          onClick={onSignIn}
          variant={isFormValid ? 'contained' : 'outlined'}
          disabled={!isFormValid}
          label="Sign in"
          icon={icon}
        />
      </CardActions>
    </Card>
  );
}
