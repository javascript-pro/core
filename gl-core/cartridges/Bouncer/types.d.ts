// core/gl-core/cartridges/Bouncer/types.d.ts

export type TUser = {
  [key: string]: any;
} | null;

export type TBouncer = {
  frontmatter?: any;
  content?: any;
  slug: string;
  children?: React.ReactNode;
  [key: string]: any;
};

export type TAuthed = {
  [key: string]: any;
};

export type TSignoutButton = {
  [key: string]: any;
};

export type TBouncerState = {
  cartridge: string;
  feedback: TFeedback | null;
  authing: boolean;
  user: {
    email: string | null;
    fingerprint: string | null;
  } | null;
};

export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type TFrontmatter = {
  title?: string;
  [key: string]: any;
};
