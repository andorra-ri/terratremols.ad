<template>
  <section id="map-view">
    <div class="panel">
      <details class="collapsible">
        <summary>
          {{ message('filters.filters') }}
          <aside>
            <button @click="download(CSV_NAME)">
              <RemixIcon name="download" />
            </button>
          </aside>
        </summary>
        <SeismFilters
          v-model="filters"
          :regions="regions"
          @reset="resetFilters" />
      </details>
      <SeismList
        v-model="selectedSeism"
        :seisms="seisms" />
      <footer>{{ message('filters.last_days', { days: period }) }}</footer>
    </div>
    <div id="map" />
    <SeismPopup
      v-if="selectedSeism"
      :seism="selectedSeism"
      :report="store.state.reports[selectedSeism.id]?.url"
      :to="state.name" />
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, toRef, watch } from 'vue';
import store from '/@/store';
import { RemixIcon } from '/@/components';
import { createMap, useMap, useFilters, useI10n, useCsv } from '/@/composables';
import { toFeatureCollection, normalize, dateAdd, dayDifference } from '/@/utils';
import { SeismList, SeismFilters, SeismPopup } from './partials';
import config from '/@/config.yaml';
import type { Seism, FiltersSeism, Replace } from '/@/types';

const { message } = useI10n();
const { addLayer, addPopup, fitTo } = useMap();

const { state, bindClick } = addPopup<Replace<{ datetime: string }, Seism>>({
  name: 'seism-popup',
  snap: true,
});

const selectedSeism = ref<Seism>();
watch(state, ({ content }) => {
  selectedSeism.value = content ? {
    ...content,
    datetime: new Date(content.datetime),
  } : undefined;
});

const DEFAULT_FILTERS: FiltersSeism = {
  search: '',
  dateMin: dateAdd(new Date(), { months: -1 }),
  dateMax: new Date(),
  magnitude: [-1, 10],
};

const filters = reactive({ ...DEFAULT_FILTERS });
const resetFilters = () => Object.assign(filters, DEFAULT_FILTERS);

const { filter } = useFilters<Seism>();
const seisms = filter([
  seism => normalize(seism.region).includes(normalize(filters.search || '')),
  seism => seism.datetime >= filters.dateMin && seism.datetime <= filters.dateMax,
  seism => seism.magnitude >= filters.magnitude[0] && seism.magnitude <= filters.magnitude[1],
], toRef(store.state, 'seisms'));

const period = computed(() => dayDifference(filters.dateMax, filters.dateMin));
const regions = computed(() => [...new Set(store.state.seisms.map(seism => seism.region))].sort());

const CSV_NAME = 'terratrèmols';
const { download } = useCsv(seisms, seism => {
  const { datetime, magnitude, depth, region, coordinates: [lon, lat] } = seism;
  const timestamp = datetime.toISOString();
  return { timestamp, lon, lat, magnitude, depth, region };
});

addLayer(computed(() => {
  const source = toFeatureCollection(seisms.value);
  return { ...config.layers.SEISMS, source, onClick: bindClick };
}));

watchEffect(() => seisms.value.length && fitTo(seisms.value, { padding: 100 }));

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

    footer {
      padding: 0.5rem 0.25rem;
      background: #8881;
      color: #888b;
      border-top: 1px solid #8881;
    }
  }
}

.collapsible {
  summary {
    color: var(--color-primary);
    border-bottom: 1px solid #8882;
    display: flex;

    aside {
      margin: -1rem 0;
      margin-left: auto;
      display: flex;
      align-items: center;

      button {
        all: unset;
        background: #8881;
        padding: 0.5em 0.65em;
        border-radius: 0.25em;
      }
    }
  }
}
</style>
