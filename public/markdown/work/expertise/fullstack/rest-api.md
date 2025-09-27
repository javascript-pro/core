---
order: 10
title: REST API
slug: /work/expertise/fullstack/rest-api
description: Private keys are available
icon: api
image: https://live.staticflickr.com/65535/54801612483_31ce454c4e_b.jpg
tags: free, api
---

## Goldlabel Public API

## gl-api/flickr endpoints

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
            route: '/api/gl-api/flickr',
        },
        {
            message: "Gets a single album by id",
            route:'/api/gl-api/flickr/?album=72177720324245676',
        },
        {
            message: "Gets a photo album by id",
            route: '/api/gl-api/flickr/?photo=54534952165',
        },
    ]
},

```
