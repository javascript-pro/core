export type IPData = {
  ip: string;
  location: Record<string, any>;
};

export async function getIPData(): Promise<IPData> {
  const res = await fetch('https://ipapi.co/json/');
  const json = await res.json();

  return {
    ip: json.ip,
    location: {
      city: json.city,
      region: json.region,
      country: json.country_name,
      org: json.org,
      timezone: json.timezone,
    },
  };
}
