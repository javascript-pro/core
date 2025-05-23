export type TFlickrPhotoSize = {
  src: string;
  width: number;
  height: number;
};

export type TFlickrPhoto = {
  id?: string;
  flickrId: string;
  flickrUrl: string;
  title?: string;
  description?: string;
  lat?: number | null;
  lng?: number | null;
  time?: number;
  meta?: Record<string, any>;
  sizes?: {
    orig?: TFlickrPhotoSize;
    small?: TFlickrPhotoSize;
    medium?: TFlickrPhotoSize;
    large?: TFlickrPhotoSize;
  };
};

export type TFlickrPhoto_OLD = {
  id: string;
  flickrId: string;
  flickrUrl: string;
  title?: string;
  description?: string;
  lat?: number | null;
  lng?: number | null;
  time?: number;
  meta?: any;
  sizes?: {
    orig?: {
      src: string;
      width: number;
      height: number;
    };
    small?: {
      src: string;
      width: number;
      height: number;
    };
    medium?: {
      src: string;
      width: number;
      height: number;
    };
    large?: {
      src: string;
      width: number;
      height: number;
    };
  };
};
