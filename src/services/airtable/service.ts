import { useAirtable } from 'painless-airtable';
import { adaptSeismReport, adaptNewsFeedStory, adaptLearnDocument } from './adapters';
import type { SeismReport, NewsFeedStory, LearnDocument } from './types';

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

export const getSeismReports = async () => {
  const reports = await airtable.select<SeismReport>('reports', {
    fields: ['id', 'report'],
    persist: true,
    where: {
      valid: { checked: true },
      published: { checked: true },
    },
  });
  return reports.map(adaptSeismReport);
};

export const getLearnDocuments = async () => {
  const docs = await airtable.select<LearnDocument>('seismology', {
    fields: ['name', 'category', 'file'],
    where: {
      valid: { checked: true },
      published: { checked: true },
    },
  });
  return docs.map(adaptLearnDocument);
};
