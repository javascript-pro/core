import fs from 'fs/promises';
import path from 'path';
// import matter from 'gray-matter';

const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

const BASE_URL = 'https://goldlabel.pro';

async function getAllMarkdownSlugs(
  dir: string,
  baseSlug = '',
): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const slugs: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const childSlug = path.join(baseSlug, entry.name);
      const childSlugs = await getAllMarkdownSlugs(fullPath, childSlug);
      slugs.push(...childSlugs);
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      if (entry.name === 'index.md') {
        slugs.push(baseSlug || '/');
      } else {
        const fileSlug = path.join(baseSlug, entry.name.replace(/\.md$/, ''));
        slugs.push(fileSlug);
      }
    }
  }

  return slugs;
}

function generateSitemapXml(slugs: string[]): string {
  const urls = slugs
    .map((slug) => {
      const fullUrl = new URL(slug.replace(/\\/g, '/'), BASE_URL).href;
      return `
  <url>
    <loc>${fullUrl}</loc>
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function generateSitemap() {
  const slugs = await getAllMarkdownSlugs(MARKDOWN_ROOT);
  const xml = generateSitemapXml(slugs);
  await fs.writeFile(OUTPUT_PATH, xml);
  console.log(`✅ Generated Sitemap at /sitemap.xml`);
}
