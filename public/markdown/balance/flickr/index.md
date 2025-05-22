---
order: 129
title: Flickr
description: Latest Album
slug: /balance/flickr
icon: flickr
image: /png/bouncer/bouncer.png
github: https://github.com/javascript-pro/core/blob/main/app/api/gl-api/flickr/route.ts
api: /api/gl-api/flickr
---
We take a lot of photos and have had a Flickr account for 20 years

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

## Links

- https://github.com/javascript-pro/core/issues/76
