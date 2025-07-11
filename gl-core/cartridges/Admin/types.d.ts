// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/types.d.ts

export type TFallmanagerState = {
  assist: any;
  cases: any;
  files: any;
  memory: any;
  newCase: any;
  aiCase: any;
  language: TLanguageCode;
  themeMode: 'light' | 'dark';
  themes: {
    light: TTheme;
    dark: TTheme;
  };
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
