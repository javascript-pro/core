import '#/styles/globals.css';
import { GlobalNav } from '#/components/GlobalNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Goldlabel Core',
    template: '%s | Goldlabel Core',
  },
  metadataBase: new URL('https://goldlabel.pro'),
  description: 'The public-facing site for Goldlabel Apps Ltd. Built with Next.js and Firestore.',
  openGraph: {
    title: 'Goldlabel Core',
    description: 'The public-facing site for Goldlabel Apps Ltd. Built with Next.js and Firestore.',
    images: ['/jpg/work.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goldlabel Core',
    description: 'The public-facing site for Goldlabel Apps Ltd.',
    images: ['/jpg/work.jpg'],
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
        <meta name="theme-color" content={"#C09F52"} />
        <link rel="icon" href="/svg/favicon.svg" type="image/x-icon" />
        <link rel="shortcut icon" href="/svg/favicon.svg" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/png/iOS.png`}
        />
      </head>
      <body className="overflow-y-scroll pb-36">
        <GlobalNav />
        <div className="lg:pl-72">
          <div className="mx-auto max-w-4xl">
            {children}            
          </div>
        </div>
      </body>
    </html>
  );
}
