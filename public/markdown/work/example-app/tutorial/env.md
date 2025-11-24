---
order: 6
slug: /work/example-app/tutorial/env
title: .env
description: Environment Variables
icon: examples
image: /png/3rdParty/github_og.png
---

> How environment files behave in a Next.js environment, including the practical traps that appear during development.

Environment files in a Next.js project hold configuration values that shouldn’t live in the codebase. They act as a boundary between your application and the environment it runs in. Each deployment—local, staging, production—can load different values without changing code.

#### What they are

They’re simple key-value files, typically named `.env.local`, `.env.development`, `.env.production`, or `.env`. Next.js loads them automatically and exposes them at build time. Values can include API keys, secrets, service URLs, feature flags, or anything that changes per environment.

#### Why we use them

They let you deploy the same code to different environments with different configuration. They also prevent accidental exposure of secrets in Git, because these files stay out of version control.

#### Problems they cause

The main issues come from misunderstanding how Next.js loads them. They are evaluated at build time, not at runtime, so changing a value requires a rebuild. Another common mistake is forgetting that server and client bundles are separate—only explicitly “public” variables are exposed to the browser. This leads to mismatched values, broken behaviour, or missing secrets. On some hosting platforms (including Vercel) environment values must be explicitly set, not just pushed with the repository.

Example of a simple Next.js environment file

```
# server-only – not available in the browser
DATABASE_URL="postgres://user:pass@localhost/db"
FIREBASE_ADMIN_KEY="really-secret-key"

# browser-exposed
NEXT_PUBLIC_API_BASE="https://api.example.com"
NEXT_PUBLIC_MAPBOX_TOKEN="pk.abc123"
```

#### NEXT_PUBLIC vs non-public

Next.js strips everything from the browser bundle unless the key starts with `NEXT_PUBLIC_`. That prefix is the gatekeeper. Anything without it is server-side only and should never be referenced in client code. A server variable accidentally used on the client will show up as `undefined` and usually trigger a crash. Conversely, a secret mistakenly published with the prefix becomes visible in the browser’s dev tools, which is a security risk.
