<template>
  <section id="map-view">
    <div class="panel">
      <header>
        <SeismFilters
          v-model="filters"
          @reset="resetFilters" />
      </header>
      <SeismList
        v-model="state.content"
        :seisms="seisms" />
    </div>
    <div id="map" />
    <SeismPopup
      v-if="state.content"
      :seism="state.content"
      :report="store.state.reports[state.content.id]?.url"
      :to="state.name" />
  </section>
</template>

<script setup lang="ts">
import { reactive, computed, watchEffect, onMounted, toRef } from 'vue';
import store from '/@/store';
import { createMap, useMap, useFilters } from '/@/composables';
import { toFeatureCollection, normalize, dateAdd } from '/@/utils';
import { SeismList, SeismFilters, SeismPopup } from './partials';
import config from '/@/config.yaml';
import type { Seism, FiltersSeism } from '/@/types';

const { addLayer, addPopup, fitTo } = useMap();

const { popup, state, bindClick } = addPopup<Seism>({
  name: 'seism-popup',
  snap: true,
});

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

watchEffect(() => {
  const { content } = state.value;
  if (content) popup.value?.setLocation(content.coordinates);
  else popup.value?.popup.remove();
  const points = content && 'geometry' in content ? [content] : seisms.value;
  fitTo(points, { padding: 100 });
});

onMounted(() => {
  createMap('map', config.map);
  store.loadSeisms();
});
</script>

<style lang="scss" scoped>
#map-view {
  display: flex;
  background: #0001;
  height: 80vh;
  margin: 0;
  border: 1px solid transparent;
  border-width: 1px 0;

  .panel {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--bgcolor);
    border-right: 1px solid #0001;
    flex: 0 0 290px;
    box-sizing: border-box;

    & > header { border-bottom: 1px solid #0001; }
  }
}
</style>
