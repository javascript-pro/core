---
order: 129
title: Flickr
description: An API that has just worked for more than 20 years
slug: /balance/flickr
icon: flickr
image: /png/test.png
github: https://github.com/javascript-pro/core/blob/main/app/api/gl-api/flickr/route.ts
api: /api/gl-api/flickr
---

## Why do we still use Flickr?

Flickr isn’t trendy. It doesn’t chase hype. But it’s survived—and there’s a reason for that. For over two decades, Flickr has offered something that’s increasingly rare: a stable, well-documented photo hosting platform with a mature API that just works. We’ve got over 3,000 photos on it, and it’s still delivering every single one.

### Flickr is a CDN

When we say CDN, we mean it in practice—not just marketing.

- _Every image has multiple sizes_ pre-generated and ready to serve
- _Global delivery_—Flickr has edge caching sorted
- _Hotlinking is allowed_—you can embed directly without worrying about rate limits
- _No fuss, no surprises_—image URLs don’t randomly expire or shift

We use Flickr as the backbone of our image delivery in many of our apps, especially those that need robust galleries, minimal overhead, and high uptime.

### The API is Mature

We’re frontend developers. We like APIs that don’t break.

Flickr’s API has barely changed in years—and that’s a good thing. It’s consistent. It’s fast. It lets us:

- Fetch albums and photos with metadata
- Grab responsive sizes for each photo
- Store all the media externally, reducing our app bundle size

It’s not bleeding edge, but it is _battle-tested_. For what we need, that’s better.

### Longevity Matters

Plenty of photo services have come and gone. Flickr’s still here.

We’ve seen developers move from Dropbox to Google Photos to private S3 buckets and back. Meanwhile, our Flickr-based galleries

We take a lot of photos and have been adding them to our Flickr account for more than 20 years

#### Dev Links

- [issues/76](https://github.com/javascript-pro/core/issues/76)
