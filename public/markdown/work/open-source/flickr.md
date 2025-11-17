---
title: Flickr
slug: /work/open-source/flickr
description: React component to load and display the latest Flickr photos with clean UI
order: 30
icon: flickr
tags: flickr, free, api, REST, Next.js
image: /jpg/other/Opengraph-template.jpg
---

[GitHub url="https://github.com/javascript-pro/core/tree/master/gl-core/cartridges/Flickr" label="Flickr"]

### Flickr Photo Cartridge

A React component for clean, fast-loading image galleries. Provides an easy way to display recent photos from a Flickr account. It connects to a server-side API route in your Next.js app that securely fetches Flickr data using your API key.

It provides a React component called <Flickr /> which interacts with Next.js's App Router API layer. This safely connects to Flickr and returns all the information the component needs to create user interface for those photos

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

A typical JSON Object might describe a Photo shown from the Flickr service

```javascript
{
    id={"xxxx-yyyy-zzzz"}
    flickrId="54528014218" // Flickr's id
    flickrURL="https://www.flickr.com/photos/listingslab/54528014218" // vital
    title="trucks", // If any
    description="big boys camping", // If any
    time=100000000 // Unix epoh
    meta="tags, etc"
    lat={0}
    lng={0}
    sizes={
        orig: {
            src="https://" // use flickr as CDN
            width={1200}
            height={620}
        },
        small: {
            src="https://" // use flickr as CDN
            width={300}
            height={115}
        }
    }
}
```
