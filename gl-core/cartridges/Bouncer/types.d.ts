// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/types.d.ts

export type TFingerprint = {
  id: string;
  displayName?: string;
  avatar?: string; // new field for avatar path
  ip?: string;
  country_code?: string;
  country_name?: string;
  state_prov?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
  isp?: string;
  organization?: string;
  timezone_name?: string;
  timezone_offset?: number;
  current_time?: string;
  currency_code?: string;
  currency_symbol?: string;
  browser?: string;
  os?: string;
  isMobile?: boolean;
  platform?: string;
  vendor?: string;
  hardwareConcurrency?: number | null;
  deviceMemory?: number | null;
  languages?: string; // comma‑joined list
};

export type TPing = {
  created: number;
  fingerprint: string | null;
  displayName: string | null;
};

export type TBouncerState = {
  cartridge: string;
  id: string | null;
  ping: TPing | null;
  pinged: boolean;
  [key: string]: any;
};
