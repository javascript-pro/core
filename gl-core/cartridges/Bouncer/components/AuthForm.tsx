'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx
import * as React from 'react';
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
import { Icon, navigateTo, useDispatch } from '../../../../gl-core';
import { TAuthForm } from '../../../types';
import { firebaseAuth } from '../../Bouncer';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuthForm({ frontmatter }: TAuthForm) {
  const dispatch = useDispatch();
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
        avatar={<Icon icon={icon} />}
        action={
          <IconButton onClick={() => dispatch(navigateTo('/'))}>
            <Icon icon="close" />
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
        {canResetPassword && (
          <Box>
            <Button onClick={() => console.log('Password?')}>Password?</Button>
          </Box>
        )}
        <Button
          fullWidth
          onClick={onSignIn}
          variant={isFormValid ? 'contained' : 'outlined'}
          disabled={!isFormValid}
        >
          Sign In
        </Button>
      </CardActions>
    </Card>
  );
}
