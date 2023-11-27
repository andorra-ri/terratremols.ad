import type * as DTO from './types';
import type { SeismReport, NewsFeedStory, LearnDocument } from '/@/types';

export const adaptSeismReport = (report: DTO.SeismReport): SeismReport => {
  const { id, report: [{ url }] } = report;
  return { id, url };
};

export const adaptNewsFeedStory = (story: DTO.NewsFeedStory): NewsFeedStory => {
  const { id, text, created_at: createdAt } = story;
  return { id, text, createdAt };
};

export const adaptLearnDocument = (document: DTO.LearnDocument): LearnDocument => {
  const { name, category, file: [{ url }] } = document;
  return { name, category, url };
};
