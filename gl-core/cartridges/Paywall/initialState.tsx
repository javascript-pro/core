// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/initialState.tsx
import { TPaywallState } from './types';

export const initialState: TPaywallState = {
  cartridge: 'paywall',
  dialogOpen: false,
  mode: 'signin',
  user: null,
  ping: null,
};
