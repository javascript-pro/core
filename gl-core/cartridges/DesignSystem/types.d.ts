// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/types.d.ts

import { TIconShape } from './components/Icon';

export type TIcon = TIconShape;

export interface IDesignSystem {
  theme?: TTheme;
  children: React.ReactNode;
}

export interface TDesignSystemState {
  cartridge?: string;
  dialog?: any;
  theme?: TTheme;
  [key: string]: any;
}

export type TTheme = {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  text: string;
  border: string;
};

export type TSystemDialog = {
  icon?: string;
  title?: string;
  subheader?: string;
  content?: React.ReactNode;
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
