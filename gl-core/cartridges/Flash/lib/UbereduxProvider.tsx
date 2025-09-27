// /Users/goldlabel/GitHub/flash/app/src/Flash/lib/UbereduxProvider.tsx
'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function UbereduxProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
