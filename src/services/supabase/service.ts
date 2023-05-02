import { adaptSeism } from './adapters';
import type { Seism } from './types';

type QueryOptions = {
  qs?: Record<string, string>;
  headers?: Record<string, string>;
};

const { VITE_SUPABASE_ID, VITE_SUPABASE_TOKEN } = import.meta.env;

const query = async <T>(endpoint: string, options?: QueryOptions): Promise<T> => {
  try {
    const url = new URL(`https://${VITE_SUPABASE_ID}.supabase.co/rest/v1/${endpoint}`);
    url.searchParams.append('apikey', VITE_SUPABASE_TOKEN);
    Object.entries(options?.qs || {}).forEach(([k, v]) => url.searchParams.set(k, v));
    const response = await fetch(url, { headers: options?.headers });
    return response.json();
  } catch {
    throw new Error('ERROR_SUPABASE_LOAD');
  }
};

export const getSeisms = async () => {
  const seisms = await query<Seism[]>('seism', {
    headers: { 'Accept-Profile': 'seismology' },
  });
  return seisms.map(adaptSeism);
};
