// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/initialState.tsx
// import { TAdminState } from './types';

export type TAdminState = {
  cartridge: string;
  hello: number;
};

export const initialState: TAdminState = {
  cartridge: 'admin',
  hello: 123,
};
