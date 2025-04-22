To dynamically set SEO-friendly page titles (and other metadata) in your Next.js app, you should use the built-in `generateMetadata` function provided by the Next.js App Router.

Here's how you can extend your existing `page.tsx` file with dynamic, SEO-friendly metadata:

### ✅ Step-by-Step Integration:

1. **Update your `page.tsx` file** by adding the `generateMetadata` export alongside your existing page component.

2. Dynamically create titles based on Markdown frontmatter or special cases.

Here's a complete and practical integration into your existing structure:

### 🎯 Updated `page.tsx`

Replace your existing `page.tsx` with this updated version:

```tsx
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
```

---

### 🎓 Explanation:

- **`generateMetadata`** is a Next.js App Router convention for dynamically creating SEO metadata, like page title, Open Graph tags, and descriptions.
- This implementation checks for special cases first (like your custom pages), then falls back on Markdown frontmatter (`title` field) or an index Markdown file to determine the title.
- Titles have the form `[Page Title] | Goldlabel Core`, ensuring consistent branding.
- Open Graph and Twitter metadata are included for enhanced sharing on social media.

---

### ✨ Results:

After integrating this approach, your app will dynamically generate meaningful, SEO-friendly titles:

- In the **browser chrome/tab**: Users will see descriptive page titles immediately.
- When **bookmarking pages**: Titles clearly indicate content.
- During **social sharing**: Rich previews with clear metadata will display on platforms like Facebook, Twitter, and LinkedIn.

Now, your site has a professional SEO strategy built right into its core, using Next.js’s robust metadata system.


___


We're working on Core. It's a Next.js app and we have a page.tsx which renders almost all routes /app/[[...slug]]/page.tsx. here it is

// app/[[...slug]]/page.tsx
import * as React from 'react';
import path from 'path';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import { loadMarkdown, getMarkdownTree } from '#/lib/loadMarkdown';
import { FolderPage, FilePage, Sitemap } from '#/goldlabel';
import { getFeatured } from '../../lib/getFeatured';
import { Uberedux } from '../../goldlabel/features/Uberedux';
import { GoodFit } from '../../goldlabel/products/GoodFit';
import { SpeakWrite } from '../../goldlabel/products/SpeakWrite';

export default async function CatchAllPage({ params }: any) {
  // Make sure to check for undefined and coerce to array
  const slugArray = (await params?.slug) ?? [];
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
  /* Special cases */

  if (slugPath === '/sitemap') {
    return <Sitemap globalNav={globalNav} openTopLevelByDefault={10} />;
  }

  if (slugPath === '/uberedux') {
    return <Uberedux />;
  }


  if (slugPath === '/work/products/speak-write') {
    return <SpeakWrite />;
  }

  const markdown = await loadMarkdown(slugPath);
  const featured = await getFeatured();

  if (slugPath === '/work/products/good-fit') {
    return <GoodFit markdown={markdown} />;
  }


  if (markdown) {
    return (
      <FilePage featured={featured} content={markdown} globalNav={globalNav} />
    );
  }

  // Try to load as folder
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

I want to use Next.js's great SEO flexibility to cretae dynamig page titles that get noticed in the browser chrome, bookmarks and sharing