// app/[[...slug]]/page.tsx
import React from 'react';
import path from 'path';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import { loadMarkdown, getMarkdownTree } from '#/lib/loadMarkdown';
import { FolderPage, FilePage, Sitemap } from '#/goldlabel';
import { getFeatured } from '../../lib/getFeatured';
import { Uberedux } from '../../goldlabel/features/Uberedux';
import { GoodFit } from '../../goldlabel/products/GoodFit';
import { SpeakWrite } from '../../goldlabel/products/SpeakWrite';
import type { Metadata } from 'next';

// Helper function to get page title dynamically
async function getPageTitle(slugPath: string): Promise<string> {
  const defaultTitle = 'Goldlabel Core';
  
  if (slugPath === '/sitemap') return 'Sitemap | Goldlabel Core';
  if (slugPath === '/uberedux') return 'Uberedux | Goldlabel Core';
  if (slugPath === '/work/products/speak-write') return 'SpeakWrite | Goldlabel Core';
  if (slugPath === '/work/products/good-fit') return 'GoodFit | Goldlabel Core';

  const markdown = await loadMarkdown(slugPath);
  if (markdown && markdown.frontmatter.title) {
    return `${markdown.frontmatter.title} | Goldlabel Core`;
  }

  // Handle folder index page
  const indexMarkdown = await loadMarkdown(path.join(slugPath, 'index'));
  if (indexMarkdown?.frontmatter.title) {
    return `${indexMarkdown.frontmatter.title} | Goldlabel Core`;
  }

  // Default fallback
  return defaultTitle;
}

// Generate dynamic metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slugArray = params?.slug ?? [];
  const slugPath = '/' + slugArray.join('/');

  const title = await getPageTitle(slugPath);

  return {
    title,
    description: 'Goldlabel Core | High-performance Next.js app',
    openGraph: {
      title,
      description: 'Explore Goldlabel Core products and content.',
      url: `https://goldlabel.pro${slugPath}`,
      siteName: 'Goldlabel Core',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: 'Explore Goldlabel Core products and content.',
    },
  };
}

// Main component unchanged
export default async function CatchAllPage({ params }: any) {
  const slugArray = params?.slug ?? [];
  const slugPath = '/' + slugArray.join('/');

  // Load global nav
  const navPath = path.join(process.cwd(), 'public/globalNav.json');
  let globalNav = null;
  try {
    const navRaw = await fs.readFile(navPath, 'utf-8');
    globalNav = JSON.parse(navRaw);
  } catch (err) {
    console.error('Failed to load globalNav.json:', err);
  }

  if (slugPath === '/sitemap') return <Sitemap globalNav={globalNav} openTopLevelByDefault={10} />;
  if (slugPath === '/uberedux') return <Uberedux />;
  if (slugPath === '/work/products/speak-write') return <SpeakWrite />;

  const markdown = await loadMarkdown(slugPath);
  const featured = await getFeatured();

  if (slugPath === '/work/products/good-fit') return <GoodFit markdown={markdown} />;

  if (markdown) {
    return <FilePage featured={featured} content={markdown} globalNav={globalNav} />;
  }

  const folderPath = path.join(process.cwd(), 'public/markdown', ...slugArray);
  try {
    const stat = await fs.stat(folderPath);
    if (stat.isDirectory()) {
      const section = slugArray.join('/');
      const tree = await getMarkdownTree(section);
      const indexMarkdown = await loadMarkdown(path.join(slugPath, 'index'));
      return (
        <FolderPage
          featured={featured}
          section={section}
          tree={tree}
          frontmatter={indexMarkdown?.frontmatter || null}
          content={indexMarkdown?.content || null}
          globalNav={globalNav}
        />
      );
    }
  } catch {
    // not a folder
  }

  return notFound();
}
