'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import Image from 'next/image';
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
              <Image
                priority
                src="/svg/rehydrate-ad.svg"
                alt="Rehydrating Uberedux"
                width={150}
                height={150}
                style={{ objectFit: 'contain' }}
              />
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
