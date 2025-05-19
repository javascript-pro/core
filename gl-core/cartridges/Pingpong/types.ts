export type PingPayload = {
  fingerprint: string;
  userAgent: string;
  ip: string;
  location: Record<string, any>;
  timestamp: number;
};
