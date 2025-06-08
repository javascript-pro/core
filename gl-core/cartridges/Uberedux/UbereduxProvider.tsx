'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Icon } from '../../../gl-core';

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
                src="/svg/favicon.svg"
                alt="Uberedux"
                width={50}
                height={50}
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
