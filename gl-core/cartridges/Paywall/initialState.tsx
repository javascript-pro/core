// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/initialState.tsx

export type TPaywallState = {
  cartridge: string;
  authed?: boolean;
};

export const initialState: TPaywallState = {
  cartridge: 'paywall',
  authed: false,
};
