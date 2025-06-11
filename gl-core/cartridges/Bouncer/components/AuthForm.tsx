'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx

import * as React from 'react';
import config from '../../../config.json';
import { useRouter } from 'next/navigation';
import {
  Container,
  CssBaseline,
  Box,
  IconButton,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import {
  Theme,
  IncludeAll,
  Icon,
  MightyButton,
  useDispatch,
  useThemeMode,
  toggleFeedback,
} from '../../../../gl-core';
import { firebaseAuth, useEmail } from '../../Bouncer';
import { bouncerKey } from '../actions/bouncerKey';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getFeedback(email: string, password: string) {
  if (!email && !password) {
    return {
      title: 'Please enter email and password',
      severity: 'info',
    };
  }

  if (!isValidEmail(email)) {
    return {
      title: 'Email',
      description: 'Please use a valid email address',
      severity: 'warning',
    };
  }

  if (password.length < 6) {
    return {
      title: 'Password',
      description: 'Password must be at least 6 characters',
      severity: 'warning',
    };
  }

  return null;
}

export default function AuthForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const canResetPassword = false;
  const email = useEmail(); // From Redux persisted state
  const [password, setPassword] = React.useState('');
  const themeMode = useThemeMode();
  const title = 'Not in those shoes, mate';
  const icon = 'signin';

  const isFormValid = React.useMemo(() => {
    return isValidEmail(email) && password.length >= 6;
  }, [email, password]);

  const shouldFocusPassword = isValidEmail(email);

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(bouncerKey('email', e.target.value));
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (isFormValid) {
          onSignIn();
        } else {
          const feedback = getFeedback(email, password);
          if (feedback) dispatch(toggleFeedback(feedback as any));
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, email, password, isFormValid]);

  return (
    <Theme theme={config.themes[themeMode] as any}>
      <CssBaseline />
      <IncludeAll />
      <Container maxWidth="xs" sx={{ pt: 2 }}>
        <CardHeader
          avatar={
            <IconButton onClick={handleBack}>
              <Icon icon="left" />
            </IconButton>
          }
          title={<Typography variant="h6">{title}</Typography>}
        />
        <CardContent>
          <TextField
            id="email"
            variant="outlined"
            color="secondary"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            autoFocus={!shouldFocusPassword}
          />
          <TextField
            id="password"
            variant="outlined"
            color="secondary"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus={shouldFocusPassword}
            sx={{ mt: 2 }}
          />
        </CardContent>

        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          {canResetPassword && (
            <Box>
              <Button onClick={() => console.log('Password?')}>
                Password?
              </Button>
            </Box>
          )}

          <MightyButton
            fullWidth
            sx={{ mx: 1, mb: 1 }}
            onClick={onSignIn}
            variant={isFormValid ? 'contained' : 'text'}
            disabled={!isFormValid}
            label="Sign in"
            icon={icon}
          />
        </CardActions>
      </Container>
    </Theme>
  );
}
