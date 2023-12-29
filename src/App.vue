<template>
  <NavBar />
  <main id="main">
    <Cartography />
    <NewsList />
    <Seismology />
    <FrequentAskedQuestions />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import store from '/@/store';
import {
  NavBar,
  Cartography,
  NewsList,
  Seismology,
  FrequentAskedQuestions,
  Footer,
} from '/@/layouts';

store.loadNewsFeed();
store.loadSeismReports();
</script>
