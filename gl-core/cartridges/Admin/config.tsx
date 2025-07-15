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
    "light": {
      "mode": "light",
      "primary": "#5E7978",
      "secondary": "#5E7978",
      "background": "#FFF",
      "paper": "#FFF",
      "text": "#303030",
      "border": "#5E7978"
    },
    "dark": {
      "mode": "dark",
      "primary": "#A6D4D1",
      "secondary": "#e8c10b",
      "background": "#5E7978",
      "paper": "#5E7978",
      "text": "#FFFFFF",
      "border": "#C09F52"
    }
  },
};
