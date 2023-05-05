<template>
  <Topbar />
  <main id="main">
    <SectionMap />
    <NewsFeed />
    <Seismology />
    <Faq />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import store from '/@/store';
import { Topbar, SectionMap, NewsFeed, Seismology, Faq, Footer } from '/@/layouts';

store.loadNewsFeed();
</script>
