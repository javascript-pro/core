export type TCVSlice = {
  mode: 'resume' | 'jd' | 'ai';
  resume: string | null;
  jd: string | null;
  validJd: boolean;
  fit: string | null;
};

export const initialState: TCVSlice = {
  mode: 'resume',
  resume: null,
  jd: null,
  validJd: false,
  fit: null,
};
