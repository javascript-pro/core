import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import globalNav from '../../public/globalNav.json';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import {
  CssBaseline,
} from '@mui/material';

export interface Params {
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
      console.error('Failed to load markdown frontmatter for', slugPath, error);
    }
  }
  return {};
}

export async function generateMetadata({ params }: { params: any }) {
  const slugPath = params.slug ? params.slug.join('/') : '';
  const navItem = findNavItem(slugPath, globalNav[0]);
  const frontmatter = await loadFrontmatter(slugPath);

  const app = "Goldlabel";
  const title = navItem?.title || app;
  const description = navItem?.excerpt || 'We build and ship modern web apps for clients who need real results — fast';
  const img = frontmatter.image || '/png/test.png';
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

  let body = 'Page not found';
  let frontmatter: any = {};

  for (const filePath of tryPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        body = parsed.content;
        frontmatter = parsed.data;
        break;
      }
    } catch (error) {
      console.error('Failed to load markdown for', slugPath, error);
    }
  }

  const navItem = findNavItem(slugPath, globalNav[0]);

  const title = navItem?.title || 'Goldlabel';
  const ogImage = frontmatter.image || '/png/test.png';

  return (
    <>
      <CssBaseline />

      <div id="ssg"
      style={{ 
        display: 'flex', 
        minHeight: '100vh',
      }}>
        
      <aside
        style={{
          width: '280px',
        }}
      >
        {renderNav(globalNav[0])}
      </aside>

      <main style={{ flex: 1, padding: '2rem' }}>
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
                borderRadius: '8px' 
              }}
            />
        )}
        <article>
          <ReactMarkdown>{body}</ReactMarkdown>
        </article>
      </main>
    </div>
    </>
    
  );
}
