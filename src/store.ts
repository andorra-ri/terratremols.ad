import { reactive } from 'vue';
import supabase from '/@/services/supabase';
import airtable from '/@/services/airtable';
import { dateAdd } from '/@/utils';
import type { Seism, NewsFeedStory } from '/@/types';
import config from '/@/config.yaml';

type State = {
  seisms: Seism[];
  newsfeed: NewsFeedStory[];
};

const state = reactive<State>({
  seisms: [],
  newsfeed: [],
});

const loadSeisms = async () => {
  state.seisms = await supabase.getSeisms();
};

const loadNewsFeed = async () => {
  const dateLimit = dateAdd(new Date(), config.newsfeed.dateLimit).toISOString();
  state.newsfeed = await airtable.getNewsFeed({ dateLimit });
};

export default {
  state,
  loadSeisms,
  loadNewsFeed,
};
