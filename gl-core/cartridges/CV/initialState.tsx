export type TCVSlice = {
  appMode: 'pristine' | 'resume' | 'jd' | 'cv' | 'prompt';
  [key: string]: any;
};

export const initialState: TCVSlice = {
  appMode: 'cv',
  showJD: false,
  validJD: false,
  viewpoint: "first",
};
