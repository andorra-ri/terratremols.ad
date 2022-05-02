<template>
  <section id="map-view">
    <div id="map" />
  </section>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { createMap, useMap } from '/@/services/map.service';
import config from '/@/config.yaml';

export default {
  name: 'SectionMap',
  setup() {
    const map = useMap();

    onMounted(async () => createMap('map', config.map));

    return {};
  },
};
</script>

<style lang="scss" scoped>
#map-view {
  position: relative;
  overflow: hidden;
}
</style>
