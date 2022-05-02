<template>
  <section-sidebar />
  <main id="main">
    <div id="map-view" />
    <section-footer />
  </main>
</template>

<script>
import { SectionSidebar, SectionFooter } from '/@/components/layout';

export default {
  name: 'App',
  components: { SectionSidebar, SectionFooter },
  setup() {
    return {};
  },
};
</script>
