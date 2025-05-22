export type TUbereduxState = {
  status: {
    level: string;
    message: string;
    hidden: boolean;
  };
};

export type TSeverity = 'success' | 'info' | 'warning' | 'error';
