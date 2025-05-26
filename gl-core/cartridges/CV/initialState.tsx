export type TCVSlice = {
  appMode: 'pristine' | 'resume' | 'jd' | 'cv';
  resume?: string | null;
  jd?: string | null;
  fetching?: boolean;
  validJd?: boolean;
  fit?: string | null;
};

export const initialState: TCVSlice = {
  appMode: 'cv',
};
