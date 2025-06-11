// core/gl-core/cartridges/Theme/types.d.ts

export type TTheme = {
  children: React.ReactNode;
  theme: {
    mode: 'light' | 'dark';
    primary: string;
    secondary: string;
    background: string;
    paper: string;
    text: string;
    border: string;
  };
};
