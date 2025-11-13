// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/types.d.ts

export type TPaywallState = {
  cartridge: string;
  dialogOpen?: boolean;
  mode?: 'signin' | 'signup';
  user?: any;
  ping?: any;
  // [key: string]: any;
};

export type TExample = {
  [key: string]: any;
};
