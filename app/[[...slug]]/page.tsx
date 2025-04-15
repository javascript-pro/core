// app/[[...slug]]/page.tsx

import path from 'path';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import { loadMarkdown, getMarkdownTree } from '#/lib/loadMarkdown';
import { FolderPage, FilePage, Sitemap } from '#/goldlabel';
import { getFeatured } from '../../lib/getFeatured';
import { 
  Uberedux,
} from '../../goldlabel/features/Uberedux'

export default async function CatchAllPage({ params }: any) {
  const slugArray = Array.isArray(params?.slug) ? params.slug : [];
  const slugPath = '/' + slugArray.join('/');

  const navPath = path.join(process.cwd(), 'public/globalNav.json');
  let globalNav = null;
  try {
    const navRaw = await fs.readFile(navPath, 'utf-8');
    globalNav = JSON.parse(navRaw);
  } catch (err) {
    console.error('Failed to load globalNav.json:', err);
  }

  if (slugPath === '/sitemap') {
    return <Sitemap globalNav={globalNav} openTopLevelByDefault={10} />;
  }

  if (slugPath === '/uberedux') {
    return <Uberedux />
  }

  const markdown = await loadMarkdown(slugPath);
  const featured = await getFeatured();

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
          section={section}
          tree={tree}
          frontmatter={indexMarkdown?.frontmatter || null}
          content={indexMarkdown?.content || null}
          globalNav={globalNav}
        />
      );
    }
  } catch {
    // Not a folder
  }

  return notFound();
}
