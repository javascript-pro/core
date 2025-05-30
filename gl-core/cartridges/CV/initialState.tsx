export type TCVSlice = {
  appMode: 'pristine' | 'resume' | 'jd' | 'cv' | 'prompt';
  [key: string]: any;
};

export const initialState: TCVSlice = {
  appMode: 'jd',
  viewpoint: 'first',
  showJD: false,
  validJD: false,
};
