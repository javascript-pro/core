export type TCVSlice = {
  appMode: 'pristine' | 'resume' | 'jd' | 'cv';
  [key: string]: any;
};

export const initialState: TCVSlice = {
  appMode: 'cv',
  showJD: false,
  validJD: false,
};
