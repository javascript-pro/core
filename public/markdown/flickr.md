---
title: Flickr Photo Cartridge
slug: /flickr
description: React component to load and display the latest Flickr photos with clean UI
order: 3
icon: flickr
tags: flickr, free, api, REST, Next.js
image: /png/n64/flickr.png
---

### Flickr Photo Cartridge

A React component for clean, fast-loading image galleries. Provides an easy way to display recent photos from a Flickr account. It connects to a server-side API route in your Next.js app that securely fetches Flickr data using your API key.

The component is designed to work within the App Router pattern and integrate seamlessly with MUI.

It gives you:

- Real-time access to the latest Flickr uploads
- Automatic formatting of metadata (title, date, tags)
- Skeleton loading states and graceful error handling
- Simple styling using Material UI

### API Endpoint

#### `/gl-api/flickr/latest`

Returns a JSON array of the latest 100 photos uploaded to your configured Flickr account, including:

- `title`
- `description`
- `image URLs` (thumbnail, medium, full)
- `upload date`
- `photo ID` and `owner`
- Any relevant `tags`

This route is statically typed and ready to use from both client and server contexts.

> You can customize the layout and image rendering through the options prop.

- Support for albums and sets
- Lightbox view
- Lazy loading for infinite scroll

### Example Usage

```tsx
'use client';
import { FlickrAlbum } from 'gl-core';

export default function MyComponent() {
  return <FlickrAlbum album="72177720327572144" />;
}
```
