// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/types.d.ts
import { TIconShape } from './components/Icon';

export interface IDesignSystem {
  theme?: TTheme;
  children: React.ReactNode;
}

export type TFeedback = {
  severity?: TSeverity;
  title?: string;
  description?: string;
} | null;

export interface TDesignSystemState {
  cartridge?: string;
  dialog?: any;
  theme?: TTheme;
  feedback?: TFeedback;
  feedbackTested?: boolean;
  fullScreen?: boolean;
  [key: string]: any;
}

export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type TIcon = TIconShape;

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
