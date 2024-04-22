<template>
  <section id="cartography">
    <div class="panel">
      <div class="toggler">{{ message('reveal_list') }}</div>
      <Collapsible :title="message('filters.filters')">
        <template #aside>
          <SeismsDownload :seisms="seisms" />
        </template>
        <SeismFilters
          v-model="filters"
          :regions="regions"
          @reset="resetFilters" />
      </Collapsible>
      <div class="period">{{ message('filters.last_days', { days: period }) }}</div>
      <SeismList
        v-model="selected"
        :seisms="seisms" />
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
import { createMap, useI10n, useMap } from '/@/composables';
import { dayDifference } from '/@/utils';
import { SeismList, SeismFilters, SeismPopup, SeismsDownload, StationPopup } from './partials';
import { useSeisms, useStations } from './composables';
import stations from '/@/assets/stations.yaml';
import border from '/@/assets/border.json';
import config from '/@/config.yaml';

const { message } = useI10n();

const { addLayer } = useMap();

addLayer({ ...config.layers.BORDER, source: border });

const station = useStations(stations.STATIONS);
const { seisms, selected, filters, resetFilters, popup } = useSeisms();

const period = computed(() => dayDifference(filters.dateMax, filters.dateMin));
const regions = computed(() => [...new Set(store.state.seisms.map(seism => seism.region))].sort());

onMounted(() => createMap('map', config.map));
</script>

<style lang="scss" scoped>
#cartography {
  display: flex;
  position: relative;
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
    z-index: 1;
    transition: all 0.5s ease-in-out;

    .toggler {
      position: absolute;
      top: 0;
      left: 100%;
      background: var(--color-primary);
      color: #fff;
      padding: 1.5rem 1rem;
      border-bottom-right-radius: 0.25rem;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      display: none;
      text-transform: uppercase;
    }

    .period {
      text-align: center;
      padding: 0.5rem 0.25rem;
      background: #8881;
      color: #888b;
      border-bottom: 1px solid #8881;
    }
  }
}

.collapsible {
  border-bottom: 1px solid #8882;
}

/* iPad and below */
@media screen and (max-width: 920px) {
  .panel {
    position: absolute !important;
    top: 0;
    height: 100%;
    transform: translateX(-100%);

    .toggler { display: block !important; }

    &:hover { transform: none; }
  }
}
</style>
