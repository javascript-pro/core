// core/gl-core/cartridges/Bouncer/types.d.ts

export type TBouncer = {
  [key: string]: any;
};

export type TBouncerState = {
  cartridge: string;
  authed: boolean;
  user: {
    fingerprint: string;
  } | null;
  feedback: TFeedback | null;
};

export type TSeverity = "success" |  "info" |  "warning" | "error";

export type TFeedback = {
  severity?: TSeverity;
  title?: string;
  description?: string;
} | null;

export type TAuthForm = {
  onClose?: () => void;
  [key: string]: any;
};
