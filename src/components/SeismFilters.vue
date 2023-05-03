<template>
  <details class="collapsible">
    <summary><RemixIcon name="equalizer" /> Filters</summary>
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
          :size="6" />
      </label>
      <label>
        <span>To Date</span>
        <DatePicker
          v-model="filters.dateMax"
          :format="date => date.toLocaleDateString('ca')"
          :not-before="filters.dateMin"
          :not-after="new Date()"
          placeholder="Pick a date"
          :size="6" />
      </label>
      <label class="block">
        <span>Magnitude</span>
        <slider
          v-model="filters.magnitude"
          v-bind="filters.options.range"
          class="range-slider" />
      </label>
      <button class="btn block" @click="reset">Reset filters</button>
    </div>
  </details>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import Slider from '@vueform/slider';
import { RemixIcon, DatePicker } from '/@/components';
import { add } from 'date-fns';
import { normalize } from '/@/utils';
import config from '/@/config.yaml';
import type { Seism } from '/@/types';

type Filter = (seism: Seism) => boolean;

const INITIAL_STATE = {
  search: '',
  dateMin: null,
  dateMax: new Date(),
  magnitude: [0, 10],
};

defineProps<{ modelValue: Filter }>();

const emit = defineEmits<{(e: 'update:modelValue', value: Filter): void }>();

const filters = reactive({ ...INITIAL_STATE, ...config.filters });

const reset = () => Object.assign(filters, INITIAL_STATE);

watch(filters, () => {
  const search = normalize(filters.search);
  const inclusiveDateMax = add(filters.dateMax, { days: 1 });
  const validator = (seism: Seism) => normalize(seism.location).includes(search)
    && seism.date >= filters.dateMin
    && seism.date <= inclusiveDateMax
    && seism.magnitude >= filters.magnitude[0]
    && seism.magnitude <= filters.magnitude[1];
  emit('update:modelValue', validator);
}, { immediate: true });
</script>

<style lang="scss" scoped>
.collapsible summary {
  color: var(--color-primary);
  text-align: right;
  margin: 0;
  padding: var(--m);

  &::before { display: none; }

  .icon {
    height: 1em;
    width: 1em;
    vertical-align: middle;
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
