
import { notFound } from 'next/navigation';
import { getAllMarkdown, getMarkdownBySlug } from '#/lib/loadMarkdown';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const apps = getAllMarkdown();
  return apps.map(({ meta }) => ({
    slug: meta.slug,
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = getMarkdownBySlug(params.slug);
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

export default function AppPage({ params }: any) {
  const data = getMarkdownBySlug(params.slug);

  if (!data) {
    notFound();
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-4 prose dark:prose-invert">
      <h1>{data.meta.title}</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-4">{data.meta.description}</p>
      <hr />
      <article dangerouslySetInnerHTML={{ __html: data.content }} />
    </main>
  );
}
