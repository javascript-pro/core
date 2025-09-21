// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/initialState.tsx

export type TFlashState = {
  cartridge: string;
  playing: boolean;
  [key: string]: any;
};

export const initialState: TFlashState = {
  cartridge: 'flash',
  playing: false,
};
