<template>
  <div class="filters">
    <div class="label block">
      <em>{{ message('filters.region') }}</em>
      <Selector
        v-model="filters.search"
        :options="props.regions"
        :placeholder="message('filters.select_region')"
        class="block"
        clearable />
    </div>
    <label class="label">
      <em>{{ message('filters.from') }}</em>
      <DatePicker
        v-model="filters.dateMin"
        :locale="locale"
        :format="dateFormat"
        :not-after="filters.dateMax"
        :placeholder="message('filters.pick_date')"
        :size="10" />
    </label>
    <label class="label">
      <em>{{ message('filters.until') }}</em>
      <DatePicker
        v-model="filters.dateMax"
        :locale="locale"
        :format="dateFormat"
        :not-before="filters.dateMin"
        :not-after="new Date()"
        :placeholder="message('filters.pick_date')"
        :size="10" />
    </label>
    <label class="label block">
      <em>{{ message('filters.magnitude') }}</em>
      <slider
        v-model="filters.magnitude"
        v-bind="MAGNITUDE_RANGE_OPTIONS"
        class="range-slider" />
    </label>
    <button class="btn block" @click="reset">
      {{ message('filters.reset') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import Slider from '@vueform/slider';
import { useI10n } from '/@/composables';
import { DatePicker, Selector } from '/@/components';
import type { FiltersSeism } from '/@/types';

const MAGNITUDE_RANGE_OPTIONS = {
  min: -2,
  max: 9,
  showTooltip: 'drag',
  lazy: true,
  merge: 1,
  options: { margin: 1 },
};

const props = defineProps<{
  regions: string[],
}>();

const filters = defineModel<FiltersSeism>({ required: true });

const emit = defineEmits<{
  reset: [],
}>();

const reset = () => emit('reset');

const { message, formatDate, locale } = useI10n();
const dateFormat = (date: Date) => formatDate(date, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 1rem;

  .block { flex-basis: 100%; }
}
</style>
