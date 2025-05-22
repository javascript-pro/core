'use client';

import * as React from 'react';
// import moment from 'moment';
import {TAlbumCard} from "../types";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { 
  Icon,
  MightyButton,
  useSlice,
} from '../../../../gl-core';
import {PhotoCard} from '../';

export default function AlbumCard({
  id = null,
}: TAlbumCard) {

  const {album} = useSlice().flickr;
  const {title, description, coverPhoto, count, photos, albumUrl} = album;
  // console.log("album", album);
  return (
    <>
      {/* <pre style={{fontSize: 10 }}>
        photos: {JSON.stringify(photos, null, 2)}
      </pre>   */}

      <Card sx={{  }}>
        <CardHeader 
          avatar={<Icon icon="album" />}
          title={`${title}`}
          subheader={`${description}`}
          action={<MightyButton
              mode="icon" 
              icon="link"
              label="View on FLickr"
              color="inherit"
              onClick={() => {
                // console.log("open albumUrl", albumUrl);
                window.open(albumUrl, "_blank");
              }}
            />}
        />
          
          <CardActions>
            
          </CardActions>
          <CardContent>

            <CardMedia 
              component="img"
              src={coverPhoto.sizes.small.src}
              alt={coverPhoto.title}
              sx={{
                maxWidth: 320,
              }}
            />

            <Typography variant='body1'>
              {coverPhoto.title}
            </Typography>

            <Typography variant='body2'>
              {coverPhoto.description}
            </Typography>

            {/* <Typography variant='caption'>
              { moment(album.dateCreate * 1000).fromNow() }
            </Typography> */}

            { photos.length && <>
              {photos.map((photo: any, i: number) => {
                return <PhotoCard key={`photo_${i}`} photo={photo} />;
              })}
            </>}

          </CardContent>

          
      </Card>

    </>
  );
}
