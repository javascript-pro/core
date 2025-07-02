// core/app/[[...slug]]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import globalNav from '../../public/globalNav.json';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Core, Nav } from '../../gl-core';

export type TPage = {
  slug?: string[];
};

function flattenNav(node: any, allSlugs: string[] = []): string[] {
  if (node.slug) {
    const cleaned = node.slug.replace(/^\/+/, '').replace(/\/+$/, '');
    allSlugs.push(cleaned);
  }
  if (node.children && node.children.length > 0) {
    node.children.forEach((child: any) => flattenNav(child, allSlugs));
  }
  return allSlugs;
}

function renderNav(node: any, depth: number = 0): React.ReactNode {
  if (node.slug === '' || node.slug === '/') {
    return (
      <React.Fragment key={`${node.slug}_depth`}>
        {node.children && node.children.length > 0 && (
          <React.Fragment key={`${node.slug}_depth_2`}>
            {node.children.map((child: any) => renderNav(child, depth))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  return (
    <>
      {node.slug && (
        <div key={`slug_${node.slug}`}>
          <Link className="gl-link" href={`/${node.slug}`}>
            {node.title}
          </Link>
        </div>
      )}
      {node.children && node.children.length > 0 && (
        <div key={`or_slug_${node.slug}`}>
          {node.children.map((child: any) => renderNav(child, depth + 1))}
        </div>
      )}
    </>
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

async function loadFrontmatter(slugPath: string) {
  const tryPaths = [
    path.join(process.cwd(), 'public', 'markdown', `${slugPath}.md`),
    path.join(process.cwd(), 'public', 'markdown', slugPath, 'index.md'),
  ];

  for (const filePath of tryPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        return parsed.data;
      }
    } catch (error) {
      console.warn('catchall page error', slugPath, error);
    }
  }
  return {};
}

export async function generateMetadata({ params }: { params: any }) {
  const slugPath = params.slug ? params.slug.join('/') : '';
  const frontmatter = await loadFrontmatter(slugPath);

  const app = 'Goldlabel';

  const is404 = !frontmatter?.title;
  const title = is404
    ? 'Goldlabel'
    : `${frontmatter.title}${frontmatter.description ? `. ${frontmatter.description}` : ''}`;
  const description = is404 ? '' : frontmatter.description || '';
  const img = frontmatter.image || '/png/default.png';
  const url = `https://goldlabel.pro/${slugPath}`;

  return {
    title,
    description,
    openGraph: {
      title,
      images: [img],
      description,
      url,
      siteName: app,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: [img],
      title,
      description,
    },
  };
}

export async function generateStaticParams(): Promise<TPage[]> {
  const slugs = flattenNav(globalNav[0]);

  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export default async function Page({ params }: { params: any }) {
  const slugPath = params.slug ? params.slug.join('/') : '';

  const tryPaths = [
    {
      filePath: path.join(
        process.cwd(),
        'public',
        'markdown',
        `${slugPath}.md`,
      ),
      isIndex: false,
    },
    {
      filePath: path.join(
        process.cwd(),
        'public',
        'markdown',
        slugPath,
        'index.md',
      ),
      isIndex: true,
    },
  ];

  let content =
    '> This route is not handled by Next.js App Router,  [RESTART](/?reboot)';
  let frontmatter: any = {
    icon: 'blokey',
    title: '404, bro',
    description: '',
    image: '/png/default.png',
  };
  let isIndex = false;

  for (const { filePath, isIndex: indexFlag } of tryPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        content = parsed.content;
        frontmatter = parsed.data;
        isIndex = indexFlag;
        break;
      }
    } catch (error) {
      console.error('Failed to load markdown for', slugPath, error);
    }
  }

  const navItem = findNavItem(slugPath, globalNav[0]);
  const title = navItem?.title || 'Goldlabel';
  const ogImage = frontmatter.image || '/png/default.png';

  return (
    <Core frontmatter={{ ...frontmatter, isIndex }} body={content}>
      <div id="core-ssg" className="gl">
        {/* This is SSG content */}
        <div className="gl-wrap">
          <header id="gl-header">
            <Link href={`/`} style={{ textDecoration: 'none' }}>
              <Image
                src={'/svg/favicon.svg'}
                alt={title}
                width={50}
                height={50}
              />
            </Link>

            <Link href={`/`} style={{ textDecoration: 'none' }}>
              <h1>{title}</h1>
            </Link>
            <h2>{frontmatter.description}</h2>
          </header>

          <aside id="gl-main-menu">
            <Nav />
          </aside>

          <main id="gl-main">
            {ogImage && (
              <Image
                priority
                src={ogImage}
                alt={title}
                width={1200}
                height={630}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            )}
            <article id="gl-body">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          </main>
          <footer id="gl-footer">{renderNav(globalNav[0])}</footer>
        </div>
      </div>
    </Core>
  );
}
