import { TUbereduxDispatch, TRootState } from './cartridges/Uberedux/store';
export type TUbereduxState = {
  currentRoute: string;
  status: {
    level: TSeverity;
    message: string;
    hidden: boolean;
  };
  [key: string]: any;
};

export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type TFeedback = {
  mode?: "confirm" | "alert"; 
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
