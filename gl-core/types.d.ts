import { TUbereduxDispatch, TRootState } from './cartridges/Uberedux/store';

export type TThemeConfig = {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  text: string;
  border: string;
};

export type TConfig = {
  themes: Record<string, TThemeConfig>;
};

export type TUbereduxState = {
  currentRoute: string;
  status: {
    level: TSeverity;
    message: string;
    hidden: boolean;
  };
  [key: string]: any;
};

export type TCore = {
  frontmatter?: any;
  body?: string | null;
  children?: React.ReactNode;
};

export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type TFeedback = {
  mode?: 'confirm' | 'alert';
  severity?: TSeverity;
  title?: string;
  description?: string;
} | null;

export type TAuthForm = {
  frontmatter?: any;
  onClose?: () => void;
  [key: string]: any;
};

export { TUbereduxDispatch, TRootState };

export type TFrontmatter = {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
};
