export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type TUbereduxState = {
  currentRoute: string;
  status: {
    level: TSeverity;
    message: string;
    hidden: boolean;
  };
  [key: string]: any;
};
