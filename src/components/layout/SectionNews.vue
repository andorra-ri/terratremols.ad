<template>
  <section id="news" class="content">
    <h2>Latest News</h2>
    <ul class="tweets">
      <li v-for="tweet in tweets" :key="tweet.id">
        <p class="note"><small>{{ tweet.date }}</small></p>
        <p>{{ tweet.text }}</p>
        <p><a :href="tweet.link" target="blank">Know more</a></p>
      </li>
      <li v-if="!tweets.length">
        <p class="note">Nothing relevant happened the last 7 days.</p>
      </li>
    </ul>
    <p><a :href="ALL_NEWS_URL" class="btn" target="blank">View all news</a></p>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { format } from '/@/utils';
import config from '/@/config.yaml';

const { USER, HASHTAG, LINK_REGEX, REMOVE_REGEX } = config.twitter;
const ALL_NEWS_URL = `https://twitter.com/search?q=from%3A${USER}%20%23${HASHTAG}&src=typed_query&f=live`;
const MAX_NEWS = 3;

export default {
  name: 'SectionNews',
  setup() {
    const tweets = ref([]);

    onMounted(async () => {
      const response = await fetch(`/.netlify/functions/tweets?user=${USER}&hashtag=${HASHTAG}`);
      const { data = [], includes } = await response.json();
      tweets.value = data.slice(0, MAX_NEWS).map(tweet => {
        const media = includes.media.find(m => m.media_key === tweet.attachments?.media_keys?.[0]);
        const [link = `https://twitter.com/${USER}/status/${tweet.id}`] = tweet.text.match(new RegExp(LINK_REGEX, 'gmi')) || [];
        const text = REMOVE_REGEX.reduce((acc, regex) => acc.replace(new RegExp(regex, 'gmiu'), ''), tweet.text);
        const date = format.DATE(new Date(tweet.created_at));
        return { ...tweet, text, date, media, link };
      });
    });

    return { tweets, ALL_NEWS_URL };
  },
};
</script>
