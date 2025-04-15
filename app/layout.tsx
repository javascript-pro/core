import path from 'path';
import fs from 'fs/promises';
import config from '#/goldlabel/config.json';
import { Metadata } from 'next';
import { Appshell } from '#/goldlabel';
import {UbereduxProvider} from '../goldlabel/features/Uberedux';
import './styles.css';

const title = config.appTitle;
const description = config.description;
const url = config.url;
const image = config.image;

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s',
  },
  metadataBase: new URL(url),
  description,
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navPath = path.join(process.cwd(), 'public/globalNav.json');
  let globalNav = null;
  try {
    const navRaw = await fs.readFile(navPath, 'utf-8');
    globalNav = JSON.parse(navRaw);
  } catch (err) {
    console.error('Failed to load globalNav.json:', err);
  }

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#efefef" />
        <link rel="icon" href="/svg/favicon.svg" type="image/x-icon" />
        <link rel="shortcut icon" href="/svg/favicon.svg" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/png/iOS.png" />
      </head>
      <body>
        <UbereduxProvider>
          <div id="goldlabel">
            <Appshell globalNav={globalNav}>{children}</Appshell>
          </div>
        </UbereduxProvider>
      </body>
    </html>
  );
}
