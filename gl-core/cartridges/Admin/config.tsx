import { lingua } from './lingua';

export type TTheme = {
  mode: 'dark' | 'light';
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  text: string;
  border: string;
};

export type TConfig = {
  lingua: typeof lingua;
  language: string;
  themeMode: 'dark' | 'light';
  themes: {
    dark: TTheme;
    light: TTheme;
  };
};

export const config: TConfig = {
  lingua,
  language: 'de',
  themeMode: 'dark',
  themes: {
    light: {
      mode: 'light',
      primary: '#12836aff',
      secondary: '#414142',
      background: '#eee',
      paper: '#FFFFFF',
      text: '#414142',
      border: '#414142',
    },
    dark: {
      mode: 'dark',
      primary: '#34d0f7',
      secondary: '#4bff60',
      background: '#000',
      paper: '#000',
      text: '#fff',
      border: '#FFF',
    },
  },
};
