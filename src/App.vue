<template>
  <Sidebar />
  <main id="main">
    <SectionMap />
    <News />
    <Seismology />
    <Faq />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { Sidebar, SectionMap, News, Seismology, Faq, Footer } from '/@/layouts';
</script>
