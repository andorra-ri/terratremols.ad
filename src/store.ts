import { reactive } from 'vue';
import supabase from '/@/services/supabase';
import airtable from '/@/services/airtable';
import { dateAdd, indexate } from '/@/utils';
import type { Seism, SeismReport, NewsFeedStory } from '/@/types';
import config from '/@/config.yaml';

type State = {
  seisms: Seism[];
  reports: Record<string, SeismReport>,
  newsfeed: NewsFeedStory[];
};

const state = reactive<State>({
  seisms: [],
  reports: {},
  newsfeed: [],
});

const loadSeisms = async () => {
  state.seisms = await supabase.getSeisms();
};

const loadSeismReports = async () => {
  const reports = await airtable.getSeismReports();
  state.reports = indexate('id', reports);
};

const loadNewsFeed = async () => {
  const dateLimit = dateAdd(new Date(), config.newsfeed.dateLimit).toISOString();
  state.newsfeed = await airtable.getNewsFeed({ dateLimit });
};

export default {
  state,
  loadSeisms,
  loadSeismReports,
  loadNewsFeed,
};
