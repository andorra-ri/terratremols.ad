<template>
  <header id="topbar">
    <a href="https://www.ari.ad" target="blank">
      <img src="/@/assets/images/logo_ari.png" class="logo">
    </a>
    <h1>Observatori del Risc Sísmic d'Andorra</h1>
    <nav class="main-nav">
      <ul>
        <li v-for="section in sections" :key="section.id">
          <a :href="`#${section.anchor}`">{{ message(`nav.${section.id}`) }}</a>
        </li>
      </ul>
      <a class="btn" :href="config.surveyURL" target="_blank">
        <RemixIcon name="survey" />
        <span>{{ message('nav.survey') }}</span>
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import store from '/@/store';
import { RemixIcon } from '/@/components';
import { useI10n } from '/@/composables';
import config from '/@/config.yaml';

const { message } = useI10n();

const sections = computed(() => [
  ...(store.state.newsfeed.length ? [{ id: 'news', anchor: 'newsfeed' }] : []),
  { id: 'seismology', anchor: 'seismology' },
  { id: 'faq', anchor: 'faq' },
]);
</script>

<style lang="scss" scoped>
#topbar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  z-index: 2;
  box-sizing: border-box;

  .logo { height: 2rem; }

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

/* iPad and below */
@media screen and (max-width: 920px) {
  .btn { padding: 0.75rem; }

  .btn span,
  .main-nav ul { display: none !important; }
}

/* iPhone */
@media screen and (max-width: 530px) {
  h1 { display: none; }
}
</style>
