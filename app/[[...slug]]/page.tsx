import React from 'react';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import { loadMarkdown, getMarkdownTree } from '../../lib/loadMarkdown';
import { FolderPage, FilePage, Sitemap } from '../../goldlabel';
import { getFeatured } from '../../lib/getFeatured';
import { Uberedux } from '../../goldlabel/cartridges/Uberedux';
// import { GoodFit } from '../../goldlabel/products/GoodFit';

async function getPageTitle(slugPath: string): Promise<string> {
  const defaultTitle = 'Goldlabel';

  if (slugPath === '/sitemap') return 'Sitemap';
  if (slugPath === '/uberedux') return 'Uberedux';
  if (slugPath === '/work/products/speak-write') return 'SpeakWrite';
  if (slugPath === '/work/products/good-fit') return 'GoodFit';

  const markdown = await loadMarkdown(slugPath);
  if (markdown && markdown.frontmatter.title) {
    return `${markdown.frontmatter.title}. ${markdown.frontmatter.description}`;
  }

  const indexMarkdown = await loadMarkdown(path.join(slugPath, 'index'));
  if (indexMarkdown?.frontmatter.title) {
    return `${indexMarkdown.frontmatter.title}. ${indexMarkdown.frontmatter.description}`;
  }

  return defaultTitle;
}

// Generate dynamic metadata

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slugArray = params?.slug ?? [];
  const slugPath = '/' + slugArray.join('/');

  const title = await getPageTitle(slugPath);

  return {
    title,
    description: 'Goldlabel',
    openGraph: {
      title,
      description:
        'We build and ship modern web apps for clients who need real results — fast',
      url: `https://goldlabel.pro${slugPath}`,
      siteName: 'Goldlabel',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description:
        'We build and ship modern web apps for clients who need real results — fast',
    },
  };
}

export default async function CatchAllPage({ params }: any) {
  const slugArray = params?.slug ?? [];
  const slugPath = '/' + slugArray.join('/');

  const navPath = path.join(process.cwd(), 'public/globalNav.json');
  let globalNav = null;

  try {
    const navRaw = await fs.readFile(navPath, 'utf-8');
    globalNav = JSON.parse(navRaw);
  } catch (err) {
    console.error('Loading globalNav.json Failed:', err);
  }

  if (slugPath === '/sitemap')
    return <Sitemap globalNav={globalNav} openTopLevelByDefault={1} />;
  if (slugPath === '/uberedux') return <Uberedux />;
  const markdown = await loadMarkdown(slugPath);
  const featured = await getFeatured();
  // if (slugPath === '/work/products/good-fit') {
  //   return <GoodFit />;
  // }

  if (markdown) {
    return (
      <FilePage featured={featured} content={markdown} globalNav={globalNav} />
    );
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
          tree={tree}
          frontmatter={indexMarkdown?.frontmatter || null}
          content={indexMarkdown?.content || null}
          globalNav={globalNav as any}
        />
      );
    }
  } catch {
    console.warn('This is _not_ a folder');
  }

  return notFound();
}
