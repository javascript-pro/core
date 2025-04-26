import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import globalNav from '../../public/globalNav.json';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import {
  Avatar,
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
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

function renderNav(node: any, depth: number = 0): React.ReactNode {
  if (node.slug === '' || node.slug === '/') {
    // Skip rendering the home route
    return (
      <>
        {node.children && node.children.length > 0 && (
          <>
            {node.children.map((child: any) => renderNav(child, depth))}
          </>
        )}
      </>
    );
  }

  return (
    <>
      {node.slug && (
        <Box key={`slug_${node.slug}`} ml={depth * 2} my={0.5}>
          <Link href={`/${node.slug}`} style={{ textDecoration: 'none' }}>
            <Typography color="black" variant={depth === 0 ? 'body1' : 'body2'}>
              {node.title}
            </Typography>
          </Link>
        </Box>
      )}
      {node.children && node.children.length > 0 && (
        <>
          {node.children.map((child: any) => renderNav(child, depth + 1))}
        </>
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
  const title = `${navItem?.title}. ${navItem?.excerpt}` || app;
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
  const description = navItem?.description || '';
  const ogImage = frontmatter.image || '/png/test.png';

  return (
    <>
      <CssBaseline />
      <Container 
        maxWidth={"md"} 
        sx={{
          mt: 3,
        }}>

        <Grid container>

          <Grid size={{
            xs: 12,
          }}>
            <header>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: 1 }}>
                  <Link href={`/`} style={{ textDecoration: 'none' }}>
                    <Avatar src={"/svg/favicon_gold.svg"} alt={"Goldlabel"} />
                  </Link>
                </Box>
                <Box sx={{ display: "block" }}>
                  <Typography component="h1" variant="h4">
                    {title}
                  </Typography>
                  <Typography component="h2" variant="body2">
                    {description}
                  </Typography>
                </Box>
              </Box>
            </header>
          </Grid>

          <Grid size={{
            xs: 12,
            sm: 7, 
            md: 8,
          }}>
            <main style={{ flex: 1 }}>
              {ogImage && (
                <Box my={2}>
                  
                  <Image
                    priority
                    src={ogImage}
                    alt={title}
                    width={1200}
                    height={630}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Box>
              )}
              <article>
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>
            </main>
          </Grid>

          <Grid size={{
            xs: 12,
            sm: 5,
            md: 4,
          }}>
            <aside>
                <Box
                  sx={{
                    m: 2
                  }}
                >
                  { renderNav(globalNav[0]) }
                </Box>
            </aside>
          </Grid>

          <Grid size={{
            xs: 12,
            sm: 7, 
            md: 8,
          }}>
            <footer>
              <Box sx={{ textAlign: 'center', py: 4, mt: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Modern web apps. Real deployments. Professional results.
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Link href="/privacy-cookies" style={{ marginRight: 16, textDecoration: 'none', color: 'inherit' }}>
                    Privacy
                  </Link>
                  <Link href="/terms" style={{ marginRight: 16, textDecoration: 'none', color: 'inherit' }}>
                    Terms
                  </Link>
                  <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Contact
                  </Link>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    © {new Date().getFullYear()} Goldlabel Apps Ltd.
                  </Typography>
                </Box>
              </Box>
            </footer>
          </Grid>

          
        </Grid>
      </Container>
    </>
  );
}
