/* eslint-disable import/prefer-default-export */
import fetch from 'node-fetch';

const { VITE_TWITTER_TOKEN } = process.env;
const baseURL = 'https://api.twitter.com/2/tweets/search/recent';

export const handler = async event => {
  const { user = 'Andorra_RI', hashtag } = event.queryStringParameters;
  const url = new URL(baseURL);
  url.search = new URLSearchParams({
    query: `from:${user} #${hashtag}`,
    expansions: 'attachments.media_keys',
    'tweet.fields': 'id,text,attachments,created_at,public_metrics',
    'media.fields': 'preview_image_url,type,url',
  });

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${VITE_TWITTER_TOKEN}` },
    Accept: 'application/json',
  });
  const json = await response.json();

  const statusCode = response.ok ? 200 : json.code;
  const body = response.ok ? JSON.stringify(json) : json.message;
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };

  return { body, statusCode, headers };
};
