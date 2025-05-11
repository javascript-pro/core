export type TCVSlice = {
  mode: 'resume' | 'jd' | 'ai';
  resume: string | null;
  jd: string | null;
};

export const initialState: TCVSlice = {
  mode: 'resume',
  resume: null,
  jd: null,
};
