export type TUbereduxState = {
  currentRoute: string;
  status: {
    level: TSeverity;
    message: string;
    hidden: boolean;
  };
};

export type TSeverity = 'success' | 'info' | 'warning' | 'error';
