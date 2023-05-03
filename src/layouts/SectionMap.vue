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
        <SeismFilters v-model="filters" @reset="resetFilters" />
      </header>
      <SeismList v-model="state.content" :seisms="seisms" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, computed, watch, onMounted, toRef } from 'vue';
import store from '/@/store';
import { createMap, useMap, useFilters } from '/@/composables';
import { SeismList, SeismFilters, SeismPopup } from '/@/components';
import { toFeatureCollection, normalize, dateAdd } from '/@/utils';
import config from '/@/config.yaml';
import type { Seism, FiltersSeism } from '/@/types';

const { addLayer, addPopup, fitTo } = useMap();

const { popup, state, bindClick } = addPopup<Seism>({
  name: 'seism-popup',
  snap: true,
});

watch(state, ({ content }) => {
  if (!content || !('geometry' in content)) return;
  popup.value?.setLocation(content.geometry.coordinates);
  fitTo([content]);
}, { deep: true });

const DEFAULT_FILTERS: FiltersSeism = {
  search: '',
  dateMin: dateAdd(new Date(), { years: -1 }),
  dateMax: new Date(),
  magnitude: [0, 10],
};
const filters = reactive({ ...DEFAULT_FILTERS });
const resetFilters = () => Object.assign(filters, DEFAULT_FILTERS);
const { filter } = useFilters<Seism>();
const seisms = filter([
  seism => normalize(seism.region).includes(normalize(filters.search)),
  seism => seism.datetime >= filters.dateMin && seism.datetime <= filters.dateMax,
  seism => seism.magnitude >= filters.magnitude[0] && seism.magnitude <= filters.magnitude[1],
], toRef(store.state, 'seisms'));

addLayer(computed(() => {
  const source = toFeatureCollection(seisms.value);
  return { ...config.layers.SEISMS, source, onClick: bindClick };
}));

onMounted(() => {
  createMap('map', config.map);
  store.loadSeisms();
});
</script>
