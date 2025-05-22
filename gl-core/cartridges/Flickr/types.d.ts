export type TFlickrState = {
  cartridge: string;
  status: TSeverity;
  loaded: boolean;
  loading: boolean;
  search: string | null;
  message: string;
  albums?: TFlickrAlbum[];
  [key: string]: any;
};

export type TAlbumCard = {
  id?: string | null;
};

export type TPhotoCard = {
  id?: string | null;
  photo?: any;
};

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
