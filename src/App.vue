<template>
  <NavBar />
  <main id="main">
    <Cartography />
    <SurveyBanner />
    <NewsList />
    <Realtime />
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
  SurveyBanner,
  NewsList,
  Realtime,
  Seismology,
  FrequentAskedQuestions,
  Footer,
} from '/@/layouts';

store.loadNewsFeed();
store.loadSeismReports();
</script>
