// core/gl-core/cartridges/Fallmanager/types.d.ts

export type TFallmanagerState = {
  cartridge: string;
  screen?: 'upload' | 'read';
  fileTypes?: TFileType[];
  newCaseOpen: boolean;
};

export type TFileType = {
  slug: string;
  icon?: string;
  title?: string;
  description?: string;
};

export type TFall = {
  fbId?: string;
  title?: string;
  [key: string]: any;
};

export type TFallmanager = {
  payload?: any;
  [key: string]: any;
};

export type TLayout = {
  children?: React.ReactNode;
  [key: string]: any;
};

export type TNewComponent = {
  [key: string]: any;
};
