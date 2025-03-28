import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type MarkdownMeta = {
  title: string;
  description: string;
  image?: string;
  order?: number;
  slug: string;
};

export type MarkdownPage = {
  meta: MarkdownMeta;
  content: string;
};

const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown');

export function getAllMarkdown(folder: string): MarkdownPage[] {
  const dir = path.join(MARKDOWN_ROOT, folder);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, '');

      return {
        meta: {
          ...(data as Omit<MarkdownMeta, 'slug'>),
          slug,
        },
        content,
      };
    })
    .sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0));
}

export function getMarkdownBySlug(folder: string, slug: string): MarkdownPage | null {
  const filePath = path.join(MARKDOWN_ROOT, folder, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    meta: {
      ...(data as Omit<MarkdownMeta, 'slug'>),
      slug,
    },
    content,
  };
}
