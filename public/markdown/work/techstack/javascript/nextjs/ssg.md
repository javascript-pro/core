---
order: 30
title: Static Site Generation (SSG)
description:
slug: /work/techstack/javascript/nextjs/ssg
icon: js
image: /png/3rdParty/next_og.png
tags: SSG, JavaScript, Node, Next.js, API, REST API, React
---

> Next.js’s Static Site Generation (SSG) means the HTML is generated **at build time**, not on each request. When the site is deployed, all pages are already pre-rendered as static HTML files and can be served instantly from a CDN.

### What it solves

* **Ultra-fast delivery**: Static HTML served directly from the edge means extremely low latency.
* **Scalability**: No server work per request; traffic spikes cost nothing.
* **Cost reduction**: Static pages don’t require server compute.
* **Stable content**: Perfect for content that doesn't change often, such as documentation, blogs, marketing pages.

### Pros

* **Fastest possible performance**: Zero server rendering on request, instant TTFB.
* **Excellent SEO**: Fully rendered at build time, no hydration delay for critical content.
* **Cheap to host**: Works perfectly with static hosting/CDN platforms.
* **Predictable builds**: Output is fixed and can be versioned.

### Cons

* **Not suited for frequently changing data**: Requires a rebuild when content updates.
* **Long builds at scale**: Thousands of pages can slow down CI.
* **No per-request logic**: You can’t use request-specific data (cookies, auth, A/B) at build time.
* **Stale content risk**: Without rebuilds or ISR, the site can drift out of sync with live data.

### How easy is it to use?

Very straightforward. In the App Router, any page that doesn’t fetch dynamic data automatically becomes SSG. To force static generation:

```ts
// app/blog/[slug]/page.tsx
export const dynamic = "force-static";

export default async function Page() {
  const post = await getPostFromCMS(); // must be static or cached
  return <article>{post.content}</article>;
}
```

You can also use `fetch()` with caching:

```ts
await fetch("https://api.example.com/posts", { cache: "force-cache" });
```

In the older Pages Router:

```ts
export async function getStaticProps() {
  const posts = await getAllPosts();
  return { props: { posts } };
}
```

### When to use SSG in Goldlabel Core

Use SSG when:

* The content comes from Markdown files (your default pattern).
* Pages rarely change (docs, recipes, writing, static guides).
* You want top-tier speed with no server dependency.
* You plan to distribute pages globally via CDN.

Avoid SSG when:

* You need fresh data on every request.
* User-specific state affects output (auth, cookies).
* A CMS update must appear instantly without rebuilds.

In Goldlabel Core, most content pages should stay SSG: Markdown, guides, documentation, and static marketing pages. Only interactive sections (paywall checks, pings, admin tools) need dynamic rendering