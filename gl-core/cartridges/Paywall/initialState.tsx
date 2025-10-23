// core/gl-core/cartridges/Lingua/initialState.tsx

export type TPaywall = {
  cartridge: string;
  authed: boolean;
};

export const initialState: TPaywall = {
  cartridge: 'paywall',
  authed: false,
};
