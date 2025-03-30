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
    images: ['/alexander-andrews-brAkTCdnhW8-unsplash.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goldlabel Core',
    description: 'The public-facing site for Goldlabel Apps Ltd.',
    images: ['/alexander-andrews-brAkTCdnhW8-unsplash.jpg'],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
