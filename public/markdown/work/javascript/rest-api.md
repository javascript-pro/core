---
order: 50
title: REST API
description: A real-world REST API powered by Next.js, integrating with the Flickr platform to serve media assets as structured JSON.
slug: /work/rest-api
icon: javascript
image: /png/javascript.png
tags: JavaScript, Node, Next.js, API, REST API, Flickr
github: https://github.com/javascript-pro/core/tree/main/gl-core/cartridges/Flickr
api: https://goldlabel.pro/api/gl-api/flickr?album=72177720326317140
---

## REST API

> Cartridge: [Flickr](/free/flickr)

This is a real-world backend endpoint. It powers real UI components. You can view the code on [GitHub](https://github.com/javascript-pro/core/blob/main/app/api/gl-api/flickr/route.ts) or see it in action on [Goldlabel API](https://goldlabel.pro/api/gl-api/flickr?album=72177720326317140).

This REST API demonstrates how we use **Next.js App Router**, **Edge-compatible server functions**, and a mature external service (Flickr) to expose real-world photo data as structured JSON. It’s built as part of our Goldlabel Core framework and serves two primary use cases:

- Fetch a **single photo** with all available sizes and metadata
- Fetch an **entire album** including thumbnails, metadata, and geo-coordinates

### Why Flickr?

Flickr may not be trendy, but it is stable. With over **3000 of our photos** archived there, it functions as a **free, reliable CDN** — complete with metadata, licensing info, and geo-tags. Their API is old-school XML/REST, but rock solid. This integration wraps that API in a modern JSON layer for consumption across frontend apps.

### Key Features

- **Server-side caching** with TTL to reduce API calls
- **Dual endpoints**: `?photo=ID` and `?album=ID`
- Extracts and formats:
  - Title, description
  - Image sizes (original, large, medium, small, thumbnail)
  - Timestamps and coordinates
  - Raw tags for classification
- **Fallback messages** and **friendly error handling**
- Deployed and live at [goldlabel.pro/api/gl-api/flickr](https://goldlabel.pro/api/gl-api/flickr?album=72177720326317140)

### Example Request

```bash
GET /api/gl-api/flickr?album=72177720326317140
```

Returns:

- `meta`: Album title, description, cover photo, total count
- `photos[]`: List of photo objects with size variants and metadata

Or request a single photo:

```bash
GET /api/gl-api/flickr?photo=52979698224
```

Returns:

- `flickrUrl`, `title`, `description`, `tags`, `sizes`, `lat/lng`

### Skills

- Connect with third-party APIs using API keys securely
- Build modern REST endpoints with cache and conditional logic
- Clean and transform data for frontend consumption
- Write production-quality error responses and logging
- Work with both legacy APIs and modern frameworks
