<template>
  <details class="collapsible" open>
    <summary><remix-icon name="equalizer" /> Filters</summary>
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
        <date-picker
          v-model="filters.dateMin"
          :format="format.SHORT_DATE"
          :not-after="filters.dateMax"
          size="7" />
      </label>
      <label>
        <span>To Date</span>
        <date-picker
          v-model="filters.dateMax"
          :format="format.SHORT_DATE"
          :not-before="filters.dateMin"
          :not-after="new Date()"
          size="7" />
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

<script>
import { reactive, watch } from 'vue';
import Slider from '@vueform/slider';
import { RemixIcon, DatePicker } from '/@/components';
import { normalize, format } from '/@/utils';
import config from '/@/config.yaml';

const INITIAL_STATE = {
  search: '',
  dateMin: null,
  dateMax: new Date(),
  magnitude: [0, 10],
};

export default {
  name: 'SeismFilters',
  components: { RemixIcon, DatePicker, Slider },
  props: {
    modelValue: {
      type: Function,
      default: () => true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const filters = reactive({ ...INITIAL_STATE, ...config.filters });

    const reset = () => Object.assign(filters, INITIAL_STATE);

    watch(filters, () => {
      const search = normalize(filters.search);
      const validator = seism => normalize(seism.location).includes(search)
        && seism.date >= filters.dateMin
        && seism.date <= filters.dateMax
        && seism.magnitude >= filters.magnitude[0]
        && seism.magnitude <= filters.magnitude[1];
      emit('update:modelValue', validator);
    }, { immediate: true });

    return { filters, reset, format };
  },
};
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
