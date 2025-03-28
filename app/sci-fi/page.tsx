import Link from 'next/link';
import { getAllMarkdown } from '#/lib/loadMarkdown';

export const metadata = {
  title: 'Science Fiction',
  description: '',
};

export default function IndexPage() {
  const pages = getAllMarkdown("sci-fi");

  return (
    <main className="max-w-6xl mx-auto">
      <div className="grid">
        {pages.map(({ meta }) => (
          <Link key={meta.slug} href={`/apps/${meta.slug}`}>
            <div className="border rounded-md p-6 hover:shadow-md transition cursor-pointer bg-zinc-100 dark:bg-zinc-800">
              <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
                {meta.title}
              </h2>
              <p className="text-sm text-black dark:text-zinc-300">
                {meta.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
