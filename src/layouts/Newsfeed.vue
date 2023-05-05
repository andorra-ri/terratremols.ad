<template>
  <section id="newsfeed" class="content">
    <template v-if="store.state.newsfeed.length">
      <h2>Latest News</h2>
      <ul class="tweets">
        <li v-for="story in store.state.newsfeed" :key="story.id">
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
import store from '/@/store';
import config from '/@/config.yaml';
</script>
