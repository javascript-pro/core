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

export type NavNode = {
  title?: string;
  slug?: string;
  children?: NavNode[];
};

function flattenNav(node: any, allSlugs: string[] = []): string[] {
  if (node.slug) {
    const cleaned = node.slug.replace(/^\/+/, '').replace(/\/+$/, '');
    allSlugs.push(cleaned);
  }
  if (node.children?.length) {
    node.children.forEach((child: any) => flattenNav(child, allSlugs));
  }
  return allSlugs;
}

function renderNav(node: any, depth = 0): React.ReactNode {
  if (node.slug === '' || node.slug === '/') {
    return (
      <React.Fragment key={`${node.slug}_${depth}`}>
        {node.children?.length ? (
          <>{node.children.map((child: any) => renderNav(child, depth))}</>
        ) : null}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment key={`nav_${node.slug}_${depth}`}>
      {node.slug && (
        <div key={`slug_${node.slug}`}>
          <Link className="gl-link" href={`/${node.slug}`}>
            {node.title}
          </Link>
        </div>
      )}
      {node.children?.length ? (
        <div key={`child_${node.slug}_${depth}`}>
          {node.children.map((child: any) => renderNav(child, depth + 1))}
        </div>
      ) : null}
    </React.Fragment>
  );
}

function findNavItem(slugPath: string, node: any): any | null {
  if (node.slug === slugPath) return node;
  if (node.children?.length) {
    for (const child of node.children) {
      const found = findNavItem(slugPath, child);
      if (found) return found;
    }
  }
  return null;
}

function navToMarkdown(node: NavNode, depth = 0): string {
  const lines: string[] = [];
  const isRoot = !node.slug || node.slug === '' || node.slug === '/';
  const pad = '  '.repeat(depth);

  if (!isRoot && node.slug) {
    const clean = node.slug.replace(/^\/+|\/+$/g, '');
    const label = node.title ?? clean;
    lines.push(`${pad}- [${label}](/${clean})`);
  }

  if (node.children?.length) {
    const nextDepth = isRoot ? depth : depth + 1;
    for (const child of node.children) {
      lines.push(navToMarkdown(child, nextDepth));
    }
  }

  return lines.join('\n');
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

// --- ✅ FIXED: Await params in metadata as well ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join('/') : '';

  const frontmatter = await loadFrontmatter(slugPath);
  const app = 'Goldlabel';

  const is404 = !frontmatter?.title;
  const pageTitle =
    frontmatter.title === 'Home' ? 'Goldlabel' : frontmatter.title;

  const title = is404
    ? 'Goldlabel'
    : `${pageTitle}${
        frontmatter.description ? `. ${frontmatter.description}` : ''
      }`;

  const description = is404 ? '' : frontmatter.description || '';
  const img = frontmatter.image || '/png/og.png';
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
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

// --- ✅ FIXED: Await params before using .slug ---
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join('/') : '';

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

  // 👉 Default 404 markdown
  let content = `> Sorry, we couldn't find the page you were looking for.  
  👉 [Home](/?reboot)`;
  let frontmatter: any = {
    icon: 'goldlabel',
    title: 'Bad panda',
    description: 'Page not found',
    image: '/png/og.png',
  };
  let isIndex = false;
  let is404 = true;

  for (const { filePath, isIndex: indexFlag } of tryPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        content = parsed.content;
        frontmatter = parsed.data;
        isIndex = indexFlag;
        is404 = false;
        break;
      }
    } catch (error) {
      console.error('Failed to load markdown for', slugPath, error);
    }
  }

  const navItem = findNavItem(slugPath, globalNav[0]);
  const title = navItem?.title || 'Bad panda';
  const ogImage = frontmatter.image || '/png/og.png';

  if (is404) {
    const listMarkdown = navToMarkdown(globalNav[0] as NavNode);
    content += `\n\n${listMarkdown}\n`;
  }

  return (
    <Core frontmatter={{ ...frontmatter, isIndex }} body={content}>
      <div id="core-ssg" className="gl">
        <div className="gl-wrap">
          <header id="gl-header">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Image
                src="/svg/favicon.svg"
                alt={title}
                width={50}
                height={50}
              />
            </Link>

            <Link href="/" style={{ textDecoration: 'none' }}>
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
