<template>
  <section id="map-view">
    <div id="map" />
    <SeismPopup
      v-if="state.content"
      :seism="state.content"
      :to="state.name" />
    <div class="panel">
      <div class="panel__toggler">Seisms List</div>
      <header>
        <SeismFilters v-model="filter" />
      </header>
      <SeismList v-model="state.content" :seisms="store.state.seisms" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import store from '/@/store';
import { createMap, useMap } from '/@/composables';
import { SeismList, SeismFilters, SeismPopup } from '/@/components';
import { toFeatureCollection } from '/@/utils';
import config from '/@/config.yaml';
import type { Seism } from '/@/types';

const { addLayer, addPopup, fitTo } = useMap();
const filter = ref(() => true);

const { popup, state, bindClick } = addPopup<Seism>({
  name: 'seism-popup',
  snap: true,
});

watch(state, ({ content }) => {
  if (!content || !('geometry' in content)) return;
  popup.value?.setLocation(content.geometry.coordinates);
  fitTo([content]);
}, { deep: true });

addLayer(computed(() => {
  const source = toFeatureCollection(store.state.seisms);
  return { ...config.layers.SEISMS, source, onClick: bindClick };
}));

onMounted(() => {
  createMap('map', config.map);
  store.loadSeisms();
});
</script>
