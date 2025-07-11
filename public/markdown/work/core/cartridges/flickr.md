---
order: 129
title: Flickr Photo Cartridge
description: React component which uses Next.js's App Router API to safely connect to the Flickr API and manage all the information needed to create a UI
tags: free, cartridge
slug: /work/core/cartridges/flickr
icon: flickr
image: /png/cartridges/flickr.png
api: /api/gl-api/flickr?album=72177720326317140
github: https://github.com/javascript-pro/core/blob/main/app/api/gl-api/flickr/route.ts
---

## What does the Flickr Cartridge do?

It provides a React component called <Flickr /> which interacts with Next.js's App Router API layer. This safely connects to Flickr and returns all the information the component needs to create user interface for those photos

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
