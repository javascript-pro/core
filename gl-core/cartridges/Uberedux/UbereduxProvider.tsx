'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingOverlay } from '../../../gl-core';

export default function UbereduxProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingOverlay />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
