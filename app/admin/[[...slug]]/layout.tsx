// core/app/layout.tsx
import * as React from 'react';
import path from 'path';
import fs from 'fs/promises';
// import '../../styles.css';
import { UbereduxProvider } from '../../../gl-core/cartridges/Uberedux';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let shortcutIcon = '/svg/favicon.svg';
  let appleTouchIcon = '/png/apple-touch-icon.png';

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest-admin.json" />
        <meta name="theme-color" content="#303030" />
        <link rel="icon" href={shortcutIcon} type="image/x-icon" />
        <link rel="shortcut icon" href={shortcutIcon} type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      </head>
      <body>
        <UbereduxProvider>{children}</UbereduxProvider>
      </body>
    </html>
  );
}
