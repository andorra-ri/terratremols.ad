<template>
  <section id="cartography">
    <div class="panel">
      <details class="collapsible">
        <summary>
          {{ message('filters.filters') }}
          <aside>
            <SeismsDownload
              name="terratremols"
              :seisms="seisms" />
          </aside>
        </summary>
        <SeismFilters
          v-model="filters"
          :regions="regions"
          @reset="resetFilters" />
      </details>
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
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, toRef } from 'vue';
import store from '/@/store';
import { createMap, useI10n } from '/@/composables';
import { dayDifference } from '/@/utils';
import { SeismList, SeismFilters, SeismPopup, SeismsDownload } from './partials';
import useSeisms from './use.seisms';
import config from '/@/config.yaml';

const { message } = useI10n();

const { seisms, selected, filters, resetFilters, popup } = useSeisms(toRef(store.state, 'seisms'));

const period = computed(() => dayDifference(filters.dateMax, filters.dateMin));
const regions = computed(() => [...new Set(store.state.seisms.map(seism => seism.region))].sort());

onMounted(() => {
  createMap('map', config.map);
  store.loadSeisms();
});
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
    }
  }
}
</style>
