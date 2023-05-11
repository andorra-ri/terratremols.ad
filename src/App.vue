<template>
  <TopBar />
  <main id="main">
    <SeismsMap />
    <NewsFeed />
    <Seismology />
    <FAQ />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import store from '/@/store';
import { TopBar, SeismsMap, NewsFeed, Seismology, FAQ, Footer } from '/@/layouts';

store.loadNewsFeed();
store.loadSeismReports();
</script>
