// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/initialState.tsx

export type TVisitor = {
  ready: boolean; // false to start
  pinging: boolean; // true while we’re pushing or fetching
  pinged: boolean; // false if pristine
  persisted: number; // timestamp of last successful persist to Firebase
  lastUpdated: number; // timestamp of last local update
  fingerprint?: string; // optional fingerprint string
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
    persisted: Date.now(),
    lastUpdated: Date.now(),
  },
};
