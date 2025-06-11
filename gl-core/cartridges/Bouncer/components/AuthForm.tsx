'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx

import * as React from 'react';
import config from '../../../config.json';
import { useRouter } from 'next/navigation';
import {
  Container,
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
import {
  Theme,
  Icon,
  MightyButton,
  useDispatch,
  useThemeMode,
} from '../../../../gl-core';
import { firebaseAuth, useEmail } from '../../Bouncer';
import { bouncerKey } from '../actions/bouncerKey';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuthForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const canResetPassword = false;
  const email = useEmail(); // From Redux persisted state
  const [password, setPassword] = React.useState('');
  const themeMode = useThemeMode();
  const title = 'Sign In';
  const description = '(please)';
  const icon = 'signin';

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(bouncerKey('email', e.target.value));
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
    <Theme theme={config.themes[themeMode] as any}>
      <Container maxWidth="xs" sx={{ pt: 2 }}>
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
              id="email"
              variant="filled"
              autoFocus
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              id="password"
              variant="filled"
              label="Password"
              type="password"
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
                <Button onClick={() => console.log('Password?')}>
                  Password?
                </Button>
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
      </Container>
    </Theme>
  );
}
