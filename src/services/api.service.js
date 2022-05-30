import config from '/@/config.yaml';

const { VITE_SUPABASE_ID, VITE_SUPABASE_TOKEN } = import.meta.env;
const baseURL = `https://${VITE_SUPABASE_ID}.supabase.co/rest/v1/`;

const get = async (route, options = {}) => {
  const { schema = 'public', params = {} } = options;
  const url = new URL(route, baseURL);
  url.search = new URLSearchParams(params);
  const response = await fetch(url, {
    headers: {
      'Accept-Profile': schema,
      apikey: VITE_SUPABASE_TOKEN,
    },
  });
  if (response.ok) return response.json();
  const error = await response.json();
  throw new Error(`${response.statusText}! ${error.code} ${error.message}`);
};

const getSeisms = async () => {
  const { endpoint, schema } = config.api.seisms;
  return get(endpoint, { schema });
};

export default { get, getSeisms };
