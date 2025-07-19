// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/SignIn.tsx
'use client';

import * as React from 'react';
import config from '../../../config.json';
import { useRouter } from 'next/navigation';
import {
  Box,
  IconButton,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import {
  Icon,
  MightyButton,
  useDispatch,
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

export type SignInProps = {
  onClose?: () => void;
};

export default function Signin({ onClose }: SignInProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const canResetPassword = false;
  const email = useEmail();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [signingIn, setSigningIn] = React.useState(false);
  const title = 'Sign in';
  const icon = 'signin';

  const isFormValid = React.useMemo(() => {
    return isValidEmail(email) && password.length >= 6;
  }, [email, password]);

  const shouldFocusPassword = isValidEmail(email);

  const onSignIn = async () => {
    setSigningIn(true);
    try {
      await dispatch(
        firebaseAuth('signin', {
          email,
          password,
        }),
      );
      if (onClose) onClose();
    } catch (e: any) {
      dispatch(
        toggleFeedback({
          severity: 'info',
          title: 'Sign in failed',
          description:
            e?.message || 'An unknown error occurred while signing in.',
        }),
      );
    } finally {
      setSigningIn(false);
    }
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
    <>
      <CardHeader
        avatar={
          <IconButton onClick={handleBack}>
            <Icon icon="blokey" />
          </IconButton>
        }
        action={
          onClose ? (
            <IconButton onClick={onClose} color="primary">
              <Icon icon="close" />
            </IconButton>
          ) : null
        }
        title={<Typography variant="h6">{title}</Typography>}
      />
      <CardContent>
        <TextField
          id="email"
          variant="outlined"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          autoFocus={!shouldFocusPassword}
          disabled={signingIn}
        />
        <TextField
          id="password"
          variant="outlined"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus={shouldFocusPassword}
          sx={{ mt: 2 }}
          disabled={signingIn}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  tabIndex={-1}
                >
                  <Icon icon={showPassword ? 'hide' : 'show'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          fullWidth
          sx={{ mx: 1, mb: 1 }}
          onClick={onSignIn}
          variant={isFormValid ? 'contained' : 'text'}
          disabled={!isFormValid || signingIn}
          label="Sign in"
          icon={icon}
          iconPlacement="right"
        />
      </CardActions>
    </>
  );
}
