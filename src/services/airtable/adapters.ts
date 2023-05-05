import type { NewsFeedStory as NewsFeedStoryDTO } from './types';
import type { NewsFeedStory } from '/@/types';

export const adaptNewsFeedStory = (story: NewsFeedStoryDTO): NewsFeedStory => {
  const { id, text, created_at: createdAt } = story;
  return { id, text, createdAt };
};
