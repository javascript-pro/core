import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import globalNav from '../../public/globalNav.json';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface Params {
  slug?: string[];
}

function flattenNav(node: any, allSlugs: string[] = []): string[] {
  if (node.slug) {
    allSlugs.push(node.slug);
  }
  if (node.children && node.children.length > 0) {
    node.children.forEach((child: any) => flattenNav(child, allSlugs));
  }
  return allSlugs;
}

function renderNav(node: any): React.ReactNode {
  return (
    <ul>
      {node.slug && (
        <li key={`slug_${node.slug}`}>
          <Link href={`/${node.slug}`}>{node.title}</Link>
        </li>
      )}
      {node.children && node.children.length > 0 && (
        <li>{node.children.map((child: any) => renderNav(child))}</li>
      )}
    </ul>
  );
}

function findNavItem(slugPath: string, node: any): any | null {
  if (node.slug === slugPath) return node;
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const found = findNavItem(slugPath, child);
      if (found) return found;
    }
  }
  return null;
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = flattenNav(globalNav[0]);

  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export default async function Page({ params }: { params: any }) {
  const slugPath = params.slug ? params.slug.join('/') : '';

  const tryPaths = [
    path.join(process.cwd(), 'public', 'markdown', `${slugPath}.md`),
    path.join(process.cwd(), 'public', 'markdown', slugPath, 'index.md'),
  ];

  let content = 'Page not found';
  let frontmatter: any = {};

  for (const filePath of tryPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        content = parsed.content;
        frontmatter = parsed.data;
        break;
      }
    } catch (error) {
      console.error('Failed to load markdown for', slugPath, error);
    }
  }

  const navItem = findNavItem(slugPath, globalNav[0]);

  const title = navItem?.title || 'Goldlabel';
  const description = navItem?.excerpt || '';
  const ogImage = frontmatter.image || '/png/test.png';
  const url = `https://goldlabel.pro/${slugPath}`;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="canonical" href={url} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <aside
        style={{
          width: '320px',
          padding: '1rem',
          borderRight: '1px solid #ccc',
        }}
      >
        {renderNav(globalNav[0])}
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        <article>{content}</article>
      </main>
    </div>
  );
}
