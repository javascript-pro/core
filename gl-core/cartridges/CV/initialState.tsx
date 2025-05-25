export type TCVSlice = {
  appMode: 'pristine' | 'resume' | 'jd' | 'ai';
  resume: string | null;
  jd: string | null;
  fetching: boolean;
  validJd: boolean;
  fit: string | null;
};

export const initialState: TCVSlice = {
  appMode: 'pristine',
  resume: null,
  jd: null,
  validJd: false,
  fit: null,
  fetching: false,
};
