import { reactive } from 'vue';
import supabase, { type GetSeismsOptions } from '/@/services/supabase';
import airtable from '/@/services/airtable';
import { dateAdd, indexate } from '/@/utils';
import type { Seism, SeismReport, NewsFeedStory, LearnDocument, Link } from '/@/types';
import config from '/@/config.yaml';

type State = {
  lastSeism: Seism | undefined;
  seisms: Seism[];
  reports: Record<string, SeismReport>,
  newsfeed: NewsFeedStory[];
  docs: LearnDocument[];
  links: Link[];
};

const state = reactive<State>({
  lastSeism: undefined,
  seisms: [],
  reports: {},
  newsfeed: [],
  docs: [],
  links: [],
});

const loadSeisms = async (options?: GetSeismsOptions) => {
  if (!state.lastSeism) state.lastSeism = await supabase.getLastSeism();
  const [seisms, reports] = await Promise.all([
    supabase.getSeisms(options),
    airtable.getSeismReports(),
  ]);
  const reportDict = indexate('id', reports);
  state.seisms = seisms.map(seism => {
    const report = reportDict[seism.id]?.url;
    return { ...seism, report };
  });
};

const loadSeismReports = async () => {
  const reports = await airtable.getSeismReports();
  state.reports = indexate('id', reports);
};

const loadNewsFeed = async () => {
  const dateLimit = dateAdd(new Date(), config.newsfeed.dateLimit).toISOString();
  state.newsfeed = await airtable.getNewsFeed({ dateLimit });
};

const loadLearnDocuments = async () => {
  state.docs = await airtable.getLearnDocuments();
  state.docs.sort((a, b) => a.order - b.order);
};

const loadLinks = async () => {
  state.links = await airtable.getLinks();
};

export default {
  state,
  loadSeisms,
  loadSeismReports,
  loadNewsFeed,
  loadLearnDocuments,
  loadLinks,
};
