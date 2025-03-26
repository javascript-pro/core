// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goldlabel Apps',
  description: 'A clean foundation for custom, professional web apps.',
};

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Goldlabel Apps</h1>
      <p className="text-lg text-gray-700">
        This is a clean slate. We've archived all the boilerplate examples under{' '}
        <a href="/boilerplate" className="underline text-blue-600">
          /boilerplate
        </a>{' '}
        so we can focus on building the real product.
      </p>
    </main>
  );
}
