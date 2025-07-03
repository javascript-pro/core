// core/gl-core/cartridges/Fallmanager/types.d.ts

export type TFallmanagerState = {
  newCase: any;
  language: TLanguageCode;
  languages: Record<TLanguageCode, TLanguageEntry>;
  theme: TTheme;
  lingua: Record<string, Record<TLanguageCode, string>>;
};

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
