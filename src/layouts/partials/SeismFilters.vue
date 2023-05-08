<template>
  <details class="collapsible">
    <summary>Filters</summary>
    <div class="filters">
      <label class="block">
        <span>Location</span>
        <input
          v-model="filters.search"
          placeholder="Enter location name"
          type="text"
          class="block">
      </label>
      <label>
        <span>From Date</span>
        <DatePicker
          v-model="filters.dateMin"
          :format="date => date.toLocaleDateString('ca')"
          :not-after="filters.dateMax"
          placeholder="Pick a date"
          :size="8" />
      </label>
      <label>
        <span>To Date</span>
        <DatePicker
          v-model="filters.dateMax"
          :format="date => date.toLocaleDateString('ca')"
          :not-before="filters.dateMin"
          :not-after="new Date()"
          placeholder="Pick a date"
          :size="8" />
      </label>
      <label class="block">
        <span>Magnitude</span>
        <slider
          v-model="filters.magnitude"
          v-bind="MAGNITUDE_RANGE_OPTIONS"
          class="range-slider" />
      </label>
      <button class="btn block" @click="reset">Reset filters</button>
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Slider from '@vueform/slider';
import { DatePicker } from '/@/components';
import type { FiltersSeism } from '/@/types';

const MAGNITUDE_RANGE_OPTIONS = {
  max: 10,
  showTooltip: 'drag',
  lazy: true,
  merge: 1,
  options: { margin: 1 },
};

const props = defineProps<{ modelValue: FiltersSeism }>();

/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
const emit = defineEmits<{
  (e: 'update:modelValue', value: FiltersSeism): void;
  (e: 'reset'): void;
}>();

const filters = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const reset = () => emit('reset');
</script>

<style lang="scss" scoped>
.collapsible {
  summary {
    color: var(--color-primary);
    margin: 0;
    padding: 1rem;
  }
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 1rem;

  .block { flex-basis: 100%; }
}
</style>
