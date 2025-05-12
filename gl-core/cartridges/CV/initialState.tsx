export type TCVSlice = {
  mode: 'resume' | 'jd' | 'ai';
  resume: string | null;
  jd: string | null;
  fetching: boolean;
  validJd: boolean;
  fit: string | null;
};

export const initialState: TCVSlice = {
  mode: 'resume',
  resume: null,
  jd: null,
  validJd: false,
  fit: null,
  fetching: false,
};
