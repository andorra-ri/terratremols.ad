<template>
  <section-sidebar />
  <main id="main">
    <section-map />
    <section-footer />
  </main>
</template>

<script>
import * as sections from '/@/components/layout';

export default {
  name: 'App',
  components: { ...sections },
  setup() {
    return {};
  },
};
</script>
