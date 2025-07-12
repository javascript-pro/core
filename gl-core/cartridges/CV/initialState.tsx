export type TCVSlice = {
  cartridge: string;
  appMode: 'pristine' | 'jd' | 'cv' | 'prompt' | 'completion';
  [key: string]: any;
};

export const initialState: TCVSlice = {
  cartridge: 'cv',
  appMode: 'jd',
  viewpoint: 'first',
  showJD: true,
  validJD: false,
};
