<template>
  <Sidebar />
  <main id="main">
    <SectionMap />
    <NewsFeed />
    <Seismology />
    <Faq />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { Sidebar, SectionMap, NewsFeed, Seismology, Faq, Footer } from '/@/layouts';
</script>
