// core/gl-core/cartridges/Fallmanager/types.d.ts

export type TFallmanagerState = {
  aktuellerFall: any;
  language: TLanguageCode;
  languages: Record<TLanguageCode, TLanguageEntry>;
  theme: TTheme;
  translations: Record<string, Record<TLanguageCode, string>>;
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
