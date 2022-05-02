<template>
  <section-sidebar />
  <main id="main">
    <section-map />
    <section-footer />
  </main>
</template>

<script>
import { SectionSidebar, SectionMap, SectionFooter } from '/@/components/layout';

export default {
  name: 'App',
  components: { SectionSidebar, SectionMap, SectionFooter },
  setup() {
    return {};
  },
};
</script>
