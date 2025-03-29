// app/sci-fi/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getAllMarkdown, getMarkdownBySlug, getHTMLBySlug } from '#/lib/loadMarkdown';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const pages = await getAllMarkdown("sci-fi");
  return pages.map(({ meta }) => ({
    slug: meta.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const data = await getMarkdownBySlug("sci-fi", params.slug);
  const html = await getHTMLBySlug("sci-fi", params.slug); // <-- fixed from "company"

  if (!data) {
    return {
      title: 'Not found',
      description: 'This page could not be found.',
    };
  }

  return {
    title: data.meta.title,
    description: data.meta.description,
    openGraph: {
      images: data.meta.image ? [data.meta.image] : [],
    },
  };
}

export default async function SciFiPage(
  { params }: { params: { slug: string } }
) {
  const data = await getMarkdownBySlug("sci-fi", params.slug);
  const html = await getHTMLBySlug("sci-fi", params.slug);

  if (!data) {
    notFound();
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-medium mb-4">
        {data.meta.title}
      </h1>
      <p className="mb-8">
        {data.meta.description}
      </p>
      <hr className="border-neutral-300 dark:border-neutral-700 mb-8" />
      <article
        className="space-y-6"
        dangerouslySetInnerHTML={{ __html: html as string }}
      />
    </main>
  );
}
