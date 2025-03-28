import Link from 'next/link';
import { getAllMarkdown } from '#/lib/loadMarkdown';

export const metadata = {
  title: 'Our Apps',
  description: 'Browse the current Goldlabel apps available for preview.',
};

export default function AppsPage() {
  const apps = getAllMarkdown();

  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Available Apps</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-12">
        These apps are built with the Goldlabel framework. Click to learn more.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map(({ meta }) => (
          <Link key={meta.slug} href={`/apps/${meta.slug}`}>
            <div className="border rounded-lg p-6 hover:shadow-md transition cursor-pointer bg-white dark:bg-zinc-900">
              <h2 className="text-lg font-semibold mb-2">{meta.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{meta.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
