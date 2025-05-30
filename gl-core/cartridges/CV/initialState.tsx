export type TCVSlice = {
  appMode: 'pristine' | 'jd' | 'cv' | 'prompt' | 'completion';
  [key: string]: any;
};

export const initialState: TCVSlice = {
  appMode: 'jd',
  viewpoint: 'third',
  showJD: true,
  validJD: false,
};
