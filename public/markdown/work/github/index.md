---
order: 10
title: GitHub
description: Critical to our process
slug: /work/github
icon: github
image: /png/javascript.png
tags: github, process
github: https://github.com/javascript-pro/core/issues/76
---

We use GitHub for everything. Including [project management](https://github.com/javascript-pro/core/issues/76). Most of the communication done between us and our clients during development is done through GitHub in the form of comments, pull resuests, reviews and so forth

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



```typescript
export type TPhoto = {
    id: string;
    sizes?: {
        orig: {
            src: string;
            width: number;
            height: nbumber;
        }
    }
}
```