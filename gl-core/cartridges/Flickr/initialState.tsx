export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type TFlickrPhoto = {
  id: string;
  title: string;
  description?: string;
  src: string;
  width?: number;
  height?: number;
  [key: string]: any;
};

export type TFlickrAlbum = {
  flickrId: string;
  title?: string;
  description?: string;
  fetched: boolean;
  fetching: boolean;
  error?: {
    severity: TSeverity;
    message: string;
  };
  result: TFlickrPhoto[];
};

export type TFlickrPhotoState = {
  flickrId: string;
  title?: string;
  description?: string;
  fetched: boolean;
  fetching: boolean;
  error?: {
    severity: TSeverity;
    message: string;
  };
  result: TFlickrPhoto | null;
};

export type IFlickrState = {
  cartridge: string;
  initting: boolean;
  initComplete: boolean;
  albums: TFlickrAlbum[];
  photos: TFlickrPhotoState[];
};

export const initialState: IFlickrState = {
  cartridge: 'flickr',
  initting: false,
  initComplete: false,
  albums: [],
  photos: [],
};

/*
  albums: [
    {
      flickrId: '72177720324245676',
      fetching: false,
      fetched: false,
      result: [],
    },
  ],
  photos: [
    {
      flickrId: '54534952165',
      fetching: false,
      fetched: false,
      result: null,
    },
  ],
*/
