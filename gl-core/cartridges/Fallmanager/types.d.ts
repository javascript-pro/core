// core/gl-core/cartridges/Fallmanager/types.d.ts

export type TFallmanagerState = {
  language: TLanguageCode;
  languages: Record<TLanguageCode, TLanguageEntry>;
  theme: TTheme;
};

export type TLanguageCode = 'en' | 'de';

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
