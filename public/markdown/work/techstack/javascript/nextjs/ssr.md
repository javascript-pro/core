---
order: 20
title: Server-Side Rendering (SSR)
description:
slug: /work/techstack/javascript/nextjs/ssr
icon: js
image: /png/3rdParty/next_og.png
tags: SSR, JavaScript, Node, Next.js, API, REST API, React
---

> Server-Side Rendering (SSR) in Next.js means the HTML for a page is generated on the server on every request. The browser receives a fully formed page, then React hydrates it.

## What it solves

- Fast first paint / SEO: Search engines see real HTML, not an empty shell waiting for client JS.
- Fresh data: Each request can fetch up-to-date backend data without exposing secrets to the browser.
- Consistent rendering: Removes hydration mismatches that happen when client code relies on browser-only APIs.

## Pros

- Great SEO: Critical content exists before hydration.
- Secure data access: You can call private APIs or databases server-side.
- No client fetch waterfalls: HTML ships with ready data, reducing layout shift.
- Dynamic logic: User-specific pages (cookies, auth, A/B) are straightforward.

## Cons

- Slower TTFB: Rendering on every request can add latency, especially with heavy queries.
- Server load: Each page hit runs your fetch/render pipeline. Scaling matters.
- No CDN full caching: Pages can't be cached statically unless you choose clever cache-control rules.
- More complex debugging: Errors can occur server-side before React even loads.

## How easy is it to use?

Very easy. For the App Router, any component in app/ becomes a server component by default. To force SSR with data:

```
// app/dashboard/page.tsx
export const dynamic = "force-dynamic"; // or remove to keep default SSR

export default async function Page() {
  const data = await fetch("https://api.example.com/data", {
    cache: "no-store" // ensures SSR on each request
  }).then(r => r.json());

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## When to use SSR

Use SSR when

- A page needs fresh data on every visit (pings, analytics, CMS live data).
- A user-specific state (cookies, auth session) affects the output.
- The page's SEO matters.

Avoid SSR when

- Content is static.
- Data changes rarely (prefer SSG or ISR).
- You want CDN-level caching.
