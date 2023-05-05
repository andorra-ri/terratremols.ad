import { useAirtable } from 'painless-airtable';
import { adaptNewsFeedStory } from './adapters';
import type { NewsFeedStory } from './types';

const airtable = useAirtable({
  base: import.meta.env.VITE_AIRTABLE_BASE,
  token: import.meta.env.VITE_AIRTABLE_TOKEN,
});

type NewsFeedOptions = {
  dateLimit: string;
};

export const getNewsFeed = async (options: NewsFeedOptions) => {
  const news = await airtable.select<NewsFeedStory>('newsfeed', {
    fields: ['id', 'text', 'created_at'],
    sort: { created_at: 'desc' },
    where: {
      created_at: { $gt: options.dateLimit },
      valid: { checked: true },
    },
  });
  return news.map(adaptNewsFeedStory);
};
