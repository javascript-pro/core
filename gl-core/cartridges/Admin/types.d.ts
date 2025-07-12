// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/types.d.ts

export type TLanguageCode = 'en' | 'de' | 'pt';

export type TLanguageEntry = {
  title: string;
  description: string;
};

export type TTheme = {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  text: string;
  border: string;
};
