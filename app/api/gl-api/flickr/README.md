https://github.com/javascript-pro/core/issues/76



album=72177720324245676

endpoints

```javascript
endpoints: [
      {
        flickr: 'http://localhost:3000/api/gl-api/flickr',
        flickrAlbum:
          'http://localhost:3000/api/gl-api/flickr/?album=72177720324245676',
        flickrPhoto:
          'http://localhost:3000/api/gl-api/flickr/?photo=54534952165',
      },
      {},
      {
        route: "/gl-api/flickr",
        examples:{

        },
        queryVars: [
            "album",
            "albums", // comma seperated list of albums
            "photo",
            "photos",
        ],
      },
    ],
```