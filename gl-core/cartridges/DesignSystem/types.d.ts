// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/types.d.ts

export type TDesignSystem = {
  cartridge?: string;
  dialog?: any;
  [key: string]: any;
};

export type TFlickrState = {
  cartridge?: string;
  feedback: {
    severity: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  };
  latestIndex: number;
  latest: {
    fetching: boolean;
    fetched: boolean;
  } | null;
};
