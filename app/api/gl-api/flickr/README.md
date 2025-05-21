https://github.com/javascript-pro/core/issues/76

/gl-api/flickr

```javascript
{
    time: 1747815356331,
    endpoint: "http://localhost:3000/api/gl-api/flickr?showablbum=xxx",
    description: "Retrieves a list of photo objects in the given album",
    result: [
        {
            flickrId="xxxyyyzzz" // flickr's id
            flickrURL="https://www.flickr.com/photos/listingslab/54528014218" // vital
            title="trucks", // if any
            description="big boys camping", // if any
            time=100000000 // unix epock
            meta="tags etc"
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
        },
    ],
}
```
