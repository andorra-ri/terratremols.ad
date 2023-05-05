<template>
  <section id="news" class="content">
    <template v-if="newsfeed.length">
      <h2>Latest News</h2>
      <ul class="tweets">
        <li v-for="story in newsfeed" :key="story.id">
          <p class="note">
            {{ new Date(story.createdAt).toLocaleDateString('ca', config.formats.DATE) }}
          </p>
          <p>{{ story.text }}</p>
        </li>
      </ul>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import airtable from '/@/services/airtable';
import { dateAdd } from '/@/utils';
import type { NewsFeedStory } from '/@/types';
import config from '/@/config.yaml';

const newsfeed = ref<NewsFeedStory[]>([]);

onMounted(async () => {
  const dateLimit = dateAdd(new Date(), config.newsfeed.dateLimit).toISOString();
  newsfeed.value = await airtable.getNewsFeed({ dateLimit });
});
</script>
