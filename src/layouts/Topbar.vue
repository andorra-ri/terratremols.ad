<template>
  <header id="topbar">
    <img src="/@/assets/images/logo.svg" class="logo">
    <nav class="main-nav">
      <ul>
        <li v-for="section in sections" :key="section.id">
          <a :href="`#${section.anchor}`">{{ section.id }}</a>
        </li>
      </ul>
      <a class="btn" :href="config.surveyURL" target="_blank">Fill survey</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import store from '/@/store';
import config from '/@/config.yaml';

const sections = computed(() => [
  ...(store.state.newsfeed.length ? [{ id: 'News', anchor: 'newsfeed' }] : []),
  { id: 'Seismology', anchor: 'seismology' },
  { id: 'FAQ', anchor: 'faq' },
]);
</script>

<style lang="scss" scoped>
#topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  z-index: 2;
  box-sizing: border-box;

  .main-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;

    ul {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
