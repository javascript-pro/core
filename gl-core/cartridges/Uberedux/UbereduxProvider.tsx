'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default function UbereduxProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <>
            <div
              style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h6>Rehydrating...</h6>
            </div>
          </>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
