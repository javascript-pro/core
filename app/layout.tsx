import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import { GlobalNav } from '#/ui/global-nav';
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
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="rounded-lg p-px">
              <div className="rounded-lg">
                <AddressBar />
              </div>
            </div>
            <div className="rounded-lg p-px">
              <div className="rounded-lg p-3.5 lg:p-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
