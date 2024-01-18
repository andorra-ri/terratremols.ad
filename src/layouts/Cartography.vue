<template>
  <section id="cartography">
    <div class="panel">
      <Collapsible :title="message('filters.filters')">
        <template #aside>
          <SeismsDownload :seisms="seisms" />
        </template>
        <SeismFilters
          v-model="filters"
          :regions="regions"
          @reset="resetFilters" />
      </Collapsible>
      <SeismList
        v-model="selected"
        :seisms="seisms" />
      <footer>{{ message('filters.last_days', { days: period }) }}</footer>
    </div>
    <div id="map" />
    <SeismPopup
      v-if="selected && popup"
      :seism="selected"
      :to="popup.name" />
    <StationPopup
      v-if="station.content"
      :station="station.content"
      :to="station.name" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import store from '/@/store';
import { Collapsible } from '/@/components';
import { createMap, useI10n } from '/@/composables';
import { dayDifference } from '/@/utils';
import { SeismList, SeismFilters, SeismPopup, SeismsDownload, StationPopup } from './partials';
import { useSeisms, useStations } from './composables';
import stations from '/@/assets/stations.yaml';
import config from '/@/config.yaml';

const { message } = useI10n();

const station = useStations(stations.STATIONS);
const { seisms, selected, filters, resetFilters, popup } = useSeisms();

const period = computed(() => dayDifference(filters.dateMax, filters.dateMin));
const regions = computed(() => [...new Set(store.state.seisms.map(seism => seism.region))].sort());

onMounted(() => createMap('map', config.map));
</script>

<style lang="scss" scoped>
#cartography {
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

    footer {
      padding: 0.5rem 0.25rem;
      background: #8881;
      color: #888b;
      border-top: 1px solid #8881;
    }
  }
}

.collapsible {
  border-bottom: 1px solid #8882;
}
</style>
