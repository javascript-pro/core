'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import {
  Box,
  Typography,
} from '@mui/material';

export default function UbereduxProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={<>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='button' >
            Uberedux Rehydrating...
          </Typography>
        </Box>
      </>
      } persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
