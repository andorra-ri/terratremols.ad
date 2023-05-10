<template>
  <section id="newsfeed" class="content">
    <template v-if="store.state.newsfeed.length">
      <h2>{{ message('newsfeed.title') }}</h2>
      <ul class="tweets">
        <li v-for="story in store.state.newsfeed" :key="story.id">
          <p class="note">{{ formatDate(story.createdAt) }}</p>
          <p>{{ story.text }}</p>
        </li>
      </ul>
    </template>
  </section>
</template>

<script setup lang="ts">
import store from '/@/store';
import { useI10n } from '/@/composables';

const { message, formatDate } = useI10n();
</script>
