// app/company/page.tsx

import Link from 'next/link';
import { getAllMarkdown } from '#/lib/loadMarkdown';

export const metadata = {
  title: 'Company',
  description: '',
};

export default async function IndexPage() {
  const pages = await getAllMarkdown("company");

  return (
    <main className="max-w-6xl mx-auto">
      <div className="grid">
        {pages.map(({ meta }) => (
          <Link key={meta.slug} href={`/company/${meta.slug}`}>
            <div className="border rounded-md p-6 hover:shadow-md transition cursor-pointer">
              <h2 className="text-lg font-semibold mb-2">
                {meta.title}
              </h2>
              <p className="text-sm">
                {meta.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
