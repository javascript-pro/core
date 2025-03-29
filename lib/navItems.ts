import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Reuse the same markdown root directory
const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown');

export type NavItem = {
  label: string;
  href: string;
};

export function getNavItems(): NavItem[] {
  const files = fs.readdirSync(MARKDOWN_ROOT);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(MARKDOWN_ROOT, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      const slug = file.replace(/\.md$/, '');
      return {
        label: data.title || slug.charAt(0).toUpperCase() + slug.slice(1),
        href: slug === 'index' ? '/' : `/${slug}`,
      };
    });
}
