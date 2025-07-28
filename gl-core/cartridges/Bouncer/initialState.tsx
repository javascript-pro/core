// core/gl-core/cartridges/Bouncer/initialState.tsx
export type TFingerprint = {
  id: boolean; // false to start
  [key: string]: any; // allow future arbitrary fields as we build it up
};

export type TVisitor = {
  ready: boolean; // false to start
  pinging: boolean; // true while we’re pushing or fetching
  pinged: boolean; // false if pristine
  created: number; // timestamp of last successful persist to Firebase
  lastUpdated?: number; // timestamp of last local update
  fingerprint?: TFingerprint; // data
  [key: string]: any; // allow future arbitrary fields as we build it up
};

export type TBouncerState = {
  cartridge: 'bouncer';
  visitor: TVisitor | null; // null means no visitor info yet
};

export const initialState: TBouncerState = {
  cartridge: 'bouncer',
  visitor: {
    ready: false,
    pinging: false,
    pinged: false,
    created: Date.now(),
  },
};
