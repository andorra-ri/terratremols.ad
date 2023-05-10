import type { SeismReport as SeismReportDTO, NewsFeedStory as NewsFeedStoryDTO } from './types';
import type { SeismReport, NewsFeedStory } from '/@/types';

export const adaptSeismReport = (report: SeismReportDTO): SeismReport => {
  const { id, report: [{ url }] } = report;
  return { id, url };
};

export const adaptNewsFeedStory = (story: NewsFeedStoryDTO): NewsFeedStory => {
  const { id, text, created_at: createdAt } = story;
  return { id, text, createdAt };
};
