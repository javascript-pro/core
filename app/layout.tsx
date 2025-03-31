// import '#/styles/globals.css';
import { Metadata } from 'next';

const title = 'Core'
const description = 'Built with Next.js and Firestore for Goldlabel Apps Ltd.'
const image = '/jpg/work.jpg'
const url = 'https://goldlabel.pro'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={"#C09F52"} />
        <link rel="icon" href="/svg/favicon.svg" type="image/x-icon" />
        <link rel="shortcut icon" href="/svg/favicon.svg" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/png/iOS.png`}
        />
      </head>
      <body>
        <div id="goldlabel">
          <h1>APPLY MUI</h1>
          {children}            
        </div>
      </body>
    </html>
  );
}
