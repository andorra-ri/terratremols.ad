import { adaptSeism } from './adapters';
import type { Seism } from './types';

type QueryOptions = {
  qs?: Record<string, string | number>;
  headers?: Record<string, string>;
};

const { VITE_SUPABASE_ID, VITE_SUPABASE_TOKEN } = import.meta.env;

const query = async <T>(endpoint: string, options?: QueryOptions): Promise<T> => {
  try {
    const url = new URL(`https://${VITE_SUPABASE_ID}.supabase.co/rest/v1/${endpoint}`);
    url.searchParams.append('apikey', VITE_SUPABASE_TOKEN);
    Object.entries(options?.qs || {}).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    const response = await fetch(url, { headers: options?.headers });
    return response.json();
  } catch {
    throw new Error('ERROR_SUPABASE_LOAD');
  }
};

export type GetSeismsOptions = {
  magnitude?: [number, number];
  dates?: [Date, Date];
};

export const getLastSeism = async () => {
  const seism = await query<Seism>('seism', {
    headers: {
      'Accept-Profile': 'seismology',
      Accept: 'application/vnd.pgrst.object+json',
    },
    qs: {
      order: 'datetime.desc',
      limit: 1,
    },
  });
  return adaptSeism(seism);
};

export const getSeisms = async (options?: GetSeismsOptions) => {
  const { magnitude, dates } = options || {};

  const ranges = [
    ...(magnitude ? [
      `magnitude.gte.${magnitude[0]}`,
      `magnitude.lte.${magnitude[1]}`,
    ] : []),
    ...(dates ? [
      `datetime.gte.${dates[0].toISOString()}`,
      `datetime.lte.${dates[1].toISOString()}`,
    ] : []),
  ];

  const seisms = await query<Seism[]>('seism', {
    headers: { 'Accept-Profile': 'seismology' },
    qs: {
      ...(ranges.length ? { and: `(${ranges.join(',')})` } : {}),
      order: 'datetime.desc',
    },
  });
  return seisms.map(adaptSeism);
};
