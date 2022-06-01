<template>
  <details class="collapsible">
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
          placeholder="Pick a date"
          size="6" />
      </label>
      <label>
        <span>To Date</span>
        <date-picker
          v-model="filters.dateMax"
          :format="format.SHORT_DATE"
          :not-before="filters.dateMin"
          placeholder="Pick a date"
          :not-after="new Date()"
          size="6" />
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
import { add } from 'date-fns';
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
      const inclusiveDateMax = add(filters.dateMax, { days: 1 });
      const validator = seism => normalize(seism.location).includes(search)
        && seism.date >= filters.dateMin
        && seism.date <= inclusiveDateMax
        && seism.magnitude >= filters.magnitude[0]
        && seism.magnitude <= filters.magnitude[1];
      emit('update:modelValue', validator);
    }, { immediate: true });

    return { filters, reset, format };
  },
};
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
