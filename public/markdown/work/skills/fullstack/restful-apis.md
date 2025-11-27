---
order: 70
title: RESTful APIs
slug: /work/skills/fullstack/restful-apis
description: The backbone of web communication for two decades
icon: techstack
image: /png/3rdParty/next_og.png
tags: free, api, restful, endpoints, next, nextjs, flickr
newContent: true
---

> Effective when it is structured clearly, documented properly, and resilient under real-world load

REST has been the backbone of web communication for two decades. Despite alternatives such as GraphQL, REST remains the dominant standard. The challenge has never been the concept itself, but the implementation. A REST API only becomes effective when it is structured clearly, documented properly, and resilient under real-world load — qualities that many APIs fail to achieve.

[GitHub url="https://github.com/javascript-pro/example-app/tree/master/app/api" label="/api"]

Next.js provides a streamlined API layer that fits naturally into the App Router. Endpoints live alongside the rest of the application, follow the same routing conventions, and require no additional server framework. For full-stack React development, this creates a unified environment with minimal overhead.

## Flickr API Example

The Flickr integration in this project demonstrates the pattern clearly. The API layer handles

- OAuth-based authentication with Flickr
- Photo and album lookups
- Response caching in Firestore to minimise API calls and avoid rate limits
- Automatic expiry and refresh
- A client-side CRUD component that surfaces albums, photos and metadata

The client communicates only with the internal API, never with Flickr directly. This keeps tokens secure, ensures consistent responses, and benefits from the Firestore cache. The pattern is reusable across the Goldlabel ecosystem: define an endpoint in /app/api/..., add caching where appropriate, and pair it with a simple CRUD UI on the client. The result is a stable integration without the overhead of maintaining a separate backend service

## [goldlabel.pro/api/flickr](https://goldlabel.pro/api/flickr)

```javascript
{
    route: "/gl-api/flickr",
    queryVars: [
        "album", // single album id
        "albums", // comma seperated list of albums
        "photo", // single photo id
        "photos", // comma seperated list of photos
    ],
    examples: [
        {
            message: "Gets latest album with all photos",
            route: '/api/flickr',
        },
        {
            message: "Gets a single album by id",
            route:'/api/flickr/?album=72177720324245676',
        },
        {
            message: "Gets a photo album by id",
            route: '/api/flickr/?photo=54534952165',
        },
    ]
},

```
